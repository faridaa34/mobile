import { Bell, Wifi, Zap, CreditCard, TrendingUp, Gift, ArrowRight, WalletCards, Wrench, X, CheckCircle } from "lucide-react";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import logoImage from 'figma:asset/ca9a33cd2014031093d2ca062e26e18067414a5c.png';
import { BottomNavigation } from "../components/BottomNavigation";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Link } from "react-router";
import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../components/ui/dialog";
import { toast } from "sonner";

export function HomeNew() {
  const [hasActiveInstallation, setHasActiveInstallation] = useState(false);
  const [selectedPromo, setSelectedPromo] = useState<any>(null);
  const [showPromoModal, setShowPromoModal] = useState(false);

  useEffect(() => {
    // Check jika ada instalasi aktif
    const installation = localStorage.getItem("currentInstallation");
    setHasActiveInstallation(!!installation);
  }, []);

  const user = {
    name: "Billy Nurdani",
    customerId: "87-018091",
  };

  const currentBilling = {
    amount: "200.000",
    dueDate: "01 Mei 2025",
    isPaid: false,
    packageName: "FiberByte Pro",
    speed: "20 Mbps",
  };

  const quickActions = [
    { icon: CreditCard, label: "Bayar Tagihan", color: "from-blue-500 to-blue-600", path: "/payment" },
    { icon: Wifi, label: "Upgrade Paket", color: "from-purple-500 to-purple-600", path: "/upgrade-package" },
    { icon: TrendingUp, label: "Monitoring", color: "from-green-500 to-green-600", path: "/dashboard" },
    { icon: Gift, label: "Promo", color: "from-orange-500 to-orange-600", path: "#promo" },
  ];

  const promos = [
    {
      id: 1,
      title: "Upgrade ke 100 Mbps",
      subtitle: "Diskon 50% bulan pertama!",
      description: "Nikmati kecepatan internet hingga 100 Mbps dengan diskon 50% di bulan pertama. Cocok untuk streaming, gaming, dan work from home!",
      image: "https://images.unsplash.com/photo-1762278804706-31ccc66645b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbnRlcm5ldCUyMHNwZWVkJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NzM0Njk0ODV8MA&ixlib=rb-4.1.0&q=80&w=1080",
      originalPrice: "449.000",
      discountedPrice: "224.500",
      validUntil: "30 April 2026",
      terms: [
        "Berlaku untuk pelanggan baru dan existing",
        "Diskon hanya untuk bulan pertama",
        "Minimum kontrak 12 bulan",
        "Gratis instalasi dan router",
      ],
    },
    {
      id: 2,
      title: "Promo Spesial",
      subtitle: "Cashback 100k untuk pembayaran tepat waktu",
      description: "Dapatkan cashback Rp 100.000 setiap bulan dengan membayar tagihan tepat waktu. Cashback langsung masuk ke akun Anda!",
      image: "https://images.unsplash.com/photo-1768839721483-c4501b5d6eb3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGVjaWFsJTIwb2ZmZXIlMjBwcm9tb3Rpb24lMjBiYW5uZXJ8ZW58MXx8fHwxNzczNDY5NDg3fDA&ixlib=rb-4.1.0&q=80&w=1080",
      cashbackAmount: "100.000",
      validUntil: "31 Mei 2026",
      terms: [
        "Cashback diberikan untuk pembayaran tepat waktu",
        "Maksimal cashback Rp 100.000 per bulan",
        "Cashback akan dikreditkan dalam 3-5 hari kerja",
        "Berlaku untuk semua paket FiberByte",
      ],
    },
  ];

  const handleClaimPromo = (promo: any) => {
    setSelectedPromo(promo);
    setShowPromoModal(true);
  };

  const handleConfirmClaim = () => {
    // Simulasi klaim promo
    toast.success(`Promo "${selectedPromo?.title}" berhasil diklaim!`, {
      description: "Promo akan aktif di tagihan berikutnya",
    });
    
    // Simpan promo yang diklaim ke localStorage
    const claimedPromos = JSON.parse(localStorage.getItem("claimedPromos") || "[]");
    claimedPromos.push({
      ...selectedPromo,
      claimedAt: new Date().toISOString(),
    });
    localStorage.setItem("claimedPromos", JSON.stringify(claimedPromos));
    
    setShowPromoModal(false);
    setSelectedPromo(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pb-20">
      {/* Header */}
      <header className="bg-white px-4 pt-4 pb-4 sticky top-0 z-40 shadow-sm">
        <div className="flex items-center justify-between max-w-lg mx-auto">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <img src={logoImage} alt="Fiber Byte" className="w-6 h-6" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
            </div>
            <div>
              <h1 className="text-sm font-semibold text-gray-800">Hai, {user.name.split(' ')[0]}! 👋</h1>
              <p className="text-xs text-gray-500">ID: {user.customerId}</p>
            </div>
          </div>
          <button className="w-10 h-10 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors relative">
            <Bell className="w-5 h-5 text-gray-700" />
            <div className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="px-4 py-5 space-y-5 max-w-lg mx-auto">
        {/* Billing Status Card - Main Focus */}
        <Card className="p-0 shadow-lg border-0 overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700">
          <div className="p-5 relative">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-40 h-40 bg-white rounded-full -mr-20 -mt-20"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-white rounded-full -ml-16 -mb-16"></div>
            </div>
            
            <div className="relative z-10">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-blue-100 text-xs mb-1">Paket Aktif Anda</p>
                  <h3 className="text-white text-xl font-bold mb-1">{currentBilling.packageName}</h3>
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-yellow-300" />
                    <span className="text-white font-medium">{currentBilling.speed}</span>
                  </div>
                </div>
                <Badge className="bg-white/20 backdrop-blur-sm text-white border-none px-3 py-1">
                  <Wifi className="w-3 h-3 mr-1" />
                  Aktif
                </Badge>
              </div>

              {/* Billing Amount */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 mb-3">
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-blue-100 text-xs mb-2">Tagihan Bulan Ini</p>
                    <div className="flex items-baseline gap-1">
                      <span className="text-white text-sm">Rp</span>
                      <span className="text-white text-3xl font-bold">{currentBilling.amount}</span>
                    </div>
                  </div>
                  <div className={`px-3 py-1.5 rounded-lg ${currentBilling.isPaid ? 'bg-green-500' : 'bg-red-500'}`}>
                    <p className="text-white text-xs font-medium">
                      {currentBilling.isPaid ? 'Lunas' : 'Belum Bayar'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Due Date */}
              <div className="flex items-center justify-between text-sm">
                <span className="text-blue-100">Jatuh tempo</span>
                <span className="text-white font-medium">{currentBilling.dueDate}</span>
              </div>
            </div>
          </div>

          {/* Pay Button */}
          {!currentBilling.isPaid && (
            <Link to="/payment">
              <div className="bg-white px-5 py-3.5 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                    <WalletCards className="w-5 h-5 text-white" />
                  </div>
                  <span className="font-semibold text-gray-800">Bayar Sekarang</span>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400" />
              </div>
            </Link>
          )}
        </Card>

        {/* Active Installation Banner */}
        {hasActiveInstallation && (
          <Link to="/installation-tracking">
            <Card className="p-4 shadow-md border-2 border-purple-200 bg-gradient-to-r from-purple-50 to-blue-50 cursor-pointer hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0 animate-pulse">
                  <Wrench className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-gray-800 mb-0.5">Instalasi Sedang Berlangsung</h3>
                  <p className="text-xs text-gray-600">Tap untuk melihat status pemasangan</p>
                </div>
                <ArrowRight className="w-5 h-5 text-purple-600" />
              </div>
            </Card>
          </Link>
        )}

        {/* Quick Actions */}
        <div>
          <h2 className="text-base font-semibold text-gray-800 mb-3">Akses Cepat</h2>
          <div className="grid grid-cols-4 gap-3">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <Link key={index} to={action.path}>
                  <div className="flex flex-col items-center gap-2 cursor-pointer group">
                    <div className={`w-14 h-14 bg-gradient-to-br ${action.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-xs text-gray-700 text-center font-medium leading-tight">{action.label}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Usage Stats */}
        <Card className="p-4 shadow-md border-0 bg-gradient-to-br from-green-50 to-emerald-50">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-gray-800">Penggunaan Data</h3>
            <Link to="/dashboard">
              <Button variant="ghost" size="sm" className="text-xs h-7 text-green-700 hover:text-green-800">
                Lihat Detail
              </Button>
            </Link>
          </div>
          <div className="space-y-3">
            <div>
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="text-gray-600">Unlimited</span>
                <span className="font-semibold text-green-700">Tanpa Batas</span>
              </div>
              <div className="w-full h-2 bg-white rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-green-500 to-emerald-500 w-full"></div>
              </div>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-green-100">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-green-600" />
                <span className="text-xs text-gray-600">Kecepatan rata-rata</span>
              </div>
              <span className="text-sm font-bold text-green-700">18.5 Mbps</span>
            </div>
          </div>
        </Card>

        {/* Promo Section */}
        <div id="promo">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Gift className="w-5 h-5 text-orange-500" />
              <h2 className="text-base font-semibold text-gray-800">Penawaran Spesial</h2>
            </div>
            <div className="flex gap-1.5">
              <div className="w-6 h-1 bg-gradient-to-r from-orange-500 to-red-500 rounded-full"></div>
              <div className="w-1 h-1 bg-gray-300 rounded-full mt-0.5"></div>
              <div className="w-1 h-1 bg-gray-300 rounded-full mt-0.5"></div>
            </div>
          </div>

          <div className="flex gap-3 overflow-x-auto scrollbar-hide -mx-4 px-4 pb-2">
            {promos.map((promo) => (
              <div key={promo.id} className="flex-shrink-0 w-[280px]">
                <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer group">
                  <div 
                    className="relative h-32 overflow-hidden"
                    onClick={() => handleClaimPromo(promo)}
                  >
                    <ImageWithFallback
                      src={promo.image}
                      alt={promo.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-3 left-3 right-3">
                      <h3 className="text-white font-bold text-sm mb-1">{promo.title}</h3>
                      <p className="text-white/90 text-xs">{promo.subtitle}</p>
                    </div>
                  </div>
                  <div 
                    className="p-3 bg-gradient-to-r from-orange-500 to-red-500"
                    onClick={() => handleClaimPromo(promo)}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-white text-xs font-semibold">Klaim Sekarang</span>
                      <ArrowRight className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* Help Section */}
        <Card className="p-4 shadow-md border-0 bg-gradient-to-r from-blue-50 to-purple-50">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white text-xl">💬</span>
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-gray-800 mb-0.5">Butuh Bantuan?</h3>
              <p className="text-xs text-gray-600">Customer service kami siap membantu 24/7</p>
            </div>
            <Link to="/support">
              <Button size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90">
                Chat
              </Button>
            </Link>
          </div>
        </Card>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation />

      {/* Promo Modal */}
      <Dialog open={showPromoModal} onOpenChange={setShowPromoModal}>
        <DialogContent className="max-w-md mx-4 max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold">Detail Promo</DialogTitle>
            <DialogDescription className="text-xs text-gray-500">
              Berikut adalah detail promo yang Anda pilih. Pastikan Anda memahami syarat dan ketentuan sebelum mengklaim.
            </DialogDescription>
          </DialogHeader>
          {selectedPromo && (
            <div className="space-y-4">
              {/* Promo Image */}
              <div className="relative h-40 rounded-xl overflow-hidden">
                <ImageWithFallback
                  src={selectedPromo.image}
                  alt={selectedPromo.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-3 left-3 right-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Gift className="w-5 h-5 text-white" />
                    <h3 className="text-lg font-bold text-white">{selectedPromo.title}</h3>
                  </div>
                  <p className="text-white/90 text-sm">{selectedPromo.subtitle}</p>
                </div>
              </div>

              <p className="text-sm text-gray-600">{selectedPromo.description}</p>

              {/* Promo Details */}
              <Card className="p-4 bg-gradient-to-r from-orange-50 to-red-50 border-orange-200">
                <div className="space-y-2">
                  {selectedPromo.originalPrice && selectedPromo.discountedPrice && (
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-gray-600">Harga Normal:</span>
                        <span className="text-sm text-gray-500 line-through">Rp {selectedPromo.originalPrice}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-600">Harga Promo:</span>
                        <span className="text-lg font-bold text-orange-600">Rp {selectedPromo.discountedPrice}</span>
                      </div>
                      <div className="mt-2 pt-2 border-t border-orange-200">
                        <div className="inline-block px-3 py-1 bg-green-100 rounded-full">
                          <span className="text-xs font-semibold text-green-700">
                            Hemat Rp {(parseFloat(selectedPromo.originalPrice.replace(/\./g, '')) - parseFloat(selectedPromo.discountedPrice.replace(/\./g, ''))).toLocaleString('id-ID')}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                  {selectedPromo.cashbackAmount && (
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-600">Cashback:</span>
                      <span className="text-lg font-bold text-green-600">Rp {selectedPromo.cashbackAmount}</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between pt-2 border-t border-orange-200">
                    <span className="text-xs text-gray-600">Berlaku Hingga:</span>
                    <span className="text-sm font-semibold text-gray-800">{selectedPromo.validUntil}</span>
                  </div>
                </div>
              </Card>

              {/* Terms and Conditions */}
              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-gray-800">Syarat dan Ketentuan:</h4>
                <ul className="space-y-1.5">
                  {selectedPromo.terms.map((term: string, index: number) => (
                    <li key={index} className="flex gap-2 text-xs text-gray-600">
                      <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>{term}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 pt-2">
                <Button 
                  variant="outline"
                  className="flex-1" 
                  onClick={() => setShowPromoModal(false)}
                >
                  Batal
                </Button>
                <Button 
                  className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 hover:opacity-90" 
                  onClick={handleConfirmClaim}
                >
                  <Gift className="w-4 h-4 mr-2" />
                  Klaim Promo
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}