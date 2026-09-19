import { NextResponse } from "next/server"
import { createWalletClient, createPublicClient, http, parseEther } from "viem"
import { privateKeyToAccount } from "viem/accounts"
import { electroneumTestnet } from "@/lib/wagmi-config"
import { LSW_CONTRACT_ADDRESS, ELECTRONEUM_RPC_URL } from "@/lib/electroneum-config"
import { LSW_ABI } from "@/lib/contract-abi"

const PRIVATE_KEY = process.env.PRIVATE_KEY || "0x76df0701e665a1be89ffce9d04afbb6ebb3cb3e8f7c3b36918d69d8c3de39cee"

export async function POST(request: Request) {
  try {
    const { userAddress, action = "stake" } = await request.json().catch(() => ({}))

    const account = privateKeyToAccount(PRIVATE_KEY as `0x${string}`)
    
    const publicClient = createPublicClient({
      chain: electroneumTestnet,
      transport: http(ELECTRONEUM_RPC_URL, { retryCount: 5, retryDelay: 1000 }),
    })

    const walletClient = createWalletClient({
      account,
      chain: electroneumTestnet,
      transport: http(ELECTRONEUM_RPC_URL, { retryCount: 5, retryDelay: 1000 }),
    })

    console.log(`[Relayer] Executing ${action} for user ${userAddress || account.address}...`)

    let hash;
    if (action === "startNewRound") {
      hash = await walletClient.writeContract({
        address: LSW_CONTRACT_ADDRESS as `0x${string}`,
        abi: LSW_ABI,
        functionName: "startNewRound",
        gas: BigInt(300000),
        gasPrice: BigInt(1000000007),
      })
    } else {
      hash = await walletClient.writeContract({
        address: LSW_CONTRACT_ADDRESS as `0x${string}`,
        abi: LSW_ABI,
        functionName: "stake",
        value: parseEther("0.01"),
        gas: BigInt(300000),
        gasPrice: BigInt(1000000007),
      })
    }

    console.log(`[Relayer] ${action} tx broadcasted successfully: ${hash}`)

    return NextResponse.json({
      success: true,
      hash,
      message: `${action} executed successfully via server relayer!`,
    })
  } catch (err: any) {
    console.error("[Relayer Error]:", err)
    return NextResponse.json(
      {
        success: false,
        error: err?.message || "Relayer stake failed",
      },
      { status: 500 }
    )
  }
}
