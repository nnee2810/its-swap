import { toast } from "react-hot-toast"
import { useAccount, useDisconnect } from "wagmi"

export default function Header() {
  const { address } = useAccount()
  const { disconnect } = useDisconnect({
    onSuccess() {
      toast.success("Disconnected to wallet")
    },
  })

  return (
    <div className="flex items-center space-x-2">
      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
      <div>{address}</div>
      <button className="btn btn-sm" onClick={() => disconnect()}>
        Disconnect
      </button>
    </div>
  )
}
