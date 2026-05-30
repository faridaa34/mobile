import { ChevronLeft, CheckCircle2, Circle, Clock, MapPin, Phone, User, Calendar, Wrench, Wifi, AlertCircle } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { BottomNavigation } from "../components/BottomNavigation";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { Progress } from "../components/ui/progress";

interface InstallationStep {
  id: string;
  title: string;
  description: string;
  status: "completed" | "current" | "pending";
  timestamp?: string;
}

export function InstallationTracking() {
  const navigate = useNavigate();
  const [installation, setInstallation] = useState<any>(null);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const steps: InstallationStep[] = [
    {
      id: "order-received",
      title: "Pesanan Diterima",
      description: "Pesanan Anda telah diterima oleh sistem kami",
      status: currentStepIndex >= 0 ? "completed" : "pending",
      timestamp: installation?.createdAt,
    },
    {
      id: "survey-scheduled",
      title: "Survey Lokasi Dijadwalkan",
      description: "Tim survey akan mengunjungi lokasi Anda",
      status: currentStepIndex >= 1 ? (currentStepIndex === 1 ? "current" : "completed") : "pending",
      timestamp: currentStepIndex >= 1 ? new Date(Date.now() + 86400000).toISOString() : undefined,
    },
    {
      id: "survey-completed",
      title: "Survey Selesai",
      description: "Lokasi telah disurvey dan disetujui untuk instalasi",
      status: currentStepIndex >= 2 ? (currentStepIndex === 2 ? "current" : "completed") : "pending",
      timestamp: currentStepIndex >= 2 ? new Date(Date.now() + 172800000).toISOString() : undefined,
    },
    {
      id: "installation-scheduled",
      title: "Instalasi Dijadwalkan",
      description: "Teknisi akan datang untuk instalasi",
      status: currentStepIndex >= 3 ? (currentStepIndex === 3 ? "current" : "completed") : "pending",
      timestamp: currentStepIndex >= 3 ? installation?.customerData?.installDate : undefined,
    },
    {
      id: "installation-progress",
      title: "Instalasi Sedang Berlangsung",
      description: "Teknisi sedang melakukan instalasi perangkat",
      status: currentStepIndex >= 4 ? (currentStepIndex === 4 ? "current" : "completed") : "pending",
    },
    {
      id: "installation-completed",
      title: "Instalasi Selesai & Aktivasi",
      description: "Internet Anda sudah aktif dan siap digunakan",
      status: currentStepIndex >= 5 ? "completed" : "pending",
    },
  ];

  useEffect(() => {
    // Load installation data dari localStorage
    const installationData = localStorage.getItem("currentInstallation");
    if (installationData) {
      setInstallation(JSON.parse(installationData));
      // Simulasi progress (dalam real app, ini akan dari backend)
      setCurrentStepIndex(1); // Default ke step 2 (survey scheduled)
    }
  }, []);

  // Simulasi update otomatis status (dalam real app menggunakan websocket/polling)
  useEffect(() => {
    if (currentStepIndex < 5) {
      const interval = setInterval(() => {
        setCurrentStepIndex((prev) => Math.min(prev + 1, 5));
      }, 10000); // Update setiap 10 detik untuk demo
      
      return () => clearInterval(interval);
    }
  }, [currentStepIndex]);

  const progress = ((currentStepIndex + 1) / steps.length) * 100;

  const technician = {
    name: "Ahmad Fauzi",
    phone: "08123456789",
    photo: "https://i.pravatar.cc/150?img=12",
    vehicleNumber: "B 1234 XYZ",
  };

  if (!installation) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center">
        <Card className="p-8 text-center">
          <AlertCircle className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">Tidak ada instalasi aktif</h2>
          <p className="text-gray-600 mb-4">Silakan pesan paket terlebih dahulu</p>
          <Button onClick={() => navigate("/packages")} className="bg-gradient-to-r from-blue-600 to-purple-600">
            Pilih Paket
          </Button>
        </Card>
      </div>
    );
  }

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
            <h1 className="text-lg font-semibold text-gray-800">Status Pemasangan</h1>
            <p className="text-xs text-gray-500">Track instalasi internet Anda</p>
          </div>
        </div>
      </header>

      <div className="px-4 py-4 max-w-lg mx-auto space-y-4">
        {/* Progress Overview */}
        <Card className="p-5 bg-gradient-to-r from-blue-600 to-purple-600 border-0 shadow-lg text-white">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="font-semibold text-sm mb-1">Paket {installation.package?.name}</h3>
              <p className="text-blue-100 text-xs">{installation.package?.speed} Mbps</p>
            </div>
            <Badge className="bg-white/30 backdrop-blur-sm text-white border-none">
              {Math.round(progress)}%
            </Badge>
          </div>
          <Progress value={progress} className="h-2 bg-white/20" />
          <p className="text-xs text-blue-100 mt-2">
            {steps[currentStepIndex]?.title}
          </p>
        </Card>

        {/* Customer Info */}
        <Card className="p-4 shadow-md">
          <h3 className="font-semibold text-gray-800 mb-3 text-sm">Informasi Pelanggan</h3>
          <div className="space-y-2 text-xs">
            <div className="flex items-center gap-2 text-gray-600">
              <User className="w-4 h-4" />
              <span>{installation.customerData?.name}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Phone className="w-4 h-4" />
              <span>{installation.customerData?.phone}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <MapPin className="w-4 h-4" />
              <span>{installation.customerData?.address}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Calendar className="w-4 h-4" />
              <span>Tanggal Instalasi: {new Date(installation.customerData?.installDate).toLocaleDateString('id-ID', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</span>
            </div>
          </div>
        </Card>

        {/* Technician Info - Show when installation is scheduled or in progress */}
        {currentStepIndex >= 3 && currentStepIndex <= 4 && (
          <Card className="p-4 shadow-md border-2 border-purple-200 bg-gradient-to-r from-purple-50 to-blue-50">
            <h3 className="font-semibold text-gray-800 mb-3 text-sm flex items-center gap-2">
              <Wrench className="w-4 h-4 text-purple-600" />
              Teknisi Anda
            </h3>
            <div className="flex items-center gap-3">
              <img 
                src={technician.photo} 
                alt={technician.name}
                className="w-12 h-12 rounded-full border-2 border-purple-300"
              />
              <div className="flex-1">
                <p className="font-semibold text-sm">{technician.name}</p>
                <p className="text-xs text-gray-600">{technician.phone}</p>
                <p className="text-xs text-gray-500">Kendaraan: {technician.vehicleNumber}</p>
              </div>
              <Button 
                size="sm" 
                className="bg-gradient-to-r from-green-600 to-green-700 hover:opacity-90"
                onClick={() => window.open(`tel:${technician.phone}`)}
              >
                <Phone className="w-4 h-4 mr-1" />
                Hubungi
              </Button>
            </div>
          </Card>
        )}

        {/* Installation Steps */}
        <Card className="p-5 shadow-md">
          <h3 className="font-semibold text-gray-800 mb-4 text-sm">Timeline Instalasi</h3>
          <div className="space-y-4">
            {steps.map((step, index) => {
              const isCompleted = step.status === "completed";
              const isCurrent = step.status === "current";
              const isPending = step.status === "pending";

              return (
                <div key={step.id} className="flex gap-3">
                  {/* Icon */}
                  <div className="flex flex-col items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      isCompleted 
                        ? "bg-green-100" 
                        : isCurrent 
                          ? "bg-blue-100 animate-pulse" 
                          : "bg-gray-100"
                    }`}>
                      {isCompleted ? (
                        <CheckCircle2 className="w-5 h-5 text-green-600" />
                      ) : isCurrent ? (
                        <Clock className="w-5 h-5 text-blue-600" />
                      ) : (
                        <Circle className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                    {index < steps.length - 1 && (
                      <div className={`w-0.5 h-12 ${
                        isCompleted ? "bg-green-300" : "bg-gray-200"
                      }`} />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 pb-4">
                    <h4 className={`font-semibold text-sm mb-1 ${
                      isCurrent ? "text-blue-600" : isCompleted ? "text-gray-800" : "text-gray-400"
                    }`}>
                      {step.title}
                    </h4>
                    <p className={`text-xs ${
                      isCurrent ? "text-blue-600" : isCompleted ? "text-gray-600" : "text-gray-400"
                    }`}>
                      {step.description}
                    </p>
                    {step.timestamp && (
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(step.timestamp).toLocaleString('id-ID', {
                          dateStyle: 'medium',
                          timeStyle: 'short'
                        })}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Completion Card */}
        {currentStepIndex === 5 && (
          <Card className="p-5 shadow-md border-2 border-green-300 bg-gradient-to-r from-green-50 to-blue-50">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Wifi className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Instalasi Selesai!</h3>
              <p className="text-sm text-gray-600 mb-4">
                Selamat! Internet FiberByte Anda sudah aktif dan siap digunakan.
              </p>
              <Button 
                onClick={() => navigate("/dashboard")}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90"
              >
                Lihat Dashboard
              </Button>
            </div>
          </Card>
        )}

        {/* Help Section */}
        <Card className="p-4 shadow-md border-0 bg-gradient-to-r from-blue-50 to-purple-50">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white text-xl">💬</span>
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-gray-800 mb-0.5">Ada Pertanyaan?</h3>
              <p className="text-xs text-gray-600">Tim support kami siap membantu 24/7</p>
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
    </div>
  );
}
