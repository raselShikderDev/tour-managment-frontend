import AddTour from "@/pages/admin/add-tour";
import AddTourType from "@/pages/admin/add-tour-type";
import Analytics from "@/pages/admin/analytics";
import type { ISideBarItem } from "@/types";

export const adminSidebarItems:ISideBarItem[] = [
    {
      title: "Dashboard",
      items: [
        {
          title: "Analytics",
          url: "/admin/analytics",
          component:Analytics
        },
      ],
    },
    {
      title: "Tour Managment",
      items: [
        {
          title: "Add Tour",
          url: "/admin/add-tour",
          component:AddTour
        },
        {
          title: "Add tour type",
          url: "/admin/add-tour-type",
          component:AddTourType
        },
      ],
    },
  ]