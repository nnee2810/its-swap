import { useEffect } from "react"
import { Outlet } from "react-router-dom"
import { useAccount } from "wagmi"
import Header from "./Header"
import Tabs from "./Tabs"
import TokenAddressForm from "./TokenAddressForm"

export default function HomeLayout() {
  const { isConnected } = useAccount()

  useEffect(() => {}, [])

  return (
    isConnected && (
      <div className="px-4 py-2 space-y-4">
        <Header />
        <TokenAddressForm />
        <Tabs />
        <Outlet />
      </div>
    )
  )
}
