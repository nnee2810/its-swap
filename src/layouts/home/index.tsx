import getContract from "helpers/getContract"
import getProvider from "helpers/getProvider"
import { useEffect } from "react"
import { toast } from "react-hot-toast"
import { Outlet } from "react-router-dom"
import { useMetaMask } from "store/metaMask"
import ConnectMetaMask from "./ConnectMetaMask"
import Header from "./Header"

export default function HomeLayout() {
  const { account, setAccount, setIsMetaMaskConnecting } = useMetaMask()

  const checkConnection = async () => {
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
  const handleEvents = async () => {
    const contract = await getContract()
  }

  useEffect(() => {
    checkConnection()
    handleEvents()
  }, [])

  return account ? (
    <div className="px-4 py-2">
      <Header />
      <div className="mt-4">
        <Outlet />
      </div>
    </div>
  ) : (
    <div className="h-screen flex justify-center items-center">
      <ConnectMetaMask />
    </div>
  )
}
