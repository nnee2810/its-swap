import getProvider from "helpers/getProvider"
import { useEffect } from "react"
import { toast } from "react-hot-toast"
import { Outlet } from "react-router-dom"
import { useMetaMask } from "store/metaMask"
import Header from "./Header"

export default function HomeLayout() {
  const { account, isMetaMaskConnecting, setAccount, setIsMetaMaskConnecting } =
    useMetaMask()

  const connectWallet = async () => {
    try {
      setIsMetaMaskConnecting(true)
      const provider = getProvider()
      const accounts: string[] = await provider.send("eth_requestAccounts", [])
      if (accounts.length) {
        setAccount(accounts[0])
        toast.success("Connected to MetaMask")
      }
    } catch (error) {
      toast.error("Can't connect to MetaMask")
    } finally {
      setIsMetaMaskConnecting(false)
    }
  }
  const checkWalletConnection = async () => {
    try {
      setIsMetaMaskConnecting(true)
      const provider = getProvider()
      const accounts: string[] = await provider.send("eth_accounts", [])
      if (accounts.length) setAccount(accounts[0])
    } catch (error) {
      toast.error("Can't connect to MetaMask")
    } finally {
      setIsMetaMaskConnecting(false)
    }
  }

  useEffect(() => {
    checkWalletConnection()
  }, [])

  return (
    <div className="px-4 py-2">
      {account ? (
        <>
          <Header />
          <div className="mt-4">
            <Outlet />
          </div>
        </>
      ) : (
        <div className="flex justify-center">
          <button className="btn btn-primary" onClick={connectWallet}>
            Connect With MetaMask{" "}
            {isMetaMaskConnecting && (
              <span className="loading loading-spinner loading-xs"></span>
            )}
          </button>
        </div>
      )}
    </div>
  )
}
