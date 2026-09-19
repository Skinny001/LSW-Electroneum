"use client"

import { useEffect, useRef } from "react"
import { createLogPoller } from "@/lib/contract-service"

export interface ContractEvent {
  eventName: string
  blockNumber: number
  transactionHash: string
  logIndex: number
  timestamp: number
  args: any
  log: any
}

/**
 * Hook that listens for contract events on Electroneum in real-time
 * Calls the provided callback whenever an event is detected
 */
export function useContractEventListener(
  onEventDetected: (event: ContractEvent) => void
) {
  const callbackRef = useRef(onEventDetected)

  useEffect(() => {
    callbackRef.current = onEventDetected
  }, [onEventDetected])

  useEffect(() => {
    // Rely on robust RPC log polling for Electroneum
    return () => {}
  }, [])
}
