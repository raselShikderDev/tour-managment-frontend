import App from "@/App";
import LoginPage from "@/pages/login";
import { RegisterForm } from "@/components/modules/authentications/registerForm";
import About from "@/pages/about";
import { createBrowserRouter } from "react-router";
import Verify from "@/pages/verify";

export const router = createBrowserRouter([
  {
    Component: App,
    path: "/",
    children: [
      {
        Component: About,
        path: "/about",
      },
      {
        Component: LoginPage,
        path: "/sign-in",
      },
      {
        Component: RegisterForm,
        path: "/sign-up",
      },
      {
        Component: Verify,
        path: "/verify",
      },
    ],
  },
]);
