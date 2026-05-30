import { Link } from "react-router";
import { Home, ArrowLeft } from "lucide-react";
import { Button } from "../components/ui/button";

export function NotFound() {
  return (
    <div className="min-h-full bg-gray-50 flex items-center justify-center px-4">
      <div className="text-center">
        <div className="text-8xl md:text-9xl mb-4">404</div>
        <h1 className="text-3xl md:text-4xl mb-4">
          Halaman Tidak Ditemukan
        </h1>
        <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
          Maaf, halaman yang Anda cari tidak dapat ditemukan. Mungkin halaman telah dipindahkan atau dihapus.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/">
            <Button size="lg" className="w-full sm:w-auto">
              <Home className="w-4 h-4 mr-2" />
              Kembali ke Beranda
            </Button>
          </Link>
          <Button 
            size="lg" 
            variant="outline"
            onClick={() => window.history.back()}
            className="w-full sm:w-auto"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kembali
          </Button>
        </div>
      </div>
    </div>
  );
}
