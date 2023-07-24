import { PropsWithChildren, useEffect } from "react"
import { useTokenCheckingStore } from "store/tokenChecking"
import { useAccount } from "wagmi"
import Header from "./Header"
import Tabs from "./Tabs"
import TokenCheckForm from "./TokenCheckForm"

export default function HomeLayout({ children }: PropsWithChildren) {
  const { isConnected } = useAccount()
  const { address } = useTokenCheckingStore()

  useEffect(() => {}, [])

  return (
    isConnected && (
      <div className="px-4 py-2 space-y-4">
        <Header />
        <TokenCheckForm />
        {!!address && <Tabs />}
        {children}
      </div>
    )
  )
}
