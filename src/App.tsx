import detectEthereumProvider from "@metamask/detect-provider"
import { router } from "configs/router"
import { useEffect, useState } from "react"
import toast, { Toaster } from "react-hot-toast"
import { BiLinkExternal } from "react-icons/bi"
import { RouterProvider } from "react-router-dom"
import { useMetaMask } from "store/metaMask"

export default function App() {
  const { account, isMetaMaskInstalled, setAccount, setIsMetaMaskInstalled } =
    useMetaMask()
  const [isDetectingProvider, setIsDetectingProvider] = useState(true)

  useEffect(() => {
    detectEthereumProvider()
      .then((provider) => {
        if (provider?.isMetaMask) {
          setIsMetaMaskInstalled(true)
          provider.on("accountsChanged", (accounts: string[]) => {
            if (accounts.length && accounts[0] !== account)
              setAccount(accounts[0])
            else setAccount(null)
          })
          provider.on("chainChanged", () => location.reload())
        } else toast.error("MetaMask is not installed")
      })
      .finally(() => {
        setIsDetectingProvider(false)
      })
  }, [])

  return (
    <>
      {isDetectingProvider ? (
        <div className="p-4 flex justify-center">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : isMetaMaskInstalled ? (
        <RouterProvider router={router} />
      ) : (
        <div className="p-4 flex justify-center">
          <a
            href="https://metamask.io/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="btn btn-success">
              Install MetaMask <BiLinkExternal fontSize="20" />
            </button>
          </a>
        </div>
      )}
      <Toaster position="top-left" />
    </>
  )
}
