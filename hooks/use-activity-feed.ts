"use client"

import { useEffect, useState, useCallback } from "react"
import { createPublicClient, http, decodeEventLog } from "viem"
import { electroneumTestnet } from "@/lib/wagmi-config"
import { LSW_CONTRACT_ADDRESS } from "@/lib/electroneum-config"
import { LSW_ABI } from "@/lib/contract-abi"

export interface ActivityEvent {
  id: string
  eventName: string
  blockNumber: number
  transactionHash: string
  logIndex: number
  timestamp: number
  args: any
  log: any
  displayText: string
}

const publicClient = createPublicClient({
  transport: http(electroneumTestnet.rpcUrls.default.http[0], { retryCount: 5, retryDelay: 2000 }),
  chain: electroneumTestnet,
})

export function useActivityFeed() {
  const [events, setEvents] = useState<ActivityEvent[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const loadEvents = useCallback(async () => {
    try {
      setIsLoading(true)
      setError(null)

      const currentBlock = await publicClient.getBlockNumber()
      const fromBlock = currentBlock > BigInt(800) ? currentBlock - BigInt(800) : BigInt(0)

      const rawLogs = await publicClient.getLogs({
        address: LSW_CONTRACT_ADDRESS as `0x${string}`,
        fromBlock,
        toBlock: currentBlock,
      })

      const parsedEvents: ActivityEvent[] = []

      for (let i = rawLogs.length - 1; i >= 0; i--) {
        const log = rawLogs[i]
        try {
          const parsed: any = decodeEventLog({ abi: LSW_ABI as any, data: log.data, topics: log.topics })
          const eventName = parsed?.eventName || parsed?.name || "Unknown"
          const id = `${log.transactionHash}-${log.logIndex}`
          
          let displayText = `${eventName}`
          if (eventName === "RoundEnded") {
            const roundId = parsed.args?.[0] ?? ""
            const winner = String(parsed.args?.[1] ?? "")
            displayText = `🏆 Round #${roundId} ended - Winner: ${winner.slice(0, 6)}...${winner.slice(-4)}`
          } else if (eventName === "RoundStarted") {
            const roundId = parsed.args?.[0] ?? ""
            displayText = `▶️ Round #${roundId} started`
          } else if (eventName === "StakeReceived") {
            const roundId = parsed.args?.[0] ?? ""
            const staker = String(parsed.args?.[1] ?? "")
            displayText = `💰 ${staker.slice(0, 6)}...${staker.slice(-4)} staked in Round #${roundId}`
          } else if (eventName === "RewardsDistributed") {
            const roundId = parsed.args?.[0] ?? ""
            displayText = `💸 Rewards distributed for Round #${roundId}`
          }

          parsedEvents.push({
            id,
            eventName,
            blockNumber: Number(log.blockNumber),
            transactionHash: log.transactionHash,
            logIndex: Number(log.logIndex),
            timestamp: Math.floor(Date.now() / 1000),
            args: parsed.args,
            log,
            displayText,
          })
        } catch {
          // Ignore unparseable logs
        }
      }

      setEvents(parsedEvents.slice(0, 50))
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "Failed to load activity"
      setError(errorMsg)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    loadEvents()
  }, [loadEvents])

  return {
    events,
    isLoading,
    error,
    refresh: loadEvents,
  }
}
