import { create } from "zustand"
import { persist } from "zustand/middleware"

interface TokenChecking {
  address: `0x${string}`
  decimals: number
  name: string
  symbol: string
}

interface TokenCheckingState {
  address?: `0x${string}`
  decimals?: number
  name?: string
  symbol?: string
  // eslint-disable-next-line no-unused-vars
  setTokenChecking: (tokenChecking: Partial<TokenChecking>) => void
}

export const useTokenCheckingStore = create<TokenCheckingState>()(
  persist(
    (set) => ({
      setTokenChecking: (tokenChecking) =>
        set({
          ...tokenChecking,
        }),
    }),
    {
      name: "tokenChecking",
    }
  )
)
