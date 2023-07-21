import { Navigate, Outlet } from "react-router-dom"
import { useTokenStore } from "store/token"

export default function TokenGuardLayout() {
  const { address } = useTokenStore()

  return address ? <Outlet /> : <Navigate to="/" />
}
