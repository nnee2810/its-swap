import TokenGuardLayout from "layouts/TokenGuardLayout"
import HomeLayout from "layouts/home"
import { RouteObject } from "react-router-dom"
import ReadContract from "./pages/ReadContract"
import WriteContract from "./pages/WriteContract"

export const contractRoutes: RouteObject = {
  path: "contract",
  element: <TokenGuardLayout />,
  children: [
    {
      path: "read",
      element: (
        <HomeLayout>
          <ReadContract />
        </HomeLayout>
      ),
    },
    {
      path: "write",
      element: (
        <HomeLayout>
          <WriteContract />
        </HomeLayout>
      ),
    },
  ],
}
