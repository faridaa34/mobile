import { CreditCard, Smartphone, Building2, Wallet, ArrowRight, Clock, CheckCircle2, AlertCircle, ChevronLeft, QrCode, Copy, X } from "lucide-react";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { BottomNavigation } from "../components/BottomNavigation";
import { Link, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Dialog, DialogContent } from "../components/ui/dialog";
import { toast } from "sonner";

export function Payment() {
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [showQRIS, setShowQRIS] = useState(false);
  const [showBankTransfer, setShowBankTransfer] = useState(false);
  const [showVA, setShowVA] = useState(false);
  const [showEwallet, setShowEwallet] = useState(false);
  const [showCreditCard, setShowCreditCard] = useState(false);
  const [selectedBank, setSelectedBank] = useState("");
  const [selectedEwallet, setSelectedEwallet] = useState("");
  const [selectedVABank, setSelectedVABank] = useState("");
  const [timeLeft, setTimeLeft] = useState(900); // 15 minutes in seconds
  const [qrValue, setQrValue] = useState("");
  const [vaNumber, setVaNumber] = useState("");
  const [ewalletQR, setEwalletQR] = useState("");
  const [ewalletStep, setEwalletStep] = useState<"select" | "qr" | "processing" | "success">("select");
  const [ewalletTimer, setEwalletTimer] = useState(300); // 5 minutes

  const billingInfo = {
    amount: "200.000",
    dueDate: "01 Mei 2025",
    isPaid: false,
    packageName: "FiberByte Pro",
    period: "Februari 2025",
  };

  const bankList = [
    { id: "bca", name: "BCA", account: "7890123456", holder: "PT FiberByte Indonesia", color: "from-blue-600 to-blue-700" },
    { id: "mandiri", name: "Mandiri", account: "1234567890", holder: "PT FiberByte Indonesia", color: "from-yellow-500 to-orange-600" },
    { id: "bni", name: "BNI", account: "0987654321", holder: "PT FiberByte Indonesia", color: "from-orange-500 to-orange-600" },
    { id: "bri", name: "BRI", account: "5678901234", holder: "PT FiberByte Indonesia", color: "from-blue-500 to-blue-600" },
  ];

  const ewalletList = [
    { id: "gopay", name: "GoPay", color: "from-green-500 to-green-600", logo: "🏍️" },
    { id: "ovo", name: "OVO", color: "from-purple-500 to-purple-600", logo: "💜" },
    { id: "dana", name: "DANA", color: "from-blue-500 to-blue-600", logo: "💰" },
    { id: "linkaja", name: "LinkAja", color: "from-red-500 to-red-600", logo: "🔗" },
    { id: "shopeepay", name: "ShopeePay", color: "from-orange-500 to-orange-600", logo: "🛍️" },
  ];

  const vaList = [
    { id: "bca", name: "BCA Virtual Account", code: "70012" },
    { id: "mandiri", name: "Mandiri Virtual Account", code: "88808" },
    { id: "bni", name: "BNI Virtual Account", code: "88809" },
    { id: "bri", name: "BRI Virtual Account", code: "26215" },
    { id: "permata", name: "Permata Virtual Account", code: "85000" },
  ];

  const paymentMethods = [
    {
      id: "qris",
      icon: QrCode,
      title: "QRIS",
      description: "Scan & bayar dengan QRIS",
      color: "from-indigo-500 to-purple-600",
      fee: "Gratis",
      badge: "Instan",
    },
    {
      id: "credit",
      icon: CreditCard,
      title: "Kartu Kredit/Debit",
      description: "Visa, Mastercard, JCB",
      color: "from-blue-500 to-blue-600",
      fee: "Gratis",
    },
    {
      id: "bank",
      icon: Building2,
      title: "Transfer Bank",
      description: "BCA, Mandiri, BNI, BRI",
      color: "from-green-500 to-green-600",
      fee: "Gratis",
    },
    {
      id: "ewallet",
      icon: Wallet,
      title: "E-Wallet",
      description: "GoPay, OVO, DANA, LinkAja",
      color: "from-purple-500 to-purple-600",
      fee: "Gratis",
    },
    {
      id: "va",
      icon: Smartphone,
      title: "Virtual Account",
      description: "Semua bank",
      color: "from-orange-500 to-orange-600",
      fee: "Gratis",
    },
  ];

  const transactionHistory = [
    { 
      id: 1,
      date: "1 Desember 2025", 
      amount: "200.000", 
      status: "success", 
      method: "Transfer Bank BCA",
      time: "14:30"
    },
    { 
      id: 2,
      date: "1 November 2025", 
      amount: "200.000", 
      status: "success", 
      method: "GoPay",
      time: "09:15"
    },
    { 
      id: 3,
      date: "1 Oktober 2025", 
      amount: "200.000", 
      status: "success", 
      method: "Transfer Bank Mandiri",
      time: "16:45"
    },
  ];

  // Timer untuk QRIS
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (showQRIS && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [showQRIS, timeLeft]);

  // Generate QR value saat modal dibuka
  useEffect(() => {
    if (showQRIS) {
      // Generate mock QRIS string (dalam produksi, ini dari backend)
      const qrisString = `00020101021126660016ID.CO.FIBERBYTE.WWW01189360050300000898740214${Date.now()}0303UMI51440014ID.CO.QRIS.WWW0215ID10000000000050303UMI5204481253033605802ID5913FIBERBYTE PRO6007JAKARTA61051234062070703A016304${Math.random().toString(36).substring(7).toUpperCase()}`;
      setQrValue(qrisString);
      setTimeLeft(900); // Reset timer
    }
  }, [showQRIS]);

  // Timer untuk E-Wallet
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (showEwallet && ewalletStep === "qr" && ewalletTimer > 0) {
      interval = setInterval(() => {
        setEwalletTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [showEwallet, ewalletStep, ewalletTimer]);

  // Reset e-wallet state saat modal ditutup
  useEffect(() => {
    if (!showEwallet) {
      setEwalletStep("select");
      setSelectedEwallet("");
      setEwalletQR("");
      setEwalletTimer(300);
    }
  }, [showEwallet]);

  const handlePayment = () => {
    if (selectedMethod) {
      switch(selectedMethod) {
        case "qris":
          setShowQRIS(true);
          break;
        case "bank":
          setShowBankTransfer(true);
          break;
        case "va":
          setShowVA(true);
          break;
        case "ewallet":
          setShowEwallet(true);
          break;
        case "credit":
          setShowCreditCard(true);
          break;
        default:
          alert(`Memproses pembayaran via ${paymentMethods.find(m => m.id === selectedMethod)?.title}`);
      }
    }
  };

  const generateVANumber = (bankCode: string) => {
    // Generate VA number: bank code + customer ID (mock)
    const customerId = "8974012345";
    return bankCode + customerId;
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} berhasil disalin!`);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleEwalletSelection = (ewalletId: string) => {
    setSelectedEwallet(ewalletId);
    // Generate QR code for e-wallet
    const qrString = `EWALLET:${ewalletId.toUpperCase()}:AMOUNT:${billingInfo.amount}:MERCHANT:FIBERBYTE:TXN:${Date.now()}`;
    setEwalletQR(qrString);
    setEwalletStep("qr");
    setEwalletTimer(300); // Reset timer
  };

  const simulatePayment = () => {
    setEwalletStep("processing");
    toast.loading("Memproses pembayaran...");
    // Simulate payment processing
    setTimeout(() => {
      toast.dismiss();
      setEwalletStep("success");
      toast.success("Pembayaran berhasil!");
      setTimeout(() => {
        setShowEwallet(false);
        // In real app, this would trigger a success notification and update payment status
      }, 2500);
    }, 2000);
  };

  const openEwalletApp = () => {
    // In production, this would open the actual e-wallet app via deep link
    const ewalletName = ewalletList.find(e => e.id === selectedEwallet)?.name;

    toast.info(`Membuka aplikasi ${ewalletName}...`, {
      description: `Deep link: ${selectedEwallet}://pay?amount=${billingInfo.amount}`,
      duration: 3000,
    });

    // Simulate user completing payment in the app
    setTimeout(() => {
      const userConfirmed = confirm(`Simulasi: Apakah Anda ingin menyelesaikan pembayaran di ${ewalletName}?\n\nIni adalah demo - klik OK untuk melanjutkan pembayaran.`);
      if (userConfirmed) {
        simulatePayment();
      }
    }, 1500);
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
            <h1 className="text-lg font-semibold text-gray-800">Pembayaran</h1>
            <p className="text-xs text-gray-500">Bayar tagihan Anda dengan mudah</p>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="px-4 py-5 space-y-5 max-w-lg mx-auto">
        {/* Billing Card */}
        {!billingInfo.isPaid && (
          <Card className="p-0 shadow-lg border-0 overflow-hidden bg-gradient-to-br from-red-500 via-red-600 to-orange-600">
            <div className="p-5 relative">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-40 h-40 bg-white rounded-full -mr-20 -mt-20"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-white rounded-full -ml-16 -mb-16"></div>
              </div>
              
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <Badge className="bg-white/20 backdrop-blur-sm text-white border-none mb-3 px-3 py-1">
                      <AlertCircle className="w-3 h-3 mr-1" />
                      Belum Dibayar
                    </Badge>
                    <p className="text-red-100 text-xs mb-1">Tagihan Bulan</p>
                    <h3 className="text-white text-lg font-semibold mb-2">{billingInfo.period}</h3>
                    <p className="text-red-100 text-xs">{billingInfo.packageName}</p>
                  </div>
                </div>

                {/* Amount */}
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 mb-3">
                  <p className="text-red-100 text-xs mb-2">Total Tagihan</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-white text-sm">Rp</span>
                    <span className="text-white text-4xl font-bold">{billingInfo.amount}</span>
                  </div>
                </div>

                {/* Due Date */}
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="w-4 h-4 text-red-200" />
                  <span className="text-red-100">Jatuh tempo: </span>
                  <span className="text-white font-semibold">{billingInfo.dueDate}</span>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Paid Status */}
        {billingInfo.isPaid && (
          <Card className="p-5 shadow-lg border-0 bg-gradient-to-br from-green-500 to-emerald-600 text-white">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Tagihan Lunas</h3>
                <p className="text-green-100 text-sm">{billingInfo.period}</p>
              </div>
            </div>
            <div className="text-center py-4">
              <p className="text-green-100 text-sm mb-1">Total yang dibayar</p>
              <p className="text-3xl font-bold">Rp {billingInfo.amount}</p>
            </div>
          </Card>
        )}

        {/* Payment Methods */}
        {!billingInfo.isPaid && (
          <div>
            <div className="mb-4">
              <h2 className="text-base font-semibold text-gray-800 mb-1">Pilih Metode Pembayaran</h2>
              <p className="text-sm text-gray-500">Pilih cara pembayaran yang paling nyaman</p>
            </div>
            <div className="space-y-3">
              {paymentMethods.map((method) => {
                const Icon = method.icon;
                const isSelected = selectedMethod === method.id;
                return (
                  <Card 
                    key={method.id} 
                    onClick={() => setSelectedMethod(method.id)}
                    className={`p-4 cursor-pointer border-2 transition-all ${
                      isSelected 
                        ? 'border-blue-500 shadow-lg scale-[1.02] bg-blue-50' 
                        : 'border-transparent shadow-md hover:shadow-lg hover:border-gray-200'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 bg-gradient-to-br ${method.color} rounded-xl flex items-center justify-center flex-shrink-0 shadow-md`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-gray-800 mb-0.5">{method.title}</h3>
                          {method.id === "qris" && (
                            <Badge className="text-xs bg-gradient-to-r from-indigo-500 to-purple-500 text-white border-0">
                              ⚡ Instan
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">{method.description}</p>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <Badge variant="outline" className="text-xs border-green-200 text-green-700 bg-green-50">
                          {method.fee}
                        </Badge>
                        {isSelected && (
                          <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                            <CheckCircle2 className="w-4 h-4 text-white" />
                          </div>
                        )}
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>

            {/* Pay Button */}
            <Button 
              onClick={handlePayment}
              disabled={!selectedMethod}
              className={`w-full h-14 mt-5 text-base font-semibold rounded-xl shadow-lg transition-all ${
                selectedMethod 
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700' 
                  : 'bg-gray-300 cursor-not-allowed'
              }`}
            >
              {selectedMethod ? (
                <>
                  <span>Bayar Sekarang</span>
                  <ArrowRight className="w-5 h-5 ml-2" />
                </>
              ) : (
                <span>Pilih Metode Pembayaran</span>
              )}
            </Button>
          </div>
        )}

        {/* Transaction History */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-semibold text-gray-800">Riwayat Pembayaran</h2>
              <p className="text-sm text-gray-500">3 transaksi terakhir</p>
            </div>
          </div>
          <div className="space-y-3">
            {transactionHistory.map((transaction) => (
              <Card key={transaction.id} className="p-4 shadow-md border-0 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                        <CheckCircle2 className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800">Rp {transaction.amount}</h3>
                        <p className="text-xs text-gray-500">{transaction.method}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-gray-600 ml-12">
                      <span>{transaction.date}</span>
                      <span>•</span>
                      <span>{transaction.time}</span>
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-700 border-0">
                    Berhasil
                  </Badge>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Help Card */}
        <Card className="p-4 shadow-md border-0 bg-gradient-to-r from-blue-50 to-purple-50">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white text-xl">💳</span>
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-gray-800 mb-0.5">Kendala Pembayaran?</h3>
              <p className="text-xs text-gray-600">Hubungi customer service kami</p>
            </div>
            <Link to="/support">
              <Button size="sm" variant="outline" className="border-blue-300 text-blue-700 hover:bg-blue-50">
                Bantuan
              </Button>
            </Link>
          </div>
        </Card>
      </div>

      <BottomNavigation />

      {/* Transfer Bank Modal */}
      <Dialog open={showBankTransfer} onOpenChange={setShowBankTransfer}>
        <DialogContent className="max-w-md mx-auto p-0 gap-0 overflow-hidden max-h-[90vh] overflow-y-auto">
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-5 text-white relative overflow-hidden sticky top-0 z-10">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -mr-16 -mt-16"></div>
            </div>
            <button
              onClick={() => setShowBankTransfer(false)}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center hover:bg-white/20 rounded-full transition-colors z-10"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="relative z-10 text-center">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-3">
                <Building2 className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-1">Transfer Bank</h3>
              <p className="text-green-100 text-sm">Pilih bank untuk transfer</p>
            </div>
          </div>

          <div className="p-6 space-y-5">
            {/* Amount */}
            <div className="text-center py-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl">
              <p className="text-sm text-gray-600 mb-1">Total Pembayaran</p>
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-lg text-gray-700">Rp</span>
                <span className="text-3xl font-bold text-gray-800">{billingInfo.amount}</span>
              </div>
            </div>

            {/* Bank Selection */}
            {!selectedBank ? (
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-gray-800">Pilih Bank Tujuan:</h4>
                {bankList.map((bank) => (
                  <Card
                    key={bank.id}
                    onClick={() => setSelectedBank(bank.id)}
                    className="p-4 cursor-pointer border-2 border-transparent hover:border-green-500 hover:shadow-lg transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 bg-gradient-to-br ${bank.color} rounded-xl flex items-center justify-center text-white font-bold text-lg`}>
                        {bank.name.substring(0, 2)}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800">{bank.name}</h3>
                        <p className="text-sm text-gray-600">Transfer ke rekening {bank.name}</p>
                      </div>
                      <ArrowRight className="w-5 h-5 text-gray-400" />
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                <Button
                  onClick={() => setSelectedBank("")}
                  variant="outline"
                  className="w-full"
                >
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Pilih Bank Lain
                </Button>

                {/* Bank Details */}
                {bankList.filter(b => b.id === selectedBank).map((bank) => (
                  <div key={bank.id} className="space-y-4">
                    <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-5 space-y-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-14 h-14 bg-gradient-to-br ${bank.color} rounded-xl flex items-center justify-center text-white font-bold text-xl`}>
                          {bank.name.substring(0, 2)}
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-800 text-lg">{bank.name}</h3>
                          <p className="text-sm text-gray-600">Transfer Bank</p>
                        </div>
                      </div>

                      <div className="bg-white rounded-xl p-4 space-y-3">
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Nomor Rekening</p>
                          <div className="flex items-center justify-between">
                            <p className="text-xl font-bold text-gray-800">{bank.account}</p>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => copyToClipboard(bank.account, "Nomor rekening")}
                            >
                              <Copy className="w-4 h-4 mr-1" />
                              Salin
                            </Button>
                          </div>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Atas Nama</p>
                          <p className="font-semibold text-gray-800">{bank.holder}</p>
                        </div>
                      </div>
                    </div>

                    {/* Instructions */}
                    <div className="space-y-3">
                      <h4 className="text-sm font-semibold text-gray-800">Cara Transfer:</h4>
                      <div className="space-y-2 text-sm text-gray-600">
                        <div className="flex items-start gap-3">
                          <div className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-semibold">1</div>
                          <p>Login ke aplikasi mobile banking atau internet banking {bank.name}</p>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-semibold">2</div>
                          <p>Pilih menu Transfer ke Rekening {bank.name}</p>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-semibold">3</div>
                          <p>Masukkan nomor rekening: <strong>{bank.account}</strong></p>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-semibold">4</div>
                          <p>Masukkan jumlah: <strong>Rp {billingInfo.amount}</strong></p>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-semibold">5</div>
                          <p>Verifikasi dan konfirmasi transfer</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                      <p className="text-sm text-blue-800">
                        <strong>Catatan:</strong> Pembayaran akan dikonfirmasi otomatis dalam 1x24 jam setelah transfer berhasil. Simpan bukti transfer Anda.
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* QRIS Modal */}
      <Dialog open={showQRIS} onOpenChange={setShowQRIS}>
        <DialogContent className="max-w-md mx-auto p-0 gap-0 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-5 text-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -mr-16 -mt-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full -ml-12 -mb-12"></div>
            </div>
            <button
              onClick={() => setShowQRIS(false)}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center hover:bg-white/20 rounded-full transition-colors z-10"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="relative z-10 text-center">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-3">
                <QrCode className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-1">Scan QRIS</h3>
              <p className="text-indigo-100 text-sm">Bayar dengan aplikasi pembayaran favorit Anda</p>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-5">
            {/* Amount */}
            <div className="text-center py-3 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl">
              <p className="text-sm text-gray-600 mb-1">Total Pembayaran</p>
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-lg text-gray-700">Rp</span>
                <span className="text-3xl font-bold text-gray-800">{billingInfo.amount}</span>
              </div>
            </div>

            {/* Timer */}
            <div className="flex items-center justify-center gap-2 py-2">
              <Clock className={`w-5 h-5 ${timeLeft < 60 ? 'text-red-500' : 'text-indigo-500'}`} />
              <span className={`text-sm font-semibold ${timeLeft < 60 ? 'text-red-600' : 'text-gray-700'}`}>
                Berlaku hingga {formatTime(timeLeft)}
              </span>
            </div>

            {/* QR Code */}
            <div className="bg-white p-6 rounded-2xl shadow-lg border-2 border-gray-100">
              <div className="bg-white p-4 rounded-xl flex items-center justify-center">
                {qrValue && (
                  <QRCodeSVG
                    value={qrValue}
                    size={220}
                    level="H"
                    includeMargin={false}
                  />
                )}
              </div>
            </div>

            {/* Instructions */}
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-gray-800">Cara Pembayaran:</h4>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-semibold">
                    1
                  </div>
                  <p>Buka aplikasi pembayaran (GoPay, OVO, DANA, LinkAja, atau bank digital)</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-semibold">
                    2
                  </div>
                  <p>Pilih menu Scan QR atau QRIS</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-semibold">
                    3
                  </div>
                  <p>Scan kode QR di atas</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-semibold">
                    4
                  </div>
                  <p>Konfirmasi pembayaran di aplikasi Anda</p>
                </div>
              </div>
            </div>

            {/* Supported Apps */}
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-xs text-gray-600 mb-2 text-center font-medium">Didukung oleh:</p>
              <div className="flex flex-wrap items-center justify-center gap-2 text-xs">
                <Badge variant="outline" className="bg-white">GoPay</Badge>
                <Badge variant="outline" className="bg-white">OVO</Badge>
                <Badge variant="outline" className="bg-white">DANA</Badge>
                <Badge variant="outline" className="bg-white">LinkAja</Badge>
                <Badge variant="outline" className="bg-white">ShopeePay</Badge>
                <Badge variant="outline" className="bg-white">Bank Digital</Badge>
              </div>
            </div>

            {/* Help */}
            <div className="text-center">
              <p className="text-xs text-gray-500">
                Pembayaran akan dikonfirmasi otomatis setelah berhasil
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Virtual Account Modal */}
      <Dialog open={showVA} onOpenChange={setShowVA}>
        <DialogContent className="max-w-md mx-auto p-0 gap-0 overflow-hidden max-h-[90vh] overflow-y-auto">
          <div className="bg-gradient-to-r from-orange-600 to-red-600 p-5 text-white relative overflow-hidden sticky top-0 z-10">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -mr-16 -mt-16"></div>
            </div>
            <button
              onClick={() => setShowVA(false)}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center hover:bg-white/20 rounded-full transition-colors z-10"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="relative z-10 text-center">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-3">
                <Smartphone className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-1">Virtual Account</h3>
              <p className="text-orange-100 text-sm">Pilih bank untuk Virtual Account</p>
            </div>
          </div>

          <div className="p-6 space-y-5">
            {/* Amount */}
            <div className="text-center py-3 bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl">
              <p className="text-sm text-gray-600 mb-1">Total Pembayaran</p>
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-lg text-gray-700">Rp</span>
                <span className="text-3xl font-bold text-gray-800">{billingInfo.amount}</span>
              </div>
            </div>

            {/* VA Bank Selection */}
            {!selectedVABank ? (
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-gray-800">Pilih Virtual Account:</h4>
                {vaList.map((va) => (
                  <Card
                    key={va.id}
                    onClick={() => {
                      setSelectedVABank(va.id);
                      setVaNumber(generateVANumber(va.code));
                    }}
                    className="p-4 cursor-pointer border-2 border-transparent hover:border-orange-500 hover:shadow-lg transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center text-white font-bold">
                        VA
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800">{va.name}</h3>
                        <p className="text-sm text-gray-600">Bayar melalui ATM, m-banking, i-banking</p>
                      </div>
                      <ArrowRight className="w-5 h-5 text-gray-400" />
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                <Button
                  onClick={() => {
                    setSelectedVABank("");
                    setVaNumber("");
                  }}
                  variant="outline"
                  className="w-full"
                >
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Pilih Bank Lain
                </Button>

                {/* VA Details */}
                {vaList.filter(v => v.id === selectedVABank).map((va) => (
                  <div key={va.id} className="space-y-4">
                    <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-5 space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center text-white font-bold text-lg">
                          VA
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-800 text-lg">{va.name}</h3>
                          <p className="text-sm text-gray-600">Virtual Account</p>
                        </div>
                      </div>

                      <div className="bg-white rounded-xl p-4 space-y-3">
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Nomor Virtual Account</p>
                          <div className="flex items-center justify-between">
                            <p className="text-xl font-bold text-gray-800">{vaNumber}</p>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => copyToClipboard(vaNumber, "Nomor VA")}
                            >
                              <Copy className="w-4 h-4 mr-1" />
                              Salin
                            </Button>
                          </div>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Jumlah Transfer</p>
                          <p className="font-semibold text-gray-800">Rp {billingInfo.amount}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-orange-800 bg-orange-100 rounded-lg p-3">
                        <Clock className="w-4 h-4" />
                        <span>Berlaku hingga {billingInfo.dueDate}</span>
                      </div>
                    </div>

                    {/* Instructions */}
                    <div className="space-y-3">
                      <h4 className="text-sm font-semibold text-gray-800">Cara Pembayaran:</h4>

                      {/* ATM */}
                      <div className="bg-gray-50 rounded-xl p-4">
                        <h5 className="font-semibold text-gray-800 mb-2 text-sm">Via ATM:</h5>
                        <div className="space-y-2 text-sm text-gray-600">
                          <p>1. Pilih menu <strong>Transaksi Lainnya</strong></p>
                          <p>2. Pilih <strong>Transfer</strong></p>
                          <p>3. Pilih <strong>Virtual Account</strong></p>
                          <p>4. Masukkan nomor VA: <strong>{vaNumber}</strong></p>
                          <p>5. Konfirmasi pembayaran</p>
                        </div>
                      </div>

                      {/* Mobile Banking */}
                      <div className="bg-gray-50 rounded-xl p-4">
                        <h5 className="font-semibold text-gray-800 mb-2 text-sm">Via Mobile/Internet Banking:</h5>
                        <div className="space-y-2 text-sm text-gray-600">
                          <p>1. Login ke aplikasi mobile banking</p>
                          <p>2. Pilih menu <strong>Transfer</strong></p>
                          <p>3. Pilih <strong>Virtual Account</strong></p>
                          <p>4. Masukkan nomor VA: <strong>{vaNumber}</strong></p>
                          <p>5. Verifikasi dan konfirmasi</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                      <p className="text-sm text-blue-800">
                        <strong>Catatan:</strong> Pembayaran akan dikonfirmasi otomatis setelah berhasil. Pastikan jumlah yang dibayarkan sesuai.
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* E-Wallet Modal */}
      <Dialog open={showEwallet} onOpenChange={setShowEwallet}>
        <DialogContent className="max-w-md mx-auto p-0 gap-0 overflow-hidden max-h-[90vh] overflow-y-auto">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-5 text-white relative overflow-hidden sticky top-0 z-10">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -mr-16 -mt-16"></div>
            </div>
            <button
              onClick={() => setShowEwallet(false)}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center hover:bg-white/20 rounded-full transition-colors z-10"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="relative z-10 text-center">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-3">
                <Wallet className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-1">E-Wallet</h3>
              <p className="text-purple-100 text-sm">
                {ewalletStep === "select" && "Pilih dompet digital Anda"}
                {ewalletStep === "qr" && "Scan QR atau buka aplikasi"}
                {ewalletStep === "processing" && "Memproses pembayaran"}
                {ewalletStep === "success" && "Pembayaran berhasil!"}
              </p>
            </div>
          </div>

          <div className="p-6 space-y-5">
            {/* Amount */}
            <div className="text-center py-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl">
              <p className="text-sm text-gray-600 mb-1">Total Pembayaran</p>
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-lg text-gray-700">Rp</span>
                <span className="text-3xl font-bold text-gray-800">{billingInfo.amount}</span>
              </div>
            </div>

            {/* Step: Select E-Wallet */}
            {ewalletStep === "select" && (
              <>
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-gray-800">Pilih E-Wallet:</h4>
                  {ewalletList.map((ewallet) => (
                    <Card
                      key={ewallet.id}
                      onClick={() => handleEwalletSelection(ewallet.id)}
                      className="p-4 cursor-pointer border-2 border-transparent hover:border-purple-500 hover:shadow-lg transition-all active:scale-95"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 bg-gradient-to-br ${ewallet.color} rounded-xl flex items-center justify-center text-2xl`}>
                          {ewallet.logo}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-800">{ewallet.name}</h3>
                          <p className="text-sm text-gray-600">Bayar langsung dengan {ewallet.name}</p>
                        </div>
                        <ArrowRight className="w-5 h-5 text-gray-400" />
                      </div>
                    </Card>
                  ))}
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                  <p className="text-sm text-blue-800">
                    <strong>Catatan:</strong> Pastikan saldo e-wallet Anda mencukupi. Pembayaran akan dikonfirmasi secara instan.
                  </p>
                </div>
              </>
            )}

            {/* Step: QR Code & Deep Link */}
            {ewalletStep === "qr" && selectedEwallet && (
              <>
                {/* Timer */}
                <div className="flex items-center justify-center gap-2 py-2">
                  <Clock className={`w-5 h-5 ${ewalletTimer < 60 ? 'text-red-500' : 'text-purple-500'}`} />
                  <span className={`text-sm font-semibold ${ewalletTimer < 60 ? 'text-red-600' : 'text-gray-700'}`}>
                    Berlaku hingga {formatTime(ewalletTimer)}
                  </span>
                </div>

                {/* Selected E-Wallet Info */}
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-4">
                  <div className="flex items-center gap-3">
                    {ewalletList.filter(e => e.id === selectedEwallet).map(ewallet => (
                      <div key={ewallet.id} className="flex items-center gap-3 flex-1">
                        <div className={`w-12 h-12 bg-gradient-to-br ${ewallet.color} rounded-xl flex items-center justify-center text-2xl`}>
                          {ewallet.logo}
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-800">{ewallet.name}</h3>
                          <p className="text-sm text-gray-600">Pembayaran siap</p>
                        </div>
                      </div>
                    ))}
                    <Button
                      onClick={() => setEwalletStep("select")}
                      variant="outline"
                      size="sm"
                    >
                      Ganti
                    </Button>
                  </div>
                </div>

                {/* QR Code */}
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-gray-800 text-center">Pilih cara pembayaran:</h4>

                  <div className="bg-white p-6 rounded-2xl shadow-lg border-2 border-gray-100">
                    <p className="text-xs text-gray-600 mb-3 text-center font-medium">Scan QR Code di aplikasi e-wallet</p>
                    <div className="bg-white p-4 rounded-xl flex items-center justify-center">
                      {ewalletQR && (
                        <QRCodeSVG
                          value={ewalletQR}
                          size={200}
                          level="H"
                          includeMargin={false}
                        />
                      )}
                    </div>
                  </div>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-200"></div>
                    </div>
                    <div className="relative flex justify-center text-xs">
                      <span className="px-4 bg-white text-gray-500">atau</span>
                    </div>
                  </div>

                  {/* Deep Link Button */}
                  <Button
                    onClick={openEwalletApp}
                    className="w-full h-12 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  >
                    <Smartphone className="w-5 h-5 mr-2" />
                    Buka Aplikasi {ewalletList.find(e => e.id === selectedEwallet)?.name}
                  </Button>
                </div>

                {/* Manual Payment Simulation */}
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-gray-800">Cara Pembayaran:</h4>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-semibold">1</div>
                      <p>Scan QR code di atas atau tekan tombol untuk buka aplikasi</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-semibold">2</div>
                      <p>Verifikasi jumlah pembayaran Rp {billingInfo.amount}</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-semibold">3</div>
                      <p>Konfirmasi dengan PIN atau biometrik Anda</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-semibold">4</div>
                      <p>Pembayaran akan dikonfirmasi secara otomatis</p>
                    </div>
                  </div>
                </div>

                {/* Test/Demo Button */}
                <div className="pt-3 border-t">
                  <Button
                    onClick={simulatePayment}
                    variant="outline"
                    className="w-full border-dashed border-2"
                  >
                    🧪 Demo: Simulasi Pembayaran Berhasil
                  </Button>
                </div>
              </>
            )}

            {/* Step: Processing */}
            {ewalletStep === "processing" && (
              <div className="py-8 text-center">
                <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center">
                  <div className="animate-spin">
                    <Wallet className="w-10 h-10 text-purple-600" />
                  </div>
                </div>
                <h4 className="text-lg font-semibold text-gray-800 mb-2">Memproses Pembayaran</h4>
                <p className="text-sm text-gray-600">Tunggu sebentar, kami sedang mengonfirmasi pembayaran Anda...</p>
                <div className="mt-4 flex items-center justify-center gap-1">
                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
                </div>
              </div>
            )}

            {/* Step: Success */}
            {ewalletStep === "success" && (
              <div className="py-8 text-center">
                <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-10 h-10 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-gray-800 mb-2">Pembayaran Berhasil! 🎉</h4>
                <p className="text-sm text-gray-600 mb-4">Tagihan Anda telah dibayar melalui {ewalletList.find(e => e.id === selectedEwallet)?.name}</p>
                <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                  <div className="flex items-baseline justify-center gap-1 mb-1">
                    <span className="text-sm text-gray-600">Total Dibayar:</span>
                    <span className="text-xl font-bold text-green-700">Rp {billingInfo.amount}</span>
                  </div>
                  <p className="text-xs text-gray-600">Bukti pembayaran telah dikirim ke email Anda</p>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Credit Card Modal */}
      <Dialog open={showCreditCard} onOpenChange={setShowCreditCard}>
        <DialogContent className="max-w-md mx-auto p-0 gap-0 overflow-hidden max-h-[90vh] overflow-y-auto">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-5 text-white relative overflow-hidden sticky top-0 z-10">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -mr-16 -mt-16"></div>
            </div>
            <button
              onClick={() => setShowCreditCard(false)}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center hover:bg-white/20 rounded-full transition-colors z-10"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="relative z-10 text-center">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-3">
                <CreditCard className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-1">Kartu Kredit/Debit</h3>
              <p className="text-blue-100 text-sm">Pembayaran aman dengan kartu Anda</p>
            </div>
          </div>

          <div className="p-6 space-y-5">
            {/* Amount */}
            <div className="text-center py-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl">
              <p className="text-sm text-gray-600 mb-1">Total Pembayaran</p>
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-lg text-gray-700">Rp</span>
                <span className="text-3xl font-bold text-gray-800">{billingInfo.amount}</span>
              </div>
            </div>

            {/* Card Form */}
            <div className="space-y-4">
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">Nomor Kartu</label>
                <input
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  maxLength={19}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-2 block">Berlaku Hingga</label>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    maxLength={5}
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-2 block">CVV</label>
                  <input
                    type="text"
                    placeholder="123"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    maxLength={3}
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">Nama Pemegang Kartu</label>
                <input
                  type="text"
                  placeholder="JOHN DOE"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Supported Cards */}
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-xs text-gray-600 mb-2 text-center font-medium">Kartu yang Didukung:</p>
              <div className="flex items-center justify-center gap-3">
                <div className="px-3 py-2 bg-white rounded-lg border border-gray-200 text-xs font-semibold text-gray-700">VISA</div>
                <div className="px-3 py-2 bg-white rounded-lg border border-gray-200 text-xs font-semibold text-gray-700">Mastercard</div>
                <div className="px-3 py-2 bg-white rounded-lg border border-gray-200 text-xs font-semibold text-gray-700">JCB</div>
              </div>
            </div>

            {/* Security Note */}
            <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-green-800">
                <p className="font-semibold mb-1">Transaksi Aman</p>
                <p>Data kartu Anda dienkripsi dan aman. Kami tidak menyimpan informasi kartu Anda.</p>
              </div>
            </div>

            {/* Pay Button */}
            <Button
              onClick={() => {
                toast.loading("Memproses pembayaran...");
                setTimeout(() => {
                  toast.dismiss();
                  toast.success("Pembayaran berhasil!");
                  setShowCreditCard(false);
                }, 2000);
              }}
              className="w-full h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl"
            >
              Bayar Sekarang
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}