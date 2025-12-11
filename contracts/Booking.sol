// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Booking {
    enum Status { Reserved, Paid, Cancelled, Completed }

    struct Reserve {
        uint id;
        address user;
        address vendor;
        uint amount; // wei
        Status status;
        uint startAt;
        uint endAt;
    }

    mapping(uint => Reserve) public reserves;
    uint public nextReserveId;
    address public owner;
    uint public platformFeeBps = 200;

    event Reserved(uint id, address indexed user, address indexed vendor, uint amount);
    event Paid(uint id, address indexed payer, uint amount);
    event Cancelled(uint id);
    event VendorPayout(uint id, address indexed vendor, uint amount);

    constructor() {
        owner = msg.sender;
    }

    function reserve(address vendor, uint startAt, uint endAt) external payable returns (uint) {
        uint id = ++nextReserveId;
        reserves[id] = Reserve({ id: id, user: msg.sender, vendor: vendor, amount: msg.value, status: Status.Reserved, startAt: startAt, endAt: endAt });
        emit Reserved(id, msg.sender, vendor, msg.value);
        return id;
    }

    function payLater(uint id) external {
        // mark as paid later; off-chain reconciliation required
        Reserve storage r = reserves[id];
        require(r.user == msg.sender, "Not owner");
        r.status = Status.Paid;
        emit Paid(id, msg.sender, r.amount);
    }

    function payNow(uint id) external payable {
        Reserve storage r = reserves[id];
        require(r.user == msg.sender, "Not owner");
        require(msg.value == r.amount, "Incorrect amount");
        r.status = Status.Paid;
        emit Paid(id, msg.sender, msg.value);
    }

    function cancel(uint id) external {
        Reserve storage r = reserves[id];
        require(r.user == msg.sender || msg.sender == owner, "Not permitted");
        r.status = Status.Cancelled;
        // refund amount to user if paid
        if (r.amount > 0) {
            payable(r.user).transfer(r.amount);
        }
        emit Cancelled(id);
    }

    function payoutVendor(uint id) external {
        Reserve storage r = reserves[id];
        require(r.status == Status.Paid, "Not paid");
        uint fee = (r.amount * platformFeeBps) / 10000;
        uint payout = r.amount - fee;
        payable(r.vendor).transfer(payout);
        payable(owner).transfer(fee);
        r.status = Status.Completed;
        emit VendorPayout(id, r.vendor, payout);
    }

    function updateFee(uint bps) external {
        require(msg.sender == owner, "Only owner");
        platformFeeBps = bps;
    }

    receive() external payable {}
}