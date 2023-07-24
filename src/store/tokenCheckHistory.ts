import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface TokenCheckHistoryItem {
  address: `0x${string}`
  name: string
  chainId: number
  chainName: string
}

export interface TokenCheckHistoryState {
  history: TokenCheckHistoryItem[]
  // eslint-disable-next-line no-unused-vars
  add: (token: TokenCheckHistoryItem) => void
}

export const useTokenCheckHistoryStore = create<TokenCheckHistoryState>()(
  persist(
    (set) => ({
      history: [],
      add: (token: TokenCheckHistoryItem) => {
        set(({ history }) => {
          const cloneHistory = [...history]
          const historyIdx = cloneHistory.findIndex(
            (item) => item.address === token.address
          )
          if (historyIdx > -1) cloneHistory.splice(historyIdx, 1)
          if (cloneHistory.unshift(token) > 10) cloneHistory.pop()
          return { history: cloneHistory }
        })
      },
    }),
    {
      name: "tokenCheckHistory",
    }
  )
)
