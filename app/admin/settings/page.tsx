"use client";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Switch } from "../../components/ui/switch";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SettingsPage() {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [twoFA, setTwoFA] = useState(false);
  const [ipGuard, setIpGuard] = useState(false);
  const [pinEnabled, setPinEnabled] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsAdmin(false);
      router.replace("/login");
      return;
    }
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      setIsAdmin(payload.role === "admin");
      if (payload.role !== "admin") {
        router.replace("/");
      }
    } catch {
      setIsAdmin(false);
      router.replace("/login");
    }
  }, [router]);

  if (isAdmin === false) return null;

  return (
    <div className="space-y-8 p-4">
      <h1 className="text-2xl font-bold text-gray-800 tracking-tight">
        ⚙️ Security & Platform Settings
      </h1>

      <Card className="shadow-md rounded-2xl border border-gray-200">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-700">
            Security Controls
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <span className="font-medium text-gray-700">
              Enforce 2FA for all admins
            </span>
            <Switch
              checked={twoFA}
              onChange={(checked) => setTwoFA(checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <span className="font-medium text-gray-700">
              IP Monitoring & Alerts
            </span>
            <Switch
              checked={ipGuard}
              onChange={(checked) => setIpGuard(checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <span className="font-medium text-gray-700">
              Require Transaction PIN
            </span>
            <Switch
              checked={pinEnabled}
              onChange={(checked) => setPinEnabled(checked)}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
