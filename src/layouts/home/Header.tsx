import clsx from "clsx"
import { Network } from "ethers"
import getProvider from "helpers/getProvider"
import { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { useMetaMask } from "store/metaMask"

interface HeaderItem {
  name: string
  path: string
}

const headerItems: HeaderItem[] = [
  {
    name: "Read Contract",
    path: "/contract/read",
  },
  {
    name: "Write Contract",
    path: "/contract/write",
  },
]

export default function Header() {
  const location = useLocation()
  const { account } = useMetaMask()
  const [network, setNetwork] = useState<Network | null>(null)

  const handleNetwork = async () => {
    const provider = getProvider()
    const net = await provider.getNetwork()
    setNetwork(net)
  }

  useEffect(() => {
    handleNetwork()
  }, [])

  return (
    !!account && (
      <>
        <div className="flex justify-between">
          <div>
            {network && (
              <div>
                Network: {network.name} - Chain ID: {String(network.chainId)}
              </div>
            )}
            <div>Contract address: {import.meta.env.VITE_CONTRACT_ADDRESS}</div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <div>
              {account.slice(0, 5)}...{account.slice(-4)}
            </div>
          </div>
        </div>
        <div className="mt-2 flex justify-center space-x-2">
          {headerItems.map(({ name, path }) => (
            <Link to={path} key={path}>
              <button
                className={clsx("btn", {
                  "btn-success": location.pathname === path,
                })}
              >
                {name}
              </button>
            </Link>
          ))}
        </div>
      </>
    )
  )
}
