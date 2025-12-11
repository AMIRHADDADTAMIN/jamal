// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Marketplace {
    address public owner;
    uint public feeBasisPoints = 250; // 2.5%

    enum ListingStatus { Active, Sold, Cancelled }

    struct Listing {
        uint id;
        address seller;
        address buyer;
        uint price; // in wei
        ListingStatus status;
        bool escrowed;
    }

    mapping(uint => Listing) public listings;
    uint public nextListingId;

    event ListingCreated(uint indexed id, address indexed seller, uint price);
    event ListingPurchased(uint indexed id, address indexed buyer, uint price);
    event ListingCancelled(uint indexed id);
    event EscrowReleased(uint indexed id, address indexed to, uint amount);

    constructor() {
        owner = msg.sender;
    }

    function createListing(uint price) external returns (uint) {
        uint lid = ++nextListingId;
        listings[lid] = Listing({ id: lid, seller: msg.sender, buyer: address(0), price: price, status: ListingStatus.Active, escrowed: false });
        emit ListingCreated(lid, msg.sender, price);
        return lid;
    }

    function buyListing(uint id) external payable {
        Listing storage l = listings[id];
        require(l.status == ListingStatus.Active, "Not active");
        require(msg.value == l.price, "Incorrect value");

        // Hold funds in contract (escrow)
        l.escrowed = true;
        l.buyer = msg.sender;
        l.status = ListingStatus.Sold;
        emit ListingPurchased(id, msg.sender, msg.value);
    }

    function releaseEscrow(uint id) external {
        Listing storage l = listings[id];
        require(l.escrowed, "No escrowed funds");
        require(msg.sender == owner || msg.sender == l.buyer || msg.sender == l.seller, "Not permitted");

        uint fee = (l.price * feeBasisPoints) / 10000;
        uint payout = l.price - fee;
        l.escrowed = false;

        // send fee to owner
        payable(owner).transfer(fee);
        // send payout to seller
        payable(l.seller).transfer(payout);

        emit EscrowReleased(id, l.seller, payout);
    }

    function cancelListing(uint id) external {
        Listing storage l = listings[id];
        require(msg.sender == l.seller || msg.sender == owner, "Not permitted");
        l.status = ListingStatus.Cancelled;
        if (l.escrowed) {
            // refund buyer
            payable(l.buyer).transfer(l.price);
            l.escrowed = false;
        }
        emit ListingCancelled(id);
    }

    // allow owner to update fee
    function updateFee(uint bps) external {
        require(msg.sender == owner, "Only owner");
        feeBasisPoints = bps;
    }

    receive() external payable {}
}