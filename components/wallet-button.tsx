"use client"

import { useAccount, useConnect, useDisconnect, useChainId, useSwitchChain } from "wagmi"
import { ELECTRONEUM_CHAIN_ID, ELECTRONEUM_CHAIN_NAME } from "@/lib/electroneum-config"
import { Button } from "@/components/ui/button"
import { useWalletBalance } from "@/hooks/use-wallet-balance"
import { formatEther } from "@/lib/format-utils"

export function WalletButton() {
  const { address, isConnected, chainId, chain } = useAccount()
  const globalChainId = useChainId()
  const { switchChain } = useSwitchChain()
  const { connect, connectors } = useConnect()
  const { disconnect } = useDisconnect()
  const { balance, loading } = useWalletBalance()

  const activeChainId = Number(chain?.id ?? chainId ?? globalChainId)
  const isOnElectroneum = activeChainId === ELECTRONEUM_CHAIN_ID || activeChainId === 52014 || activeChainId === 5201420

  const handleSwitchNetwork = async () => {
    switchChain({ chainId: ELECTRONEUM_CHAIN_ID })
  }

  if (isConnected && address) {
    return (
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-sm text-foreground font-mono">
          {address.slice(0, 6)}...{address.slice(-4)}
        </span>
        <span className="text-xs text-accent font-semibold bg-accent/10 px-2 py-1 rounded">
          {loading ? "..." : `${formatEther(balance)} ETN`}
        </span>
        <Button onClick={() => disconnect()} variant="outline" size="sm" className="text-xs">
          Disconnect
        </Button>
        {!isOnElectroneum && (
          <Button
            onClick={handleSwitchNetwork}
            variant="destructive"
            size="sm"
            className="text-xs animate-pulse"
          >
            Switch to {ELECTRONEUM_CHAIN_NAME}
          </Button>
        )}
      </div>
    )
  }

  return (
    <Button
      onClick={() => {
        const injectedConnector = connectors.find((c) => c.id === "injected")
        if (injectedConnector) {
          connect({ connector: injectedConnector })
        }
      }}
      size="sm"
      variant="default"
      className="bg-accent text-accent-foreground"
    >
      Connect Wallet
    </Button>
  )
}

