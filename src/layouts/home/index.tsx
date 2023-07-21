import { PropsWithChildren, useEffect } from "react"
import { useTokenStore } from "store/token"
import { useAccount } from "wagmi"
import Header from "./Header"
import Tabs from "./Tabs"
import TokenAddressForm from "./TokenAddressForm"

export default function HomeLayout({ children }: PropsWithChildren) {
  const { isConnected } = useAccount()
  const { address } = useTokenStore()

  useEffect(() => {}, [])

  return (
    isConnected && (
      <div className="px-4 py-2 space-y-4">
        <Header />
        <TokenAddressForm />
        {!!address && <Tabs />}
        {children}
      </div>
    )
  )
}
