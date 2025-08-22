import App from "@/App";
import LoginPage from "@/pages/login";
import { RegisterForm } from "@/components/modules/authentications/registerForm";
import About from "@/pages/about";
import { createBrowserRouter } from "react-router";
import Verify from "@/pages/verify";
import Dashboardlayout from "@/components/layout/dashboardLayout";
import Bookings from "@/pages/user/bookings";
import { generateRoutes } from "@/utils/generateRoute";
import { adminSidebarItems } from "./adminSidebarItem";

export const router = createBrowserRouter([
  {
    Component: App,
    path: "/",
    children: [
      {
        Component: About,
        path: "about",
      },
      {
        Component: Dashboardlayout,
        path: "/admin",
        children: [...generateRoutes(adminSidebarItems)],
      },
      {
        Component: Dashboardlayout,
        path: "/user",
        children: [
          {
            Component: Bookings,
            path: "bookings",
          },
        ],
      },
      {
        Component: LoginPage,
        path: "sign-in",
      },
      {
        Component: RegisterForm,
        path: "sign-up",
      },
      {
        Component: Verify,
        path: "verify",
      },
    ],
  },
]);
