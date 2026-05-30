import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { Eye, EyeOff, User, Mail, Phone, Lock } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import exampleImage from 'figma:asset/6aa880f21a24bfab46693d7808dbec9048a62826.png';

export function Register() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock register - dalam implementasi nyata, ini akan menghubungi API
    if (formData.password === formData.confirmPassword) {
      // Redirect ke login setelah register
      navigate("/login");
    } else {
      alert("Password tidak cocok!");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 flex flex-col">
      {/* Header dengan ilustrasi */}
      <div className="flex-shrink-0 flex flex-col items-center justify-center px-6 py-8">
        {/* Ilustrasi */}
        <div className="mb-6 w-full max-w-sm">
          <img 
            src={exampleImage} 
            alt="Internet Illustration"
            className="w-48 h-48 mx-auto object-contain"
          />
        </div>

        {/* Tagline */}
        <div className="text-center text-white mb-6 px-4">
          <h1 className="text-2xl md:text-3xl leading-tight">
            Bergabung dengan FiberByte<br />
            untuk internet terbaik
          </h1>
        </div>
      </div>

      {/* Form Register Card */}
      <div className="bg-white rounded-t-3xl px-6 py-8 shadow-2xl">
        <div className="max-w-md mx-auto">
          <h2 className="text-3xl mb-2">Daftar</h2>
          <p className="text-gray-400 mb-6">Buat akun baru Anda</p>

          <form onSubmit={handleRegister} className="space-y-4">
            {/* Full Name Field */}
            <div>
              <Label htmlFor="fullName" className="text-blue-600 text-sm mb-1 block">
                Nama Lengkap
              </Label>
              <div className="relative">
                <Input
                  id="fullName"
                  name="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="h-12 pr-12 border-gray-200 focus:border-blue-500"
                  placeholder="Masukkan nama lengkap"
                  required
                />
                <User className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
            </div>

            {/* Username Field */}
            <div>
              <Label htmlFor="username" className="text-blue-600 text-sm mb-1 block">
                Username
              </Label>
              <div className="relative">
                <Input
                  id="username"
                  name="username"
                  type="text"
                  value={formData.username}
                  onChange={handleChange}
                  className="h-12 pr-12 border-gray-200 focus:border-blue-500"
                  placeholder="Masukkan username"
                  required
                />
                <User className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
            </div>

            {/* Email Field */}
            <div>
              <Label htmlFor="email" className="text-blue-600 text-sm mb-1 block">
                Email
              </Label>
              <div className="relative">
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="h-12 pr-12 border-gray-200 focus:border-blue-500"
                  placeholder="email@example.com"
                  required
                />
                <Mail className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
            </div>

            {/* Phone Field */}
            <div>
              <Label htmlFor="phone" className="text-blue-600 text-sm mb-1 block">
                Nomor Telepon
              </Label>
              <div className="relative">
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  className="h-12 pr-12 border-gray-200 focus:border-blue-500"
                  placeholder="08xx-xxxx-xxxx"
                  required
                />
                <Phone className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <Label htmlFor="password" className="text-blue-600 text-sm mb-1 block">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  className="h-12 pr-12 border-gray-200 focus:border-blue-500"
                  placeholder="Minimal 8 karakter"
                  required
                  minLength={8}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password Field */}
            <div>
              <Label htmlFor="confirmPassword" className="text-blue-600 text-sm mb-1 block">
                Konfirmasi Password
              </Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="h-12 pr-12 border-gray-200 focus:border-blue-500"
                  placeholder="Ulangi password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Register Button */}
            <Button 
              type="submit"
              className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-base mt-6"
            >
              Daftar
            </Button>
          </form>

          {/* Login Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Sudah punya akun?{" "}
              <Link to="/login" className="text-blue-600 hover:underline">
                Login di sini
              </Link>
            </p>
          </div>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-gray-400 text-sm">
              PT GLOBAL MEDIA DATA PRIMA
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
