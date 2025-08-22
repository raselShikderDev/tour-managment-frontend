import { role } from "@/constants/role";
import { adminSidebarItems } from "@/routes/adminSidebarItem";
import { userSidebarItems } from "@/routes/userSidebarItems";
import type { TRole } from "@/types";

export const getSidebarItems = (usersRole:TRole)=>{
    switch (usersRole) {
        case role.user:
            return [...userSidebarItems]
            break
        case role.admin:
            return [...adminSidebarItems]
            break
        case role.superAdmin:
            return [...adminSidebarItems]
            break
        case role.guide:
            return [...userSidebarItems]
            break
        default:
            return [];
            break
    }
}