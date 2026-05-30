import { Link } from "react-router";
import { ArrowRight, Zap, Shield, HeadphonesIcon, Gauge } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export function Home() {
  const features = [
    {
      icon: Zap,
      title: "Kecepatan Super",
      description: "Nikmati kecepatan internet hingga 1 Gbps untuk streaming, gaming, dan browsing tanpa hambatan.",
    },
    {
      icon: Shield,
      title: "Koneksi Stabil",
      description: "Teknologi fiber optik menjamin koneksi yang stabil dan minim gangguan sepanjang waktu.",
    },
    {
      icon: HeadphonesIcon,
      title: "Layanan 24/7",
      description: "Tim support kami siap membantu Anda kapan saja, 24 jam sehari 7 hari seminggu.",
    },
    {
      icon: Gauge,
      title: "Unlimited Data",
      description: "Tidak ada batasan kuota, gunakan internet sepuasnya tanpa khawatir kehabisan data.",
    },
  ];

  return (
    <div className="size-full">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00em0wLTIwYzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHptLTIwIDBjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00em0wIDIwYzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHptMjAgMjBjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00eiIvPjwvZz48L2c+PC9zdmc+')] opacity-30"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl mb-6">
                Internet Super Cepat dengan Fiber Optik
              </h1>
              <p className="text-lg md:text-xl mb-8 text-blue-100">
                Rasakan pengalaman internet terbaik dengan teknologi fiber optik terdepan. 
                Streaming 4K, gaming online, dan video call tanpa lag.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/packages">
                  <Button size="lg" className="w-full sm:w-auto bg-white text-blue-600 hover:bg-gray-100">
                    Lihat Paket
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                <Link to="/dashboard">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto border-white text-white hover:bg-white/10">
                    Dashboard Saya
                  </Button>
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              <ImageWithFallback 
                src="https://images.unsplash.com/photo-1761507321147-c21f673f9f6d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaWJlciUyMG9wdGljJTIwY2FibGVzJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NzMwMzU2MjF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Fiber Optic Technology"
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl mb-4">
              Mengapa Memilih FiberByte?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Kami menyediakan layanan internet terbaik dengan teknologi terkini dan dukungan pelanggan terbaik
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl mb-4">
            Siap Merasakan Internet Super Cepat?
          </h2>
          <p className="text-lg md:text-xl mb-8 text-blue-100">
            Bergabunglah dengan ribuan pelanggan yang telah mempercayai FiberByte untuk kebutuhan internet mereka
          </p>
          <Link to="/packages">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              Berlangganan Sekarang
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl text-blue-600 mb-2">10K+</div>
              <div className="text-gray-600">Pelanggan Aktif</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl text-blue-600 mb-2">99.9%</div>
              <div className="text-gray-600">Uptime</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl text-blue-600 mb-2">1Gbps</div>
              <div className="text-gray-600">Kecepatan Maks</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl text-blue-600 mb-2">24/7</div>
              <div className="text-gray-600">Layanan Support</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
