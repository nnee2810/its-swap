import { InjectedConnector } from "@wagmi/core/connectors/injected"
import { router } from "configs/router"
import { Toaster, toast } from "react-hot-toast"
import { RouterProvider } from "react-router-dom"
import { useAccount, useConnect } from "wagmi"

export default function App() {
  const { isConnected, isConnecting } = useAccount()
  const { connect } = useConnect({
    connector: new InjectedConnector(),
    onSuccess() {
      toast.success("Connected to MetaMask")
    },
    onError() {
      toast.error("Can't connect to MetaMask")
    },
  })

  return (
    <>
      {isConnected ? (
        <RouterProvider router={router} />
      ) : (
        <div className="h-screen flex justify-center items-center">
          <button className="btn btn-success" onClick={() => connect()}>
            Connect Wallet{" "}
            {isConnecting && <span className="loading loading-infinity"></span>}
          </button>
        </div>
      )}
      <Toaster position="top-left" />
    </>
  )
}
