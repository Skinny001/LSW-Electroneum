"use client"

import { useState, useCallback } from "react"
import { useAccount, useSendTransaction, useWaitForTransactionReceipt } from "wagmi"
import { encodeFunctionData } from "viem"
import { LSW_CONTRACT_ADDRESS, MINIMUM_STAKE } from "@/lib/electroneum-config"
import { LSW_ABI } from "@/lib/contract-abi"

export function useContractWrite() {
  const { address, isConnected, connector } = useAccount()
  const { sendTransactionAsync, isPending, error: sendError } = useSendTransaction()
  const [customHash, setCustomHash] = useState<string | null>(null)
  const { isLoading: isWaiting } = useWaitForTransactionReceipt({ hash: customHash as `0x${string}` | undefined })
  const [error, setError] = useState<string | null>(null)

  const getActiveProvider = useCallback(async () => {
    try {
      if (connector?.getProvider) {
        const p = await connector.getProvider()
        if (p) return p
      }
    } catch {}
    if (typeof window !== "undefined" && (window as any).ethereum) {
      return (window as any).ethereum
    }
    return null
  }, [connector])

  const executeStake = useCallback(async () => {
    setError(null)

    if (!isConnected || !address) {
      setError("Wallet not connected. Please connect your wallet first.")
      return null
    }

    const data = encodeFunctionData({
      abi: LSW_ABI,
      functionName: "stake",
    })

    const provider: any = await getActiveProvider()

    // 1. Direct injected provider call (bypasses RPC simulation rate limits completely)
    if (provider && provider.request) {
      try {
        const resHash = await provider.request({
          method: "eth_sendTransaction",
          params: [
            {
              from: address,
              to: LSW_CONTRACT_ADDRESS,
              data: data,
              value: "0x" + MINIMUM_STAKE.toString(16),
              gas: "0x493e0", // 300,000 gas
              gasPrice: "0x3b9aca07", // 1.000000007 gwei
            },
          ],
        })
        console.log("Direct wallet stake transaction hash:", resHash)
        setCustomHash(resHash)
        return resHash
      } catch (err: any) {
        if (err?.code === 4001 || err?.message?.includes("User rejected") || err?.message?.includes("user rejected")) {
          setError("Transaction rejected by user")
          return null
        }
        console.warn("Direct provider call failed, trying sendTransactionAsync fallback:", err)
      }
    }

    // 2. Fallback to Wagmi sendTransactionAsync (raw transaction without simulation)
    try {
      const resHash = await sendTransactionAsync({
        to: LSW_CONTRACT_ADDRESS as `0x${string}`,
        data: data,
        value: MINIMUM_STAKE,
        gas: BigInt(300000),
        gasPrice: BigInt(1000000007),
      })
      setCustomHash(resHash)
      return resHash
    } catch (err) {
      console.log("Stake error:", err)
      const errorMessage = err instanceof Error ? err.message : "Failed to execute stake"
      setError(errorMessage)
      return null
    }
  }, [isConnected, address, getActiveProvider, sendTransactionAsync])

  const executeStartNewRound = useCallback(async () => {
    setError(null)

    if (!isConnected || !address) {
      setError("Wallet not connected. Please connect your wallet first.")
      return null
    }

    const data = encodeFunctionData({
      abi: LSW_ABI,
      functionName: "startNewRound",
    })

    const provider: any = await getActiveProvider()

    if (provider && provider.request) {
      try {
        const resHash = await provider.request({
          method: "eth_sendTransaction",
          params: [
            {
              from: address,
              to: LSW_CONTRACT_ADDRESS,
              data: data,
              gas: "0x493e0",
              gasPrice: "0x3b9aca07",
            },
          ],
        })
        setCustomHash(resHash)
        return resHash
      } catch (err: any) {
        if (err?.code === 4001 || err?.message?.includes("User rejected") || err?.message?.includes("user rejected")) {
          setError("Transaction rejected by user")
          return null
        }
      }
    }

    try {
      const resHash = await sendTransactionAsync({
        to: LSW_CONTRACT_ADDRESS as `0x${string}`,
        data: data,
        gas: BigInt(300000),
        gasPrice: BigInt(1000000007),
      })
      setCustomHash(resHash)
      return resHash
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to start new round"
      setError(errorMessage)
      return null
    }
  }, [isConnected, address, getActiveProvider, sendTransactionAsync])

  const executeEmergencyWithdraw = useCallback(async () => {
    setError(null)
    if (!isConnected || !address) {
      setError("Wallet not connected. Please connect your wallet first.")
      return null
    }
    const data = encodeFunctionData({ abi: LSW_ABI, functionName: "emergencyWithdraw" })
    try {
      const resHash = await sendTransactionAsync({
        to: LSW_CONTRACT_ADDRESS as `0x${string}`,
        data,
        gas: BigInt(300000),
        gasPrice: BigInt(1000000007),
      })
      setCustomHash(resHash)
      return resHash
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to execute emergency withdraw"
      setError(errorMessage)
      return null
    }
  }, [isConnected, address, sendTransactionAsync])

  const executeUpdateStakeAmount = useCallback(async (amount: bigint) => {
    setError(null)
    if (!isConnected || !address) {
      setError("Wallet not connected. Please connect your wallet first.")
      return null
    }
    const data = encodeFunctionData({ abi: LSW_ABI, functionName: "updateStakeAmount", args: [amount] })
    try {
      const resHash = await sendTransactionAsync({
        to: LSW_CONTRACT_ADDRESS as `0x${string}`,
        data,
        gas: BigInt(150000),
        gasPrice: BigInt(1000000007),
      })
      setCustomHash(resHash)
      return resHash
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to update stake amount"
      setError(errorMessage)
      return null
    }
  }, [isConnected, address, sendTransactionAsync])

  const executeUpdateBufferSettings = useCallback(async (stakeBuffer: number, bufferDelay: number) => {
    setError(null)
    if (!isConnected || !address) {
      setError("Wallet not connected. Please connect your wallet first.")
      return null
    }
    const data = encodeFunctionData({ abi: LSW_ABI, functionName: "updateBufferSettings", args: [BigInt(stakeBuffer), BigInt(bufferDelay)] })
    try {
      const resHash = await sendTransactionAsync({
        to: LSW_CONTRACT_ADDRESS as `0x${string}`,
        data,
        gas: BigInt(150000),
        gasPrice: BigInt(1000000007),
      })
      setCustomHash(resHash)
      return resHash
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to update buffer settings"
      setError(errorMessage)
      return null
    }
  }, [isConnected, address, sendTransactionAsync])

  const executeUpdateStakingWaitPeriod = useCallback(async (stakingWaitPeriod: bigint) => {
    setError(null)
    if (!isConnected || !address) {
      setError("Wallet not connected. Please connect your wallet first.")
      return null
    }
    const data = encodeFunctionData({ abi: LSW_ABI, functionName: "updateStakingWaitPeriod", args: [stakingWaitPeriod] })
    try {
      const resHash = await sendTransactionAsync({
        to: LSW_CONTRACT_ADDRESS as `0x${string}`,
        data,
        gas: BigInt(150000),
        gasPrice: BigInt(1000000007),
      })
      setCustomHash(resHash)
      return resHash
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to update staking wait period"
      setError(errorMessage)
      return null
    }
  }, [isConnected, address, sendTransactionAsync])

  return {
    executeStake,
    executeStartNewRound,
    executeEmergencyWithdraw,
    executeUpdateStakeAmount,
    executeUpdateBufferSettings,
    executeUpdateStakingWaitPeriod,
    isLoading: isPending || isWaiting,
    error: error || (sendError ? sendError.message : null),
    hash: customHash,
    isConnected,
    address,
  }
}
