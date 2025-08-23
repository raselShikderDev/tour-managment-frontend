// import AddTour from "@/pages/admin/add-tour";
// import AddTourType from "@/pages/admin/add-tour-type";
// import Analytics from "@/pages/admin/analytics";
import AddDivision from "@/pages/admin/add-division";
import type { ISideBarItem } from "@/types";
import { lazy } from "react";

const Analytics = lazy(() => import("@/pages/admin/analytics"));
const AddTour = lazy(() => import("@/pages/admin/add-tour"));
const AddTourType = lazy(() => import("@/pages/admin/add-tour-type"));

export const adminSidebarItems: ISideBarItem[] = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Analytics",
        url: "/admin/analytics",
        component: Analytics,
      },
    ],
  },
  {
    title: "Tour Managment",
    items: [
      {
        title: "Add Tour",
        url: "/admin/add-tour",
        component: AddTour,
      },
      {
        title: "Add tour type",
        url: "/admin/add-tour-type",
        component: AddTourType,
      },
      {
        title: "Add division",
        url: "/admin/add-division",
        component: AddDivision,
      },
    ],
  },
];
