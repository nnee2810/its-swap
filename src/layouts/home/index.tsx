import { ContractEventPayload, ethers } from "ethers"
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
    const tokenSymbol = await contract.symbol()

    const approvalFromMe = contract.filters.Approval(account, null)
    contract.on(approvalFromMe, (event: ContractEventPayload) =>
      toast.success(
        `You have approved of ${ethers.formatEther(
          String(event.args[2])
        )} ${tokenSymbol} for ${event.args[1]}`
      )
    )
    const approvalToMe = contract.filters.Approval(null, account)
    contract.on(approvalToMe, (event: ContractEventPayload) =>
      toast.success(
        `${event.args[0]} has approved of ${ethers.formatEther(
          String(event.args[2])
        )} ${tokenSymbol} for you`
      )
    )

    const transferFromMe = contract.filters.Transfer(account)
    contract.on(transferFromMe, (event: ContractEventPayload) =>
      toast.success(
        `You have transferred ${ethers.formatEther(
          String(event.args[2])
        )} ${tokenSymbol} to ${event.args[1]}`
      )
    )
    const transferToMe = contract.filters.Transfer(null, account)
    contract.on(transferToMe, (event: ContractEventPayload) =>
      toast.success(
        `${event.args[0]} has transferred ${ethers.formatEther(
          String(event.args[2])
        )} ${tokenSymbol} to you`
      )
    )
  }

  useEffect(() => {
    checkConnection()
  }, [])
  useEffect(() => {
    if (account) handleEvents()
  }, [account])

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
