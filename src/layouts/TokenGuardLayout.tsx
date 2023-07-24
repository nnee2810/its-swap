import { Navigate, Outlet } from "react-router-dom"
import { useTokenCheckingStore } from "store/tokenChecking"

export default function TokenGuardLayout() {
  const { address } = useTokenCheckingStore()

  return address ? <Outlet /> : <Navigate to="/" />
}
