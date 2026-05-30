import { Check, Zap, Building2, Home, ChevronLeft, Star, Sparkles, MapPin, Calendar, Phone, User } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { BottomNavigation } from "../components/BottomNavigation";
import { useNavigate } from "react-router";
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../components/ui/dialog";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { toast } from "sonner";

export function Packages() {
  const navigate = useNavigate();
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [orderData, setOrderData] = useState({
    name: "",
    phone: "",
    address: "",
    installDate: "",
    notes: "",
  });

  const packages = [
    {
      id: "basic",
      name: "Basic",
      subtitle: "Untuk Browsing",
      speed: "50",
      price: "299.000",
      icon: Home,
      color: "from-blue-500 to-cyan-500",
      features: [
        "Kecepatan hingga 50 Mbps",
        "Unlimited kuota internet",
        "Koneksi stabil 5 perangkat",
        "Support customer 24/7",
        "Gratis biaya pemasangan",
      ],
      popular: false,
      badge: null,
    },
    {
      id: "pro",
      name: "Pro",
      subtitle: "Paling Populer",
      speed: "100",
      price: "449.000",
      icon: Zap,
      color: "from-purple-500 to-pink-500",
      features: [
        "Kecepatan hingga 100 Mbps",
        "Unlimited kuota internet",
        "Koneksi stabil 10 perangkat",
        "Support prioritas 24/7",
        "Gratis instalasi & router",
        "Bonus streaming 1 bulan",
      ],
      popular: true,
      badge: "Terpopuler",
    },
    {
      id: "ultra",
      name: "Ultra",
      subtitle: "Untuk Bisnis",
      speed: "200",
      price: "699.000",
      icon: Building2,
      color: "from-orange-500 to-red-500",
      features: [
        "Kecepatan hingga 200 Mbps",
        "Unlimited kuota internet",
        "Koneksi stabil 20+ perangkat",
        "Support prioritas 24/7",
        "Gratis instalasi & router premium",
        "Bonus streaming premium 3 bulan",
        "IP statis dedicated",
      ],
      popular: false,
      badge: "Terbaik",
    },
  ];

  const handleSelectPackage = (packageId: string) => {
    setSelectedPackage(packageId);
    setShowOrderModal(true);
  };

  const handleSubmitOrder = () => {
    // Validasi form
    if (!orderData.name || !orderData.phone || !orderData.address || !orderData.installDate) {
      toast.error("Mohon lengkapi semua data yang diperlukan");
      return;
    }

    // Simpan data order ke localStorage (simulasi)
    const selectedPkg = packages.find(p => p.id === selectedPackage);
    const order = {
      id: Date.now().toString(),
      package: selectedPkg,
      customerData: orderData,
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem("currentInstallation", JSON.stringify(order));
    
    toast.success("Pesanan berhasil dibuat!");
    setShowOrderModal(false);
    
    // Redirect ke halaman tracking
    setTimeout(() => {
      navigate("/installation-tracking");
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pb-20">
      {/* Header */}
      <header className="bg-white px-4 pt-4 pb-4 sticky top-0 z-40 shadow-sm border-b border-gray-100">
        <div className="flex items-center gap-3 max-w-lg mx-auto">
          <button 
            onClick={() => navigate(-1)}
            className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-xl transition-colors"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>
          <div className="flex-1">
            <h1 className="text-lg font-semibold text-gray-800">Paket Internet</h1>
            <p className="text-xs text-gray-500">Pilih paket sesuai kebutuhan Anda</p>
          </div>
        </div>
      </header>

      {/* Info Banner */}
      <div className="px-4 py-4 max-w-lg mx-auto space-y-3">
        <Card className="p-4 bg-gradient-to-r from-blue-600 to-purple-600 border-0 shadow-lg">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-white font-semibold text-sm mb-1">Promo Bulan Ini!</h3>
              <p className="text-blue-100 text-xs">Gratis instalasi untuk semua paket</p>
            </div>
          </div>
        </Card>

        {/* Upgrade Banner for existing customers */}
        <Card className="p-4 bg-gradient-to-r from-orange-500 to-pink-500 border-0 shadow-lg">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center flex-shrink-0">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-white font-semibold text-sm mb-1">Sudah Pelanggan?</h3>
              <p className="text-orange-100 text-xs">Upgrade paket tanpa instalasi, aktif instant!</p>
            </div>
            <Button
              onClick={() => navigate("/upgrade-package")}
              size="sm"
              className="bg-white text-orange-600 hover:bg-orange-50 font-semibold"
            >
              Upgrade
            </Button>
          </div>
        </Card>
      </div>

      <div className="px-4 pb-5 space-y-4 max-w-lg mx-auto">
        {packages.map((pkg) => {
          const Icon = pkg.icon;
          const isSelected = selectedPackage === pkg.id;
          
          return (
            <Card
              key={pkg.id}
              className={`p-0 overflow-hidden border-2 transition-all ${
                pkg.popular 
                  ? "ring-2 ring-purple-400 shadow-xl" 
                  : isSelected 
                    ? "border-blue-500 shadow-lg" 
                    : "border-gray-200 shadow-md"
              }`}
            >
              {/* Header */}
              <div className={`p-5 bg-gradient-to-r ${pkg.color} text-white relative overflow-hidden`}>
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -mr-16 -mt-16"></div>
                </div>
                
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold">{pkg.name}</h3>
                        <p className="text-white/90 text-xs">{pkg.subtitle}</p>
                      </div>
                    </div>
                    {pkg.badge && (
                      <Badge className="bg-white/30 backdrop-blur-sm text-white border-none">
                        <Star className="w-3 h-3 mr-1" />
                        {pkg.badge}
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-baseline gap-1 mb-2">
                    <span className="text-5xl font-bold">{pkg.speed}</span>
                    <span className="text-xl font-semibold">Mbps</span>
                  </div>

                  <div className="flex items-baseline gap-1">
                    <span className="text-sm opacity-90">Rp</span>
                    <span className="text-2xl font-bold">{pkg.price}</span>
                    <span className="text-sm opacity-90">/bulan</span>
                  </div>
                </div>
              </div>

              {/* Features */}
              <div className="p-5 bg-white">
                <ul className="space-y-3 mb-5">
                  {pkg.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5 text-green-600" />
                      </div>
                      <span className="text-gray-700 text-sm flex-1">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  onClick={() => handleSelectPackage(pkg.id)}
                  className={`w-full h-12 font-semibold rounded-xl shadow-md transition-all ${
                    pkg.popular
                      ? `bg-gradient-to-r ${pkg.color} hover:opacity-90`
                      : isSelected
                        ? 'bg-blue-600 hover:bg-blue-700'
                        : `bg-gradient-to-r ${pkg.color} hover:opacity-90`
                  }`}
                >
                  {isSelected ? (
                    <>
                      <Check className="w-5 h-5 mr-2" />
                      Terpilih
                    </>
                  ) : (
                    <>Pilih Paket {pkg.name}</>
                  )}
                </Button>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Comparison Info */}
      <div className="px-4 pb-5 max-w-lg mx-auto">
        <Card className="p-5 shadow-md border-0 bg-gradient-to-r from-blue-50 to-purple-50">
          <h3 className="font-semibold text-gray-800 mb-3 text-sm">💡 Tips Memilih Paket</h3>
          <ul className="space-y-2 text-xs text-gray-600">
            <li className="flex gap-2">
              <span>•</span>
              <span><strong>Basic:</strong> Cocok untuk browsing dan email</span>
            </li>
            <li className="flex gap-2">
              <span>•</span>
              <span><strong>Pro:</strong> Ideal untuk streaming dan gaming</span>
            </li>
            <li className="flex gap-2">
              <span>•</span>
              <span><strong>Ultra:</strong> Perfect untuk bisnis dan keluarga besar</span>
            </li>
          </ul>
        </Card>
      </div>

      {/* Help Section */}
      <div className="px-4 pb-5 max-w-lg mx-auto">
        <Card className="p-4 shadow-md border-0 bg-gradient-to-r from-blue-50 to-purple-50">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white text-xl">🤔</span>
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-gray-800 mb-0.5">Butuh Bantuan Memilih?</h3>
              <p className="text-xs text-gray-600">Konsultasi gratis dengan tim kami</p>
            </div>
            <Button 
              onClick={() => navigate('/support')}
              size="sm" 
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90"
            >
              Chat
            </Button>
          </div>
        </Card>
      </div>

      <BottomNavigation />

      {/* Order Modal */}
      <Dialog open={showOrderModal} onOpenChange={setShowOrderModal}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Pesan Paket {selectedPackage ? packages.find(p => p.id === selectedPackage)?.name : ""}</DialogTitle>
            <DialogDescription>
              Isi formulir berikut untuk memulai proses pemesanan.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name">Nama Lengkap</Label>
              <Input
                id="name"
                value={orderData.name}
                onChange={(e) => setOrderData({ ...orderData, name: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phone">Nomor Telepon</Label>
              <Input
                id="phone"
                value={orderData.phone}
                onChange={(e) => setOrderData({ ...orderData, phone: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="address">Alamat</Label>
              <Input
                id="address"
                value={orderData.address}
                onChange={(e) => setOrderData({ ...orderData, address: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="installDate">Tanggal Instalasi</Label>
              <Input
                id="installDate"
                type="date"
                value={orderData.installDate}
                onChange={(e) => setOrderData({ ...orderData, installDate: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="notes">Catatan (Opsional)</Label>
              <Textarea
                id="notes"
                value={orderData.notes}
                onChange={(e) => setOrderData({ ...orderData, notes: e.target.value })}
                className="col-span-3"
              />
            </div>
          </div>
          <Button
            onClick={handleSubmitOrder}
            className="w-full h-12 font-semibold rounded-xl shadow-md transition-all bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90"
          >
            Pesan Sekarang
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}