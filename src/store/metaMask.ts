import { create } from "zustand"

interface MetaMaskState {
  account: string | null
  isMetaMaskInstalled: boolean
  isMetaMaskConnecting: boolean
  isMetaMaskConnected: boolean
  setAccount: (account: string | null) => void
  setIsMetaMaskInstalled: (isMetaMaskInstalled: boolean) => void
  setIsMetaMaskConnecting: (isMetaMaskConnecting: boolean) => void
  setIsMetaMaskConnected: (isMetaMaskConnected: boolean) => void
}

export const useMetaMask = create<MetaMaskState>((set) => ({
  account: null,
  chainName: null,
  isMetaMaskInstalled: false,
  isMetaMaskConnecting: false,
  isMetaMaskConnected: false,

  setAccount: (account) =>
    set({
      account,
    }),

  setIsMetaMaskInstalled: (isMetaMaskInstalled) =>
    set({
      isMetaMaskInstalled,
    }),
  setIsMetaMaskConnecting: (isMetaMaskConnecting) =>
    set({
      isMetaMaskConnecting,
    }),
  setIsMetaMaskConnected: (isMetaMaskConnected) =>
    set({
      isMetaMaskConnected,
    }),
}))
