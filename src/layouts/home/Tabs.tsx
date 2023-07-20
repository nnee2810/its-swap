import clsx from "clsx"
import { Link, Navigate, useLocation } from "react-router-dom"
import { useTokenStore } from "store/token"

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

export default function Tabs() {
  const location = useLocation()
  const { address } = useTokenStore()

  return address ? (
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
  ) : (
    <Navigate to="/" />
  )
}
