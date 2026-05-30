import { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowRight, Check, Zap, Wifi, ChevronLeft, Shield, Clock, TrendingUp, ArrowUp } from "lucide-react";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Dialog, DialogContent } from "../components/ui/dialog";
import { toast } from "sonner";

export function UpgradePackage() {
  const navigate = useNavigate();
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Paket saat ini
  const currentPackage = {
    id: "premium",
    name: "FiberByte Premium",
    speed: "500 Mbps",
    price: 450000,
    features: [
      "Kecepatan hingga 500 Mbps",
      "Unlimited kuota",
      "Gratis pemasangan",
      "Support 24/7",
    ]
  };

  // Paket upgrade yang tersedia
  const upgradePackages = [
    {
      id: "ultra",
      name: "FiberByte Ultra",
      speed: "750 Mbps",
      price: 650000,
      difference: 200000,
      popular: true,
      features: [
        "Kecepatan hingga 750 Mbps",
        "Unlimited kuota",
        "Gratis upgrade instant",
        "Priority support 24/7",
        "Bonus WiFi 6 router",
        "Free static IP",
      ],
      benefits: [
        "50% lebih cepat dari paket sekarang",
        "Cocok untuk WFH & gaming",
        "Streaming 4K tanpa buffering",
      ]
    },
    {
      id: "gigabit",
      name: "FiberByte Gigabit",
      speed: "1 Gbps",
      price: 850000,
      difference: 400000,
      premium: true,
      features: [
        "Kecepatan hingga 1 Gbps",
        "Unlimited kuota",
        "Gratis upgrade instant",
        "VIP support 24/7",
        "Bonus WiFi 6E router premium",
        "Free static IP",
        "Free cloud backup 100GB",
        "Dedicated bandwidth",
      ],
      benefits: [
        "2x lebih cepat dari paket sekarang",
        "Perfect untuk kantor & content creator",
        "Streaming 8K & download super cepat",
        "Multi-device tanpa lag",
      ]
    },
  ];

  const handleUpgrade = (packageId: string) => {
    setSelectedPackage(packageId);
    setShowConfirmation(true);
  };

  const confirmUpgrade = () => {
    const pkg = upgradePackages.find(p => p.id === selectedPackage);
    if (!pkg) return;

    toast.loading("Memproses upgrade paket...");

    // Simulate upgrade process
    setTimeout(() => {
      toast.dismiss();
      toast.success(`Upgrade ke ${pkg.name} berhasil!`, {
        description: "Paket Anda akan aktif dalam 5-10 menit",
      });

      // Save upgrade info to localStorage
      localStorage.setItem("upgradedPackage", JSON.stringify({
        package: pkg.name,
        speed: pkg.speed,
        price: pkg.price,
        upgradeDate: new Date().toISOString(),
      }));

      setShowConfirmation(false);

      // Redirect to dashboard after 2 seconds
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pb-20">
      {/* Header */}
      <header className="bg-white px-4 pt-4 pb-4 sticky top-0 z-40 shadow-sm border-b border-gray-100">
        <div className="flex items-center gap-3 max-w-6xl mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-xl transition-colors"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>
          <div className="flex-1">
            <h1 className="text-lg font-semibold text-gray-800">Upgrade Paket</h1>
            <p className="text-xs text-gray-500">Tingkatkan kecepatan internet Anda</p>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="px-4 py-6 space-y-6 max-w-6xl mx-auto">
        {/* Current Package */}
        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-3">Paket Anda Saat Ini</h2>
          <Card className="p-5 bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200">
            <div className="flex items-start justify-between mb-4">
              <div>
                <Badge className="bg-blue-600 text-white border-none mb-2">
                  Paket Aktif
                </Badge>
                <h3 className="text-xl font-bold text-gray-800 mb-1">{currentPackage.name}</h3>
                <div className="flex items-center gap-2 text-gray-600">
                  <Wifi className="w-4 h-4" />
                  <span className="font-semibold">{currentPackage.speed}</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Harga per bulan</p>
                <p className="text-2xl font-bold text-gray-800">
                  Rp {currentPackage.price.toLocaleString('id-ID')}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {currentPackage.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2 text-sm text-gray-700">
                  <Check className="w-4 h-4 text-blue-600" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Upgrade Benefits Banner */}
        <Card className="p-5 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center flex-shrink-0">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold mb-2">Kenapa Upgrade Paket?</h3>
              <div className="grid sm:grid-cols-3 gap-3 text-sm">
                <div className="flex items-start gap-2">
                  <Clock className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold">Aktivasi Instant</p>
                    <p className="text-blue-100 text-xs">5-10 menit aktif</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Shield className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold">Tanpa Instalasi</p>
                    <p className="text-blue-100 text-xs">Upgrade remote</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <TrendingUp className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold">Kecepatan Lebih</p>
                    <p className="text-blue-100 text-xs">Hingga 2x lipat</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Upgrade Packages */}
        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-3">Pilih Paket Upgrade</h2>
          <div className="grid lg:grid-cols-2 gap-6">
            {upgradePackages.map((pkg) => (
              <Card
                key={pkg.id}
                className={`p-6 relative overflow-hidden transition-all hover:shadow-xl ${
                  pkg.popular ? 'border-2 border-purple-500' : 'border border-gray-200'
                }`}
              >
                {/* Popular Badge */}
                {pkg.popular && (
                  <div className="absolute top-0 right-0">
                    <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold px-4 py-1 rounded-bl-xl">
                      ⭐ POPULER
                    </div>
                  </div>
                )}

                {/* Premium Badge */}
                {pkg.premium && (
                  <div className="absolute top-0 right-0">
                    <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs font-bold px-4 py-1 rounded-bl-xl">
                      👑 PREMIUM
                    </div>
                  </div>
                )}

                {/* Package Header */}
                <div className="mb-5 pt-2">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">{pkg.name}</h3>
                  <div className="flex items-baseline gap-2 mb-3">
                    <div className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg">
                      <Wifi className="w-5 h-5" />
                      <span className="text-xl font-bold">{pkg.speed}</span>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-3xl font-bold text-gray-800">
                      Rp {pkg.price.toLocaleString('id-ID')}
                    </span>
                    <span className="text-gray-600">/bulan</span>
                  </div>

                  {/* Difference */}
                  <div className="flex items-center gap-2 text-sm">
                    <ArrowUp className="w-4 h-4 text-orange-600" />
                    <span className="text-gray-600">
                      Tambahan <span className="font-semibold text-orange-600">
                        Rp {pkg.difference.toLocaleString('id-ID')}/bulan
                      </span>
                    </span>
                  </div>
                </div>

                {/* Benefits */}
                <div className="mb-5">
                  <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                    <Zap className="w-4 h-4 text-purple-600" />
                    Keuntungan Upgrade:
                  </h4>
                  <div className="space-y-2">
                    {pkg.benefits.map((benefit, index) => (
                      <div key={index} className="flex items-start gap-2 text-sm">
                        <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-3 h-3 text-green-600" />
                        </div>
                        <span className="text-gray-700">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Features */}
                <div className="mb-5 pb-5 border-b">
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">Fitur Lengkap:</h4>
                  <div className="grid grid-cols-1 gap-2">
                    {pkg.features.map((feature, index) => (
                      <div key={index} className="flex items-start gap-2 text-sm text-gray-700">
                        <Check className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA Button */}
                <Button
                  onClick={() => handleUpgrade(pkg.id)}
                  className={`w-full h-12 text-base font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all ${
                    pkg.popular
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700'
                      : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
                  }`}
                >
                  Upgrade Sekarang
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Card>
            ))}
          </div>
        </div>

        {/* FAQ / Info */}
        <Card className="p-5 bg-blue-50 border-blue-200">
          <h3 className="text-base font-semibold text-gray-800 mb-3">💡 Informasi Penting</h3>
          <div className="space-y-2 text-sm text-gray-700">
            <div className="flex items-start gap-2">
              <Check className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
              <p><strong>Aktivasi Instant:</strong> Paket upgrade akan aktif dalam 5-10 menit tanpa kunjungan teknisi</p>
            </div>
            <div className="flex items-start gap-2">
              <Check className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
              <p><strong>Tanpa Biaya Instalasi:</strong> Upgrade dilakukan remote, tidak ada biaya tambahan</p>
            </div>
            <div className="flex items-start gap-2">
              <Check className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
              <p><strong>Downgrade:</strong> Anda dapat downgrade kapan saja mulai periode billing berikutnya</p>
            </div>
            <div className="flex items-start gap-2">
              <Check className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
              <p><strong>Pembayaran:</strong> Selisih harga akan ditagihkan di periode billing berikutnya</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Confirmation Dialog */}
      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent className="max-w-md mx-auto p-0 gap-0 overflow-hidden">
          {selectedPackage && upgradePackages.find(p => p.id === selectedPackage) && (
            <>
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-6 text-white">
                <div className="text-center">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-3">
                    <ArrowUp className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-1">Konfirmasi Upgrade</h3>
                  <p className="text-blue-100 text-sm">Pastikan data Anda sudah benar</p>
                </div>
              </div>

              <div className="p-6 space-y-5">
                {/* Package Comparison */}
                <div className="space-y-3">
                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-xs text-gray-600 mb-2">Paket Saat Ini</p>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-gray-800">{currentPackage.name}</p>
                        <p className="text-sm text-gray-600">{currentPackage.speed}</p>
                      </div>
                      <p className="text-lg font-bold text-gray-800">
                        Rp {currentPackage.price.toLocaleString('id-ID')}
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-center">
                    <ArrowRight className="w-6 h-6 text-purple-600" />
                  </div>

                  {upgradePackages
                    .filter(p => p.id === selectedPackage)
                    .map(pkg => (
                      <div key={pkg.id} className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-4 border-2 border-purple-200">
                        <p className="text-xs text-purple-600 mb-2 font-semibold">Paket Baru</p>
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <p className="font-semibold text-gray-800 text-lg">{pkg.name}</p>
                            <p className="text-sm text-gray-600">{pkg.speed}</p>
                          </div>
                          <p className="text-xl font-bold text-gray-800">
                            Rp {pkg.price.toLocaleString('id-ID')}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 text-sm bg-orange-100 text-orange-700 px-3 py-2 rounded-lg">
                          <ArrowUp className="w-4 h-4" />
                          <span>Tambahan: <strong>Rp {pkg.difference.toLocaleString('id-ID')}/bulan</strong></span>
                        </div>
                      </div>
                    ))
                  }
                </div>

                {/* Important Notes */}
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                  <p className="text-sm text-blue-800 mb-2">
                    <strong>Yang akan terjadi:</strong>
                  </p>
                  <ul className="text-sm text-blue-700 space-y-1 ml-4 list-disc">
                    <li>Paket upgrade akan aktif dalam 5-10 menit</li>
                    <li>Tidak perlu kunjungan teknisi</li>
                    <li>Tagihan baru berlaku di periode berikutnya</li>
                  </ul>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <Button
                    onClick={() => setShowConfirmation(false)}
                    variant="outline"
                    className="flex-1"
                  >
                    Batal
                  </Button>
                  <Button
                    onClick={confirmUpgrade}
                    className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                  >
                    Konfirmasi Upgrade
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
