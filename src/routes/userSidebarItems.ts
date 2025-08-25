
// import Bookings from "@/pages/user/bookings";
import ToursPage from "@/pages/user/tours_page";
import type { ISideBarItem } from "@/types";
import { lazy } from "react";

const Bookings = lazy(()=>import("@/pages/user/bookingsPage"))

export const userSidebarItems:ISideBarItem[] = [
    {
      title: "Bookings",
      items: [
        {
          title: "All Bookings",
          url: "/user/bookings",
          component:Bookings
        },
        {
          title: "Completed",
          url: "/user/bookings",
          component:Bookings
        },
        {
          title: "Pending",
          url: "/user/bookings",
          component:Bookings
        },
      ],
    },
    {
      title: "Tours",
      items: [
        {
          title: "All Tours",
          url: "/user/tours",
          component:ToursPage
        },
        {
          title: "Fututre",
          url: "/user/bookings",
          component:Bookings
        },
        {
          title: "Ongoing",
          url: "/user/bookings",
          component:Bookings
        },
      ],
    },
  ]