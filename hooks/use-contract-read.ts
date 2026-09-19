"use client"

import { useEffect, useState, useCallback } from "react"
import {
  getCurrentRoundInfo,
  getTimeRemaining,
  getTimeUntilStakingAvailable,
  isStakingAvailable,
  getStakeAmount,
} from "@/lib/contract-service"

export interface RoundInfo {
  roundId: bigint
  lastStaker: string
  totalAmount: bigint
  deadline: bigint
  isActive: boolean
  stakersCount: bigint
  stakingAvailableAt: bigint
}

export function useContractRead(refreshInterval = 1000) {
  const [roundInfo, setRoundInfo] = useState<RoundInfo | null>(null)
  const [timeRemaining, setTimeRemaining] = useState<bigint>(BigInt(0))
  const [timeUntilStaking, setTimeUntilStaking] = useState<bigint>(BigInt(0))
  const [isStakingAvailableState, setIsStakingAvailableState] = useState(false)
  const [stakeAmount, setStakeAmount] = useState<bigint>(BigInt(0))
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = useCallback(async () => {
    try {
      const round = await getCurrentRoundInfo()
      setRoundInfo(round)
      
      const now = BigInt(Math.floor(Date.now() / 1000))
      const timeRem = round.deadline > now ? round.deadline - now : BigInt(0)
      const timeUntil = round.stakingAvailableAt > now ? round.stakingAvailableAt - now : BigInt(0)
      const stakingAvail = now >= round.stakingAvailableAt && round.isActive && round.deadline > now

      setTimeRemaining(timeRem)
      setTimeUntilStaking(timeUntil)
      setIsStakingAvailableState(stakingAvail)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch contract data")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchData()
    const interval = setInterval(fetchData, 30000) // 30 seconds
    return () => clearInterval(interval)
  }, [fetchData])

  return {
    roundInfo,
    timeRemaining,
    timeUntilStaking,
    isStakingAvailable: isStakingAvailableState,
    stakeAmount,
    loading,
    error,
    refetch: fetchData,
  }
}
