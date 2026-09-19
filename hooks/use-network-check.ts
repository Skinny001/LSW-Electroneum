import { useAccount, useChainId } from "wagmi"
import { ELECTRONEUM_CHAIN_ID, ELECTRONEUM_CHAIN_NAME } from "@/lib/electroneum-config"

export function useNetworkCheck() {
  const { chainId, chain } = useAccount()
  const globalChainId = useChainId()
  const activeChainId = Number(chain?.id ?? chainId ?? globalChainId)

  const isOnElectroneum = activeChainId === ELECTRONEUM_CHAIN_ID || activeChainId === 52014 || activeChainId === 5201420

  return {
    isOnElectroneum,
    isOnSomnia: isOnElectroneum, // Backward-compatible alias
    currentChainId: activeChainId,
    electroneumName: ELECTRONEUM_CHAIN_NAME,
    electroneumId: ELECTRONEUM_CHAIN_ID,
  }
}
