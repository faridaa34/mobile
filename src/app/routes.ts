import { createBrowserRouter } from "react-router";
import { Home } from "./pages/Home";
import { HomeNew } from "./pages/HomeNew";
import { Dashboard } from "./pages/Dashboard";
import { Packages } from "./pages/Packages";
import { Support } from "./pages/Support";
import { Payment } from "./pages/Payment";
import { Account } from "./pages/Account";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { ForgotPassword } from "./pages/ForgotPassword";
import { InstallationTracking } from "./pages/InstallationTracking";
import { UpgradePackage } from "./pages/UpgradePackage";
import { Root } from "./Root";
import { NotFound } from "./pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/register",
    Component: Register,
  },
  {
    path: "/forgot-password",
    Component: ForgotPassword,
  },
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: HomeNew },
      { path: "home-old", Component: Home },
      { path: "dashboard", Component: Dashboard },
      { path: "packages", Component: Packages },
      { path: "upgrade-package", Component: UpgradePackage },
      { path: "payment", Component: Payment },
      { path: "account", Component: Account },
      { path: "support", Component: Support },
      { path: "installation-tracking", Component: InstallationTracking },
      { path: "*", Component: NotFound },
    ],
  },
]);