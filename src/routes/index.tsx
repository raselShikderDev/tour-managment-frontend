import App from "@/App";
import LoginPage from "@/pages/login";
import { RegisterForm } from "@/components/modules/authentications/registerForm";
import About from "@/pages/about";
import { createBrowserRouter, Navigate } from "react-router";
import Verify from "@/pages/verify";
import Dashboardlayout from "@/components/layout/dashboardLayout";
import { generateRoutes } from "@/utils/generateRoute";
import { adminSidebarItems } from "./adminSidebarItem";
import { userSidebarItems } from "./userSidebarItems";
import Contact from "@/pages/contact";
import Unathorized from "@/pages/unathorized";
import { withAuth } from "@/utils/withAuth";
import { role } from "@/constants/role";
import type { TRole } from "@/types";
import HomePage from "@/pages/homePage";
import TourDetails from "@/pages/user/tourDetails";
import CreateBooking from "@/components/modules/user/booking";

export const router = createBrowserRouter([
  {
    Component: App,
    path: "/",
    children: [
      {
        Component: HomePage,
        index: true,
      },
      {
        Component: About,
        path: "about",
      },
      {
        Component: Contact,
        path: "contact",
      },
      {
        Component: TourDetails,
        path: "tours/:slug",
      },
      {
        Component: CreateBooking,
        path: "booking/:slug",
      },
    ],
  },
  {
    Component: withAuth(
      Dashboardlayout,
      (role.superAdmin as TRole) || (role.admin as TRole)
    ),
    path: "/admin",
    children: [
      { index: true, element: <Navigate to={"/admin/analytics"} /> },
      ...generateRoutes(adminSidebarItems),
    ],
  },
  {
    Component: withAuth(Dashboardlayout, role.user as TRole),
    path: "/user",
    children: [
      { index: true, element: <Navigate to={"/user/bookings"} /> },
      ...generateRoutes(userSidebarItems),
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
  {
    Component: Unathorized,
    path: "unathorized",
  },
]);
