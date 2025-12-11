import "./globals.css";
import { ReactNode } from "react";
import { ThemeProvider } from "next-themes";
import { WagmiConfig, createClient, configureChains } from "wagmi";
import { mainnet, goerli } from "viem/chains";
import { publicProvider } from "wagmi/providers/public";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { Toaster } from "react-hot-toast";
import "@rainbow-me/rainbowkit/styles.css";

const { provider, webSocketProvider } = configureChains([mainnet, goerli], [publicProvider()]);

const { connectors } = getDefaultWallets({
  appName: "Automat SuperApp",
  chains: [mainnet, goerli]
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider
});

export const metadata = {
  title: "Automat — Web3 Automotive Super-App",
  description: "Next.js + Web3 + AI automotive marketplace & services"
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <WagmiConfig client={wagmiClient}>
            <RainbowKitProvider chains={[mainnet, goerli]}>
              {/* global providers like auth, i18n can be added here */}
              {children}
              <Toaster position="bottom-right" />
            </RainbowKitProvider>
          </WagmiConfig>
        </ThemeProvider>
      </body>
    </html>
  );
}