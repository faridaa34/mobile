import { Link, useLocation } from "react-router";
import { Home, Package, CreditCard, User } from "lucide-react";

export function BottomNavigation() {
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Beranda", icon: Home },
    { path: "/packages", label: "Paket", icon: Package },
    { path: "/payment", label: "Bayar", icon: CreditCard },
    { path: "/account", label: "Akun", icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 safe-area-inset-bottom z-50 shadow-lg">
      <div className="grid grid-cols-4 h-16 max-w-lg mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center justify-center gap-1 transition-all ${
                isActive 
                  ? "text-blue-600" 
                  : "text-gray-500 active:scale-95"
              }`}
            >
              <div className={`relative ${isActive ? "scale-110" : ""}`}>
                <Icon className="w-6 h-6" strokeWidth={isActive ? 2.5 : 2} />
                {isActive && (
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-blue-600 rounded-full"></div>
                )}
              </div>
              <span className={`text-xs ${isActive ? "font-semibold" : "font-medium"}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}