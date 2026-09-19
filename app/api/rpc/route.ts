import { NextResponse } from "next/server"
import { ELECTRONEUM_RPC_URL } from "@/lib/electroneum-config"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const targetRpc = process.env.NEXT_PUBLIC_ELECTRONEUM_RPC_URL || process.env.ELECTRONEUM_RPC_URL || ELECTRONEUM_RPC_URL

    let attempt = 0
    while (attempt < 4) {
      attempt++
      try {
        const response = await fetch(targetRpc, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
          cache: "no-store",
        })

        const data = await response.json()

        // Check if rate limited
        if (data?.error?.message?.includes("rate limited") || response.status === 429) {
          console.warn(`[RPC Proxy] Rate limited on attempt ${attempt}, retrying...`)
          await new Promise((resolve) => setTimeout(resolve, 400 * attempt))
          continue
        }

        return NextResponse.json(data)
      } catch (err) {
        await new Promise((resolve) => setTimeout(resolve, 400 * attempt))
      }
    }

    return NextResponse.json(
      { jsonrpc: "2.0", id: body.id || 1, error: { code: -32603, message: "RPC rate limit exceeded after retries" } },
      { status: 529 }
    )
  } catch (err: any) {
    return NextResponse.json(
      { jsonrpc: "2.0", id: 1, error: { code: -32603, message: err?.message || "Internal RPC proxy error" } },
      { status: 500 }
    )
  }
}
