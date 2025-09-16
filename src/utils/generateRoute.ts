import type { ISideBarItem } from "@/types"

export const generateRoutes = (sidebarItem: ISideBarItem[]) => {
  return sidebarItem.flatMap((section) => section.items.map((route)=>({
    path:route.url,
    Component:route.component
  }))); 
}

