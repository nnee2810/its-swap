import HomeLayout from "layouts/home"
import { RouteObject } from "react-router-dom"
import ReadContract from "./pages/ReadContract"
import WriteContract from "./pages/WriteContract"

export const contractRoutes: RouteObject = {
  path: "contract",
  element: <HomeLayout />,
  children: [
    {
      path: "read",
      element: <ReadContract />,
    },
    {
      path: "write",
      element: <WriteContract />,
    },
  ],
}
