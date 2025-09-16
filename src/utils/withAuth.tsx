import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import type { TRole } from "@/types";
import type { ComponentType } from "react";
import { Navigate } from "react-router";

export const withAuth = (Component: ComponentType, requiredRole?: TRole) => {
  return function AuthWrapper() {
    const { data, isLoading } = useUserInfoQuery(null);

    if (!isLoading && !data?.data?.email) {
      return <Navigate to={"/sign-in"} />;
    }

    if (requiredRole && !isLoading && requiredRole !== data?.data?.role) {
      return <Navigate to={"/unathorized"} />;
    }
    console.log("Inside withAuth", data?.data);

    return <Component />;
  };
};




