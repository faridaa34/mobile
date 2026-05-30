import { useState } from "react";
import { Download, Upload, Activity, Wifi, Play, RotateCcw } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { motion, AnimatePresence } from "motion/react";

interface SpeedTestResult {
  download: number;
  upload: number;
  ping: number;
}

export function SpeedTest() {
  const [testing, setTesting] = useState(false);
  const [testPhase, setTestPhase] = useState<"idle" | "ping" | "download" | "upload" | "complete">("idle");
  const [results, setResults] = useState<SpeedTestResult | null>(null);
  const [progress, setProgress] = useState(0);

  const simulateSpeedTest = async () => {
    setTesting(true);
    setProgress(0);
    setResults(null);

    // Phase 1: Ping Test
    setTestPhase("ping");
    await simulateTest(1000, 25);
    const ping = Math.floor(Math.random() * 30) + 5; // 5-35ms

    // Phase 2: Download Test
    setTestPhase("download");
    await simulateTest(2000, 50);
    const download = Math.floor(Math.random() * 100) + 450; // 450-550 Mbps

    // Phase 3: Upload Test
    setTestPhase("upload");
    await simulateTest(2000, 75);
    const upload = Math.floor(Math.random() * 50) + 150; // 150-200 Mbps

    // Complete
    setProgress(100);
    setTestPhase("complete");
    setResults({ download, upload, ping });
    setTesting(false);
  };

  const simulateTest = (duration: number, targetProgress: number) => {
    return new Promise<void>((resolve) => {
      const startProgress = progress;
      const startTime = Date.now();
      const interval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const newProgress = startProgress + ((targetProgress - startProgress) * (elapsed / duration));

        if (elapsed >= duration) {
          setProgress(targetProgress);
          clearInterval(interval);
          resolve();
        } else {
          setProgress(newProgress);
        }
      }, 50);
    });
  };

  const resetTest = () => {
    setTestPhase("idle");
    setResults(null);
    setProgress(0);
  };

  const getPhaseLabel = () => {
    switch (testPhase) {
      case "ping":
        return "Mengukur latensi...";
      case "download":
        return "Mengukur kecepatan download...";
      case "upload":
        return "Mengukur kecepatan upload...";
      case "complete":
        return "Tes selesai!";
      default:
        return "Tekan tombol untuk memulai";
    }
  };

  const getQualityLabel = (download: number) => {
    if (download >= 500) return { label: "Sangat Bagus", color: "text-green-600" };
    if (download >= 300) return { label: "Bagus", color: "text-blue-600" };
    if (download >= 100) return { label: "Cukup", color: "text-yellow-600" };
    return { label: "Lambat", color: "text-red-600" };
  };

  return (
    <Card className="p-6">
      <div className="mb-6">
        <h3 className="text-xl mb-1 flex items-center gap-2">
          <Wifi className="w-5 h-5 text-blue-600" />
          Speed Test WiFi
        </h3>
        <p className="text-sm text-gray-600">Ukur kecepatan koneksi internet Anda</p>
      </div>

      {/* Main Display */}
      <div className="text-center mb-6">
        <AnimatePresence mode="wait">
          {testPhase === "idle" || testPhase === "complete" ? (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {results ? (
                <div className="space-y-6">
                  {/* Main Speed Display */}
                  <div>
                    <div className="text-6xl mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      {results.download}
                    </div>
                    <div className="text-2xl text-gray-600 mb-1">Mbps</div>
                    <div className={`text-sm font-medium ${getQualityLabel(results.download).color}`}>
                      {getQualityLabel(results.download).label}
                    </div>
                  </div>

                  {/* Detailed Results */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-blue-50 rounded-lg p-4">
                      <Download className="w-5 h-5 text-blue-600 mx-auto mb-2" />
                      <div className="text-2xl mb-1">{results.download}</div>
                      <div className="text-xs text-gray-600">Download</div>
                      <div className="text-xs text-gray-500">Mbps</div>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-4">
                      <Upload className="w-5 h-5 text-purple-600 mx-auto mb-2" />
                      <div className="text-2xl mb-1">{results.upload}</div>
                      <div className="text-xs text-gray-600">Upload</div>
                      <div className="text-xs text-gray-500">Mbps</div>
                    </div>
                    <div className="bg-green-50 rounded-lg p-4">
                      <Activity className="w-5 h-5 text-green-600 mx-auto mb-2" />
                      <div className="text-2xl mb-1">{results.ping}</div>
                      <div className="text-xs text-gray-600">Ping</div>
                      <div className="text-xs text-gray-500">ms</div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="py-12">
                  <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
                    <Wifi className="w-12 h-12 text-blue-600" />
                  </div>
                  <p className="text-gray-600">Siap mengukur kecepatan internet</p>
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="testing"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="py-12"
            >
              <div className="relative w-32 h-32 mx-auto mb-6">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  style={{ opacity: 0.1 }}
                />
                <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-3xl mb-1 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      {Math.round(progress)}%
                    </div>
                    {testPhase === "ping" && <Activity className="w-6 h-6 text-green-600 mx-auto" />}
                    {testPhase === "download" && <Download className="w-6 h-6 text-blue-600 mx-auto" />}
                    {testPhase === "upload" && <Upload className="w-6 h-6 text-purple-600 mx-auto" />}
                  </div>
                </div>
              </div>
              <p className="text-gray-600 mb-2">{getPhaseLabel()}</p>
              <Progress value={progress} className="h-2 max-w-xs mx-auto" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        {testPhase === "idle" || testPhase === "complete" ? (
          <>
            <Button
              onClick={simulateSpeedTest}
              disabled={testing}
              className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              <Play className="w-4 h-4 mr-2" />
              {results ? "Test Ulang" : "Mulai Test"}
            </Button>
            {results && (
              <Button
                onClick={resetTest}
                variant="outline"
                className="flex-1"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset
              </Button>
            )}
          </>
        ) : (
          <Button disabled className="flex-1">
            Testing...
          </Button>
        )}
      </div>

      {/* Info */}
      <div className="mt-4 p-3 bg-blue-50 rounded-lg">
        <p className="text-xs text-gray-600 text-center">
          💡 Pastikan tidak ada download/upload besar saat melakukan test untuk hasil yang akurat
        </p>
      </div>
    </Card>
  );
}
