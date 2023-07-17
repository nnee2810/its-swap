import HomeLayout from "layouts/home"
import { RouteObject } from "react-router-dom"
import ReadContract from "./pages/ReadContract"

export const contractRoutes: RouteObject = {
  path: "contract",
  element: <HomeLayout />,
  children: [
    {
      path: "read",
      element: <ReadContract />,
    },
  ],
}
