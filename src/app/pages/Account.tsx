import { User, Settings, Bell, HelpCircle, FileText, LogOut, ChevronRight } from "lucide-react";
import { Card } from "../components/ui/card";
import { Avatar, AvatarFallback } from "../components/ui/avatar";
import { BottomNavigation } from "../components/BottomNavigation";
import { Link } from "react-router";

export function Account() {
  const menuItems = [
    {
      icon: User,
      title: "Profil Saya",
      description: "Kelola informasi pribadi",
      path: "/profile",
    },
    {
      icon: Settings,
      title: "Pengaturan",
      description: "Preferensi aplikasi",
      path: "/settings",
    },
    {
      icon: Bell,
      title: "Notifikasi",
      description: "Atur notifikasi",
      path: "/notifications",
    },
    {
      icon: HelpCircle,
      title: "Bantuan",
      description: "Pusat bantuan & FAQ",
      path: "/support",
    },
    {
      icon: FileText,
      title: "Syarat & Ketentuan",
      description: "Kebijakan layanan",
      path: "/terms",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 pt-3 pb-8 sticky top-0 z-40 shadow-md">
        <div className="flex items-center gap-4 max-w-lg mx-auto">
          <Avatar className="w-16 h-16 border-3 border-white shadow-lg">
            <AvatarFallback className="bg-white text-blue-600 text-xl">
              FB
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-xl mb-1">FiberByte User</h1>
            <p className="text-blue-100 text-sm">user@fiberbyte.id</p>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="px-4 -mt-4 space-y-5 max-w-lg mx-auto">
        {/* Informasi Akun */}
        <Card className="p-5 shadow-md border-0">
          <h2 className="text-lg mb-4 text-gray-800">Informasi Akun</h2>
          <div className="space-y-3">
            <div className="flex justify-between py-2.5 border-b border-gray-100">
              <span className="text-gray-600 text-[15px]">ID Pelanggan</span>
              <span className="font-semibold text-gray-800">FB-2025-12345</span>
            </div>
            <div className="flex justify-between py-2.5 border-b border-gray-100">
              <span className="text-gray-600 text-[15px]">Status</span>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span className="text-green-600 font-semibold">Aktif</span>
              </div>
            </div>
            <div className="flex justify-between py-2.5 border-b border-gray-100">
              <span className="text-gray-600 text-[15px]">Paket</span>
              <span className="font-semibold text-gray-800">3 Mb</span>
            </div>
            <div className="flex justify-between py-2.5">
              <span className="text-gray-600 text-[15px]">Bergabung sejak</span>
              <span className="font-semibold text-gray-800">Januari 2024</span>
            </div>
          </div>
        </Card>

        {/* Menu Items */}
        <div className="space-y-3">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <Link key={index} to={item.path}>
                <Card className="p-4 hover:shadow-lg transition-all cursor-pointer border-0 shadow-md active:scale-[0.98]">
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800 mb-0.5">{item.title}</h3>
                      <p className="text-sm text-gray-600">{item.description}</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>

        {/* Logout Button */}
        <Card className="p-4 hover:shadow-lg transition-all cursor-pointer bg-gradient-to-r from-red-50 to-pink-50 border-0 shadow-md active:scale-[0.98]">
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 bg-gradient-to-br from-red-100 to-red-200 rounded-xl flex items-center justify-center flex-shrink-0">
              <LogOut className="w-5 h-5 text-red-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-red-600">Keluar</h3>
              <p className="text-sm text-red-600/70">Logout dari akun Anda</p>
            </div>
          </div>
        </Card>

        {/* App Version */}
        <div className="text-center text-sm text-gray-500 pt-4 pb-2">
          <p>FiberByte v1.0.0</p>
          <p className="mt-1">© 2026 PT Global Media Data Prima</p>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
}