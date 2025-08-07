import App from "@/App";
import LoginPage from "@/components/modules/authentications/login";
import { RegisterForm } from "@/components/registerForm";
import About from "@/pages/about";
import { createBrowserRouter } from "react-router";

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
    ],
  },
]);
