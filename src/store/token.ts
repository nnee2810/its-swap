import { create } from "zustand"

interface Token {
  address: `0x${string}`
  decimals: number
  name: string
  symbol: string
  totalSupply: {
    formatted: string
    value: bigint
  }
}

interface TokenState {
  address?: `0x${string}`
  decimals?: number
  name?: string
  symbol?: string
  setToken: (token: Partial<Token>) => void
}

export const useTokenStore = create<TokenState>((set) => ({
  setToken: (token) =>
    set({
      ...token,
    }),
}))
