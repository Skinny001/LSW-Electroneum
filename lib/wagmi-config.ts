import { defineChain, http } from "viem"
import { createConfig, cookieStorage, createStorage } from "wagmi"
import { injected } from "wagmi/connectors"
import { ELECTRONEUM_CHAIN_ID, ELECTRONEUM_CHAIN_NAME, ELECTRONEUM_RPC_URL, ELECTRONEUM_EXPLORER_URL } from "./electroneum-config"

// Define Electroneum Testnet chain
export const electroneumTestnet = defineChain({
  id: ELECTRONEUM_CHAIN_ID,
  name: ELECTRONEUM_CHAIN_NAME,
  nativeCurrency: { name: "Electroneum", symbol: "ETN", decimals: 18 },
  rpcUrls: {
    default: { http: [ELECTRONEUM_RPC_URL] },
  },
  blockExplorers: {
    default: { name: "Electroneum Explorer", url: ELECTRONEUM_EXPLORER_URL },
  },
  testnet: true,
})

// Define Electroneum Mainnet chain
export const electroneumMainnet = defineChain({
  id: 52014,
  name: "Electroneum Mainnet",
  nativeCurrency: { name: "Electroneum", symbol: "ETN", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://rpc.electroneum.com"] },
  },
  blockExplorers: {
    default: { name: "Electroneum Explorer", url: "https://blockexplorer.electroneum.com" },
  },
  testnet: false,
})

// Backward-compatible alias
export const somniaTestnet = electroneumTestnet

// Create wagmi config for Electroneum
export const wagmiConfig = createConfig({
  chains: [electroneumTestnet, electroneumMainnet],
  connectors: [injected()],
  transports: {
    // Route testnet traffic through our server-side proxy to handle Ankr rate limits gracefully
    [electroneumTestnet.id]: http("/api/rpc", { retryCount: 5, retryDelay: 1000 }),
    [electroneumMainnet.id]: http("https://rpc.electroneum.com", { retryCount: 5, retryDelay: 1000 }),
  },
  storage: createStorage({
    storage: cookieStorage,
  }),
  ssr: true,
})

