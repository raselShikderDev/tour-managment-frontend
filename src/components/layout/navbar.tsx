import Logo from "@/assets/icons/logo";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ModeToggle } from "./mode-toggler";
import {
  authApi,
  useLogOutMutation,
  useUserInfoQuery,
} from "@/redux/features/auth/auth.api";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { role } from "@/constants/role";
import React from "react";

// Navigation links array to be used in both desktop and mobile menus
const navigationLinks = [
  { href: "/", label: "Home", role: "PUBLIC" },
  { href: "/about", label: "About", role: "PUBLIC" },
  { href: "/tours", label: "Tours", role: "PUBLIC" },
  { href: "/contact", label: "Contact", role: "PUBLIC" },
  { href: "/admin", label: "Dashboard", role: role.admin },
  { href: "/admin", label: "Dashboard", role: role.superAdmin },
  { href: "/user", label: "Dashboard", role: role.user },
];

export default function Navbar() {
  const { data, isLoading } = useUserInfoQuery(null);
  const [logOut] = useLogOutMutation();
  const userRole = data?.data?.role;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logOut(null);
    toast.success("Successfullly logOut");
    dispatch(authApi.util.resetApiState());
  };

  const filterLinks = navigationLinks.filter((item) => {
    if (item.role === "PUBLIC") {
      return true;
    }
    if (userRole && item.role === userRole) {
      return true;
    }
    return false;
  });

  return (
    <header className="border-b px-4">
      <div className="mx-auto container flex h-16 items-center justify-between gap-4">
        {/* Left side */}
        <div className="flex items-center gap-2">
          {/* Mobile menu trigger */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                className="group size-8 md:hidden"
                variant="ghost"
                size="icon"
              >
                <svg
                  className="pointer-events-none"
                  width={16}
                  height={16}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 12L20 12"
                    className="origin-center -translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
                  />
                  <path
                    d="M4 12H20"
                    className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
                  />
                  <path
                    d="M4 12H20"
                    className="origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
                  />
                </svg>
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-36 p-1 md:hidden">
              <NavigationMenu className="max-w-none *:w-full">
                <NavigationMenuList className="flex-col items-start gap-0 md:gap-2">
                  {filterLinks.map((link, index) => (
                    <NavigationMenuItem key={index} className="w-full">
                      <NavigationMenuLink asChild className="py-1.5">
                        <Link to={link.href}>{link.label}</Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </PopoverContent>
          </Popover>
          {/* Main nav */}
          <div className="flex items-center gap-6">
            <Button
              onClick={() => navigate("/")}
              className="text-primary hover:text-primary/90"
              variant={"ghost"}
            >
              <Logo />
            </Button>
            {/* Navigation menu */}
            <NavigationMenu className="max-md:hidden">
              <NavigationMenuList className="gap-2">
                {filterLinks.map((link, index) => (
                  <React.Fragment key={index}>
                    {link.role === "PUBLIC" && (
                      <NavigationMenuItem>
                        <NavigationMenuLink
                          asChild
                          className="text-muted-foreground hover:text-primary py-1.5 font-medium"
                        >
                          <Link to={link.href}>{link.label}</Link>
                        </NavigationMenuLink>
                      </NavigationMenuItem>
                    )}
                    {data?.data.role && link.role === data?.data.role && (
                      <NavigationMenuItem>
                        <NavigationMenuLink
                          asChild
                          className="text-muted-foreground hover:text-primary py-1.5 font-medium"
                        >
                          <Link to={link.href}>{link.label}</Link>
                        </NavigationMenuLink>
                      </NavigationMenuItem>
                    )}
                  </React.Fragment>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>
        {/* Right side */}
        <div className="flex items-center gap-2">
          <ModeToggle />
          {!isLoading && data?.data?.email ? (
            <Button
              onClick={handleLogout}
              variant={"outline"}
              className="text-sm cursor-pointer"
            >
              LogOut
            </Button>
          ) : (
            <Button asChild className="text-sm cursor-pointer">
              <Link to="/sign-in">LogIn</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
