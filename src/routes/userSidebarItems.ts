// import Bookings from "@/pages/user/bookings";
// import ToursPage from "@/pages/user/tours_page";
import type { ISideBarItem } from "@/types";
import { lazy } from "react";

const Bookings = lazy(() => import("@/pages/user/bookingsPage"));
const PendingBookingsPage = lazy(() => import("@/pages/user/pendingBookings"));
const CompletedBookingsPage = lazy(() => import("@/pages/user/completedBookings"));
const ToursPage = lazy(() => import("@/pages/user/tours_page"));

export const userSidebarItems: ISideBarItem[] = [
  {
    title: "Bookings",
    items: [
      {
        title: "Tours",
        url: "tours",
        component: ToursPage,
      },
      {
        title: "All Bookings",
        url: "/user/bookings",
        component: Bookings,
      },
      {
        title: "Completed",
        url: "/user/completed-bookings",
        component: CompletedBookingsPage,
      },
      {
        title: "Pending",
        url: "/user/pending-bookings",
        component: PendingBookingsPage,
      },
    ],
  },
];
