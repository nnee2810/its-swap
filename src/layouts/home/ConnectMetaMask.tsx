import getProvider from "helpers/getProvider"
import toast from "react-hot-toast"
import { useMetaMask } from "store/metaMask"

export default function ConnectMetaMask() {
  const { isMetaMaskConnecting, setAccount, setIsMetaMaskConnecting } =
    useMetaMask()

  const connect = async () => {
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

  return (
    <button className="btn btn-success" onClick={connect}>
      Connect To MetaMask{" "}
      {isMetaMaskConnecting && (
        <span className="loading loading-spinner loading-xs"></span>
      )}
    </button>
  )
}
