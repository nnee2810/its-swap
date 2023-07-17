import HomeLayout from "layouts/home"
import { contractRoutes } from "modules/contract/routes"
import { createBrowserRouter } from "react-router-dom"

export const router = createBrowserRouter([
  {
    path: "",
    element: <HomeLayout />,
  },
  contractRoutes,
])
