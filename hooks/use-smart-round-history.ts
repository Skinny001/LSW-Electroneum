"use client"

import { useEffect, useState } from 'react'
import { fetchRecentRounds } from '@/lib/contract-service'

export interface RoundHistory {
  roundId: string
  winner: string
  totalAmount: string
  timestamp: number
}

export function useSmartRoundHistory() {
  const [rounds, setRounds] = useState<RoundHistory[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadRounds = async () => {
    try {
      setIsLoading(true)
      const recentRounds = await fetchRecentRounds(20)
      
      const formattedRounds: RoundHistory[] = recentRounds.map((r: any) => ({
        roundId: r.roundId.toString(),
        winner: r.winner,
        totalAmount: r.totalAmount.toString(),
        timestamp: typeof r.timestamp === 'number' ? r.timestamp : Math.floor(Date.now() / 1000)
      }))

      setRounds(formattedRounds)
      setError(null)
    } catch (err) {
      console.error('❌ Error fetching round history:', err)
      setError(err instanceof Error ? err.message : 'Failed to fetch round history')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadRounds()
  }, [])

  return {
    rounds,
    isLoading,
    error,
    isSyncing: false,
    triggerSync: loadRounds,
    syncState: { currentContractRoundId: '', latestStreamRoundId: '', isSynced: true, missingRounds: [] }
  }
}
