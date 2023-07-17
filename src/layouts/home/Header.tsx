import clsx from "clsx"
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

  return (
    !!account && (
      <>
        <div className="flex justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <div>
              {account.slice(0, 5)}...{account.slice(-4)}
            </div>
          </div>
          <div>Contract address: {import.meta.env.VITE_CONTRACT_ADDRESS}</div>
        </div>
        <div className="mt-2 flex justify-center space-x-2">
          {headerItems.map(({ name, path }) => (
            <Link to={path} key={path}>
              <button
                className={clsx("btn", {
                  "btn-primary": location.pathname === path,
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
