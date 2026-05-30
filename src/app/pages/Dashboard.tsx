import { Download, Upload, Wifi, Activity, Calendar, CreditCard, Wrench, ArrowRight } from "lucide-react";
import { Card } from "../components/ui/card";
import { Progress } from "../components/ui/progress";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { SpeedTest } from "../components/SpeedTest";

export function Dashboard() {
  const navigate = useNavigate();
  const [hasActiveInstallation, setHasActiveInstallation] = useState(false);

  useEffect(() => {
    // Check jika ada instalasi aktif
    const installation = localStorage.getItem("currentInstallation");
    setHasActiveInstallation(!!installation);
  }, []);

  // Mock data
  const usageData = [
    { time: "00:00", download: 120, upload: 40 },
    { time: "04:00", download: 80, upload: 25 },
    { time: "08:00", download: 250, upload: 80 },
    { time: "12:00", download: 350, upload: 120 },
    { time: "16:00", download: 450, upload: 150 },
    { time: "20:00", download: 520, upload: 180 },
    { time: "23:00", download: 380, upload: 140 },
  ];

  const currentPlan = {
    name: "FiberByte Premium",
    speed: "500 Mbps",
    price: "Rp 450.000",
    status: "Aktif",
    nextBilling: "15 April 2026",
  };

  return (
    <div className="min-h-full bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl mb-2">Dashboard</h1>
          <p className="text-gray-600">Kelola dan monitor penggunaan internet Anda</p>
        </div>

        {/* Current Plan Card */}
        <Card className="p-6 mb-8 bg-gradient-to-br from-blue-600 to-purple-600 text-white">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <h2 className="text-2xl">{currentPlan.name}</h2>
                <Badge className="bg-green-500 text-white border-none">
                  {currentPlan.status}
                </Badge>
              </div>
              <div className="flex items-center gap-4 text-blue-100">
                <div className="flex items-center gap-1">
                  <Wifi className="w-4 h-4" />
                  <span>{currentPlan.speed}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>Tagihan berikutnya: {currentPlan.nextBilling}</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                variant="secondary"
                className="bg-white text-blue-600 hover:bg-gray-100"
                onClick={() => navigate("/payment")}
              >
                <CreditCard className="w-4 h-4 mr-2" />
                Bayar Tagihan
              </Button>
              <Button
                variant="outline"
                className="border-white text-white hover:bg-white/10"
                onClick={() => navigate("/upgrade-package")}
              >
                Upgrade Paket
              </Button>
            </div>
          </div>
        </Card>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Download className="w-6 h-6 text-blue-600" />
              </div>
              <Badge variant="outline" className="text-green-600 border-green-600">
                +12%
              </Badge>
            </div>
            <div className="text-2xl mb-1">520 Mbps</div>
            <div className="text-sm text-gray-600">Kecepatan Download</div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Upload className="w-6 h-6 text-purple-600" />
              </div>
              <Badge variant="outline" className="text-green-600 border-green-600">
                +8%
              </Badge>
            </div>
            <div className="text-2xl mb-1">180 Mbps</div>
            <div className="text-sm text-gray-600">Kecepatan Upload</div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Activity className="w-6 h-6 text-green-600" />
              </div>
              <Badge variant="outline" className="text-green-600 border-green-600">
                Bagus
              </Badge>
            </div>
            <div className="text-2xl mb-1">12ms</div>
            <div className="text-sm text-gray-600">Ping / Latency</div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Wifi className="w-6 h-6 text-orange-600" />
              </div>
              <Badge variant="outline" className="text-green-600 border-green-600">
                Online
              </Badge>
            </div>
            <div className="text-2xl mb-1">8 Perangkat</div>
            <div className="text-sm text-gray-600">Terhubung</div>
          </Card>
        </div>

        {/* Usage Chart */}
        <Card className="p-6 mb-8">
          <div className="mb-6">
            <h3 className="text-xl mb-1">Penggunaan Bandwidth 24 Jam</h3>
            <p className="text-sm text-gray-600">Monitor penggunaan internet Anda dalam 24 jam terakhir</p>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={usageData}>
                <defs>
                  <linearGradient id="colorDownload" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorUpload" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="time" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip />
                <Area 
                  type="monotone" 
                  dataKey="download" 
                  stroke="#3b82f6" 
                  fillOpacity={1} 
                  fill="url(#colorDownload)" 
                  name="Download (Mbps)"
                />
                <Area 
                  type="monotone" 
                  dataKey="upload" 
                  stroke="#a855f7" 
                  fillOpacity={1} 
                  fill="url(#colorUpload)"
                  name="Upload (Mbps)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Speed Test */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-1">
            <SpeedTest />
          </div>
          <Card className="lg:col-span-2 p-6">
            <h3 className="text-xl mb-4">Tentang Speed Test</h3>
            <div className="space-y-3 text-sm text-gray-600">
              <div className="flex gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Download className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <div className="font-medium text-gray-800 mb-1">Download Speed</div>
                  <p>Mengukur seberapa cepat data dapat diunduh dari internet ke perangkat Anda. Penting untuk streaming, download file, dan browsing.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Upload className="w-4 h-4 text-purple-600" />
                </div>
                <div>
                  <div className="font-medium text-gray-800 mb-1">Upload Speed</div>
                  <p>Mengukur seberapa cepat data dapat dikirim dari perangkat Anda ke internet. Penting untuk video call, upload file, dan live streaming.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Activity className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <div className="font-medium text-gray-800 mb-1">Ping / Latency</div>
                  <p>Mengukur waktu respons koneksi internet Anda. Semakin rendah semakin bagus, terutama untuk gaming online dan video conference.</p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Data Usage */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="p-6">
            <h3 className="text-xl mb-4">Penggunaan Data Bulan Ini</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-600">Download</span>
                  <span className="text-sm">850 GB</span>
                </div>
                <Progress value={65} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-600">Upload</span>
                  <span className="text-sm">280 GB</span>
                </div>
                <Progress value={40} className="h-2" />
              </div>
              <div className="pt-4 border-t">
                <div className="flex justify-between">
                  <span>Total Penggunaan</span>
                  <span className="text-xl">1.13 TB</span>
                </div>
                <p className="text-sm text-gray-600 mt-1">Unlimited - Tidak ada batasan</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-xl mb-4">Perangkat Terhubung</h3>
            <div className="space-y-3">
              {[
                { name: "iPhone 15 Pro", type: "Smartphone", status: "Online" },
                { name: "MacBook Pro", type: "Laptop", status: "Online" },
                { name: "Smart TV Samsung", type: "TV", status: "Online" },
                { name: "iPad Air", type: "Tablet", status: "Offline" },
                { name: "PlayStation 5", type: "Gaming", status: "Online" },
              ].map((device, index) => (
                <div key={index} className="flex items-center justify-between py-2 border-b last:border-b-0">
                  <div>
                    <div className="text-sm">{device.name}</div>
                    <div className="text-xs text-gray-600">{device.type}</div>
                  </div>
                  <Badge 
                    variant={device.status === "Online" ? "default" : "outline"}
                    className={device.status === "Online" ? "bg-green-500" : ""}
                  >
                    {device.status}
                  </Badge>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Active Installation Notification */}
        {hasActiveInstallation && (
          <Card className="p-6 mt-8 bg-gradient-to-r from-purple-50 to-blue-50 border-2 border-purple-200">
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                <Wrench className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-800 mb-1">Instalasi Sedang Berlangsung</h3>
                <p className="text-sm text-gray-600">Lihat status dan timeline pemasangan internet Anda</p>
              </div>
              <Button
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90"
                onClick={() => navigate("/installation-tracking")}
              >
                Lihat Detail <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}