import { Outlet, useLocation } from "react-router";
import { Navigation } from "./components/Navigation";
import { useEffect } from "react";

export function Root() {
  const location = useLocation();
  
  // Halaman yang menggunakan layout mobile tanpa navigation header
  const mobilePages = ["/", "/payment", "/account", "/packages"];
  const isMobilePage = mobilePages.includes(location.pathname);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="size-full flex flex-col">
      {!isMobilePage && <Navigation />}
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}