import { Web3Button, Web3Modal, useWeb3Modal } from "@web3modal/react"
import { router } from "configs/router"
import { ethereumClient } from "main"
import { useEffect } from "react"
import { Toaster } from "react-hot-toast"
import { RouterProvider } from "react-router-dom"
import { useAccount } from "wagmi"

export default function App() {
  const { isConnected } = useAccount()
  const { open } = useWeb3Modal()

  useEffect(() => {
    if (!isConnected) open()
  }, [isConnected, open])

  return (
    <>
      {isConnected ? (
        <RouterProvider router={router} />
      ) : (
        <div className="h-screen flex justify-center items-center">
          <Web3Button />
        </div>
      )}
      <Toaster position="top-left" />
      <Web3Modal
        projectId={import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID}
        ethereumClient={ethereumClient}
      />
    </>
  )
}
