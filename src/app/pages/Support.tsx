import { Phone, Mail, MessageCircle, MapPin, Clock, Search } from "lucide-react";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../components/ui/accordion";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export function Support() {
  const contactMethods = [
    {
      icon: Phone,
      title: "Telepon",
      description: "021-1234-5678",
      detail: "Senin - Minggu, 24 jam",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Mail,
      title: "Email",
      description: "support@fiberbyte.id",
      detail: "Respon dalam 24 jam",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Chat langsung dengan tim kami",
      detail: "Tersedia 24/7",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: MapPin,
      title: "Kantor Pusat",
      description: "Jl. Sudirman No. 123, Jakarta",
      detail: "Senin - Jumat, 09:00 - 17:00",
      color: "from-orange-500 to-red-500",
    },
  ];

  const faqs = [
    {
      question: "Bagaimana cara mendaftar layanan FiberByte?",
      answer: "Anda dapat mendaftar melalui website kami di halaman Paket, atau hubungi customer service kami. Proses pendaftaran sangat mudah dan cepat, kami akan memandu Anda step by step.",
    },
    {
      question: "Apa yang harus dilakukan jika koneksi internet lambat?",
      answer: "Pertama, coba restart router Anda. Jika masih lambat, periksa jumlah perangkat yang terhubung. Jika masalah berlanjut, hubungi support kami untuk pengecekan lebih lanjut.",
    },
    {
      question: "Bagaimana cara membayar tagihan bulanan?",
      answer: "Anda dapat membayar melalui transfer bank, virtual account, e-wallet, atau kartu kredit. Pembayaran juga bisa dilakukan melalui dashboard akun Anda.",
    },
    {
      question: "Apakah saya bisa mengganti paket berlangganan?",
      answer: "Ya, Anda dapat upgrade atau downgrade paket kapan saja. Untuk upgrade, perubahan akan berlaku segera. Untuk downgrade, perubahan akan berlaku pada periode billing berikutnya.",
    },
    {
      question: "Bagaimana jika saya ingin pindah alamat?",
      answer: "Silakan hubungi customer service kami minimal 7 hari sebelum tanggal pindah. Kami akan bantu proses relokasi layanan ke alamat baru Anda.",
    },
    {
      question: "Apakah ada garansi layanan?",
      answer: "Ya, kami memberikan garansi uptime 99.9% untuk semua paket. Jika terjadi gangguan di luar maintenance terjadwal, kami akan memberikan kompensasi sesuai dengan SLA.",
    },
  ];

  return (
    <div className="min-h-full bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl mb-4">
            Pusat Bantuan & Dukungan
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Kami siap membantu Anda 24/7. Temukan jawaban atau hubungi tim support kami
          </p>
        </div>

        {/* Search */}
        <Card className="p-6 mb-12 max-w-2xl mx-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input 
              placeholder="Cari bantuan, ketik pertanyaan Anda..." 
              className="pl-10 h-12"
            />
          </div>
        </Card>

        {/* Contact Methods */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {contactMethods.map((method, index) => {
            const Icon = method.icon;
            return (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow text-center">
                <div className={`w-14 h-14 bg-gradient-to-br ${method.color} rounded-xl flex items-center justify-center mx-auto mb-4`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-lg mb-2">{method.title}</h3>
                <p className="text-sm mb-1">{method.description}</p>
                <p className="text-xs text-gray-600">{method.detail}</p>
              </Card>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* FAQ */}
          <div>
            <h2 className="text-2xl md:text-3xl mb-6">
              Pertanyaan yang Sering Diajukan
            </h2>
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="bg-white border rounded-lg px-6">
                  <AccordionTrigger className="hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          {/* Contact Form */}
          <div>
            <Card className="p-6">
              <h2 className="text-2xl md:text-3xl mb-6">
                Kirim Pesan
              </h2>
              <form className="space-y-4">
                <div>
                  <Label htmlFor="name">Nama Lengkap</Label>
                  <Input id="name" placeholder="Masukkan nama Anda" />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="email@example.com" />
                </div>
                <div>
                  <Label htmlFor="phone">Nomor Telepon</Label>
                  <Input id="phone" type="tel" placeholder="08xx-xxxx-xxxx" />
                </div>
                <div>
                  <Label htmlFor="subject">Subjek</Label>
                  <Input id="subject" placeholder="Topik pertanyaan Anda" />
                </div>
                <div>
                  <Label htmlFor="message">Pesan</Label>
                  <Textarea 
                    id="message" 
                    placeholder="Jelaskan pertanyaan atau masalah Anda..."
                    rows={5}
                  />
                </div>
                <Button className="w-full">
                  Kirim Pesan
                </Button>
              </form>
            </Card>
          </div>
        </div>

        {/* Support Image Banner */}
        <Card className="overflow-hidden">
          <div className="grid md:grid-cols-2 gap-0">
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <h2 className="text-2xl md:text-3xl mb-4">
                Tim Support Terbaik untuk Anda
              </h2>
              <p className="text-gray-600 mb-6">
                Tim support kami yang berpengalaman siap membantu menyelesaikan masalah Anda dengan cepat dan profesional. Kami berkomitmen memberikan layanan terbaik 24/7.
              </p>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-blue-600" />
                  <span className="text-sm">Response time &lt; 5 menit</span>
                </div>
              </div>
            </div>
            <div className="h-64 md:h-auto">
              <ImageWithFallback 
                src="https://images.unsplash.com/photo-1553775282-20af80779df7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXN0b21lciUyMHN1cHBvcnQlMjBoZWFkc2V0fGVufDF8fHx8MTc3MzE0NTk2M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Customer Support"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </Card>

        {/* Emergency Contact */}
        <div className="mt-12 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-2xl p-8 text-center">
          <h3 className="text-2xl mb-2">Darurat?</h3>
          <p className="mb-4">Hubungi hotline darurat kami untuk bantuan segera</p>
          <div className="text-3xl">📞 021-1234-9999</div>
          <p className="text-sm mt-2 text-red-100">Tersedia 24 jam setiap hari</p>
        </div>
      </div>
    </div>
  );
}
