import { useState } from "react";
import { Link } from "react-router";
import { Mail, ArrowLeft } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import exampleImage from 'figma:asset/6aa880f21a24bfab46693d7808dbec9048a62826.png';

export function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock submit - dalam implementasi nyata, ini akan menghubungi API
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 flex flex-col">
      {/* Header dengan ilustrasi */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-8">
        {/* Ilustrasi */}
        <div className="mb-8 w-full max-w-sm">
          <img 
            src={exampleImage} 
            alt="Internet Illustration"
            className="w-64 h-64 mx-auto object-contain"
          />
        </div>

        {/* Tagline */}
        <div className="text-center text-white mb-8 px-4">
          <h1 className="text-2xl md:text-3xl leading-tight">
            Lupa Password?<br />
            Jangan khawatir!
          </h1>
        </div>
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-t-3xl px-6 py-8 shadow-2xl">
        <div className="max-w-md mx-auto">
          {!isSubmitted ? (
            <>
              <h2 className="text-3xl mb-2">Reset Password</h2>
              <p className="text-gray-400 mb-8">
                Masukkan email Anda dan kami akan mengirimkan link untuk reset password
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email Field */}
                <div>
                  <Label htmlFor="email" className="text-blue-600 text-base mb-2 block">
                    Email
                  </Label>
                  <div className="relative">
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-14 pr-12 border-gray-200 focus:border-blue-500"
                      placeholder="email@example.com"
                      required
                    />
                    <Mail className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  </div>
                </div>

                {/* Submit Button */}
                <Button 
                  type="submit"
                  className="w-full h-14 bg-blue-600 hover:bg-blue-700 text-lg"
                >
                  Kirim Link Reset
                </Button>
              </form>
            </>
          ) : (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-2xl mb-2">Email Terkirim!</h2>
              <p className="text-gray-600 mb-6">
                Kami telah mengirimkan link reset password ke email <strong>{email}</strong>. 
                Silakan cek inbox Anda.
              </p>
              <p className="text-sm text-gray-500">
                Tidak menerima email? Cek folder spam atau{" "}
                <button 
                  onClick={() => setIsSubmitted(false)}
                  className="text-blue-600 hover:underline"
                >
                  kirim ulang
                </button>
              </p>
            </div>
          )}

          {/* Back to Login */}
          <div className="mt-8 text-center">
            <Link 
              to="/login" 
              className="text-blue-600 hover:underline inline-flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Kembali ke Login
            </Link>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-gray-400 text-sm">
              PT GLOBAL MEDIA DATA PRIMA
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
