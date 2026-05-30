import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router";
import { Eye, EyeOff, User, Lock, Wifi, ArrowRight, Fingerprint } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card } from "../components/ui/card";
import { Checkbox } from "../components/ui/checkbox";
import { toast } from "sonner";
import logoImage from 'figma:asset/ca9a33cd2014031093d2ca062e26e18067414a5c.png';

export function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [biometricAvailable, setBiometricAvailable] = useState(false);

  // Load saved credentials on mount
  useEffect(() => {
    const savedCredentials = localStorage.getItem("savedCredentials");
    if (savedCredentials) {
      const { username: savedUsername, password: savedPassword, remember } = JSON.parse(savedCredentials);
      if (remember) {
        setUsername(savedUsername);
        setPassword(savedPassword);
        setRememberMe(true);
      }
    }

    // Check if biometric authentication is available
    checkBiometricAvailability();
  }, []);

  const checkBiometricAvailability = async () => {
    if (window.PublicKeyCredential) {
      const available = await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();
      setBiometricAvailable(available);
    }
  };

  const handleBiometricLogin = async () => {
    try {
      // Check if biometric credential is registered
      const savedBiometric = localStorage.getItem("biometricRegistered");

      if (!savedBiometric) {
        toast.error("Biometrik belum terdaftar. Silakan login dengan username dan password terlebih dahulu.");
        return;
      }

      // In production, this would use WebAuthn API to verify biometric
      // For demo purposes, we'll simulate the biometric check
      toast.success("Login berhasil dengan biometrik!");
      navigate("/home-new");
    } catch (error) {
      toast.error("Login biometrik gagal. Silakan coba lagi.");
    }
  };

  const registerBiometric = async () => {
    try {
      if (!username || !password) {
        toast.error("Silakan masukkan username dan password terlebih dahulu");
        return;
      }

      // In production, this would register the credential with WebAuthn API
      // For demo purposes, we'll just save a flag
      localStorage.setItem("biometricRegistered", "true");
      localStorage.setItem("biometricUser", username);
      toast.success("Biometrik berhasil didaftarkan! Anda dapat login dengan fingerprint/face ID.");
    } catch (error) {
      toast.error("Gagal mendaftarkan biometrik");
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login - dalam implementasi nyata, ini akan menghubungi API
    if (username && password) {
      // Save credentials if Remember Me is checked
      if (rememberMe) {
        localStorage.setItem("savedCredentials", JSON.stringify({
          username,
          password,
          remember: true
        }));
      } else {
        localStorage.removeItem("savedCredentials");
      }

      toast.success("Login berhasil!");
      // Redirect ke home-new setelah login
      navigate("/home-new");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 flex flex-col p-4">
      <div className="flex-1 flex flex-col items-center justify-center max-w-md mx-auto w-full">
        {/* Logo & Welcome Section */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="mb-6 inline-flex items-center justify-center">
            <div className="w-20 h-20 bg-white rounded-3xl shadow-2xl flex items-center justify-center relative">
              <img src={logoImage} alt="Fiber Byte" className="w-12 h-12" />
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 border-4 border-white rounded-full"></div>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Selamat Datang! 👋</h1>
          <p className="text-blue-100 text-base">Masuk ke akun FiberByte Anda</p>
        </div>

        {/* Login Card */}
        <Card className="w-full bg-white/95 backdrop-blur-lg border-0 shadow-2xl p-6 rounded-3xl">
          <form onSubmit={handleLogin} className="space-y-5">
            {/* Username Field */}
            <div className="space-y-2">
              <Label htmlFor="username" className="text-gray-700 font-medium text-sm">
                Username atau Email
              </Label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400">
                  <User className="w-5 h-5" />
                </div>
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="h-14 pl-12 pr-4 border-gray-200 focus:border-blue-500 rounded-xl text-base bg-gray-50 focus:bg-white transition-colors"
                  placeholder="Masukkan username atau email"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-700 font-medium text-sm">
                Password
              </Label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400">
                  <Lock className="w-5 h-5" />
                </div>
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-14 pl-12 pr-12 border-gray-200 focus:border-blue-500 rounded-xl text-base bg-gray-50 focus:bg-white transition-colors"
                  placeholder="Masukkan password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                />
                <Label
                  htmlFor="remember"
                  className="text-sm text-gray-600 cursor-pointer select-none"
                >
                  Ingat saya
                </Label>
              </div>
              <Link to="/forgot-password" className="text-blue-600 text-sm font-medium hover:text-blue-700 transition-colors">
                Lupa password?
              </Link>
            </div>

            {/* Login Button */}
            <Button
              type="submit"
              className="w-full h-14 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-base font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all"
            >
              <span>Masuk Sekarang</span>
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>

            {/* Biometric Login */}
            {biometricAvailable && (
              <div className="space-y-3">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full h-14 border-2 border-blue-200 hover:border-blue-400 hover:bg-blue-50 rounded-xl transition-all"
                  onClick={handleBiometricLogin}
                >
                  <Fingerprint className="w-5 h-5 mr-2 text-blue-600" />
                  <span className="text-base">Login dengan Biometrik</span>
                </Button>
                {username && password && !localStorage.getItem("biometricRegistered") && (
                  <button
                    type="button"
                    onClick={registerBiometric}
                    className="w-full text-sm text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    Daftarkan Fingerprint/Face ID
                  </button>
                )}
              </div>
            )}
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">atau</span>
            </div>
          </div>

          {/* Register Link */}
          <div className="text-center">
            <p className="text-gray-600 text-sm">
              Belum punya akun?{" "}
              <Link to="/register" className="text-blue-600 font-semibold hover:text-blue-700 transition-colors">
                Daftar Gratis
              </Link>
            </p>
          </div>
        </Card>

        {/* Features */}
        <div className="grid grid-cols-3 gap-3 mt-8 w-full">
          <div className="text-center">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-2">
              <Wifi className="w-6 h-6 text-white" />
            </div>
            <p className="text-white text-xs font-medium">Internet Cepat</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-2">
              <span className="text-white text-xl">🔒</span>
            </div>
            <p className="text-white text-xs font-medium">Aman & Terpercaya</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-2">
              <span className="text-white text-xl">💬</span>
            </div>
            <p className="text-white text-xs font-medium">Support 24/7</p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-white/80 text-xs">
            PT GLOBAL MEDIA DATA PRIMA
          </p>
        </div>
      </div>
    </div>
  );
}