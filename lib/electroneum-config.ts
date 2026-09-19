// Electroneum EVM Network Configuration (allow overrides via NEXT_PUBLIC_ env vars)
export const ELECTRONEUM_CHAIN_ID = Number(
  process.env.NEXT_PUBLIC_ELECTRONEUM_CHAIN_ID ?? process.env.NEXT_PUBLIC_SOMNIA_CHAIN_ID ?? 5201420
)

export const ELECTRONEUM_CHAIN_NAME =
  process.env.NEXT_PUBLIC_ELECTRONEUM_CHAIN_NAME ?? process.env.NEXT_PUBLIC_SOMNIA_CHAIN_NAME ?? "Electroneum Testnet"

export const ELECTRONEUM_RPC_URL =
  process.env.NEXT_PUBLIC_ELECTRONEUM_RPC_URL ??
  process.env.NEXT_PUBLIC_SOMNIA_RPC_URL ??
  "https://rpc.ankr.com/electroneum_testnet"

export const ELECTRONEUM_EXPLORER_URL =
  process.env.NEXT_PUBLIC_ELECTRONEUM_EXPLORER_URL ?? "https://testnet-blockexplorer.electroneum.com"

// Backward-compatible exports
export const SOMNIA_CHAIN_ID = ELECTRONEUM_CHAIN_ID
export const SOMNIA_CHAIN_NAME = ELECTRONEUM_CHAIN_NAME
export const SOMNIA_RPC_URL = ELECTRONEUM_RPC_URL

// Contract addresses for Electroneum deployment
export const LSW_CONTRACT_ADDRESS =
  process.env.NEXT_PUBLIC_LSW_CONTRACT_ADDRESS ?? "0x9341C730ceeB5Ead8b44939d56275eC4a7654Cf2"

export const REWARDER_CONTRACT_ADDRESS =
  process.env.NEXT_PUBLIC_REWARDER_CONTRACT_ADDRESS ?? "0xb33A94Bf2c58AA7cAdA03c219860ecDf7DaeD299"


// Default minimum stake: 0.01 ETN (18 decimals) = 10^16
export const MINIMUM_STAKE = BigInt(process.env.NEXT_PUBLIC_MINIMUM_STAKE ?? "10000000000000000")

// Token branding
export const TOKEN_SYMBOL = "ETN"
export const TOKEN_NAME = "Electroneum"

// Feature toggle: mock service fallback
export const USE_MOCK_SERVICE = (process.env.NEXT_PUBLIC_USE_MOCK_SERVICE ?? "false") === "true"
