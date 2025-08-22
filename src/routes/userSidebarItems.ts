
// import Bookings from "@/pages/user/bookings";
import type { ISideBarItem } from "@/types";
import { lazy } from "react";

const Bookings = lazy(()=>import("@/pages/user/bookings"))

export const userSidebarItems:ISideBarItem[] = [
    {
      title: "Tours",
      items: [
        {
          title: "All Bookings",
          url: "/user/bookings",
          component:Bookings
        },
      ],
    },
  ]