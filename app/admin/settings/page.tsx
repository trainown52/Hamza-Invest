"use client";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Switch } from "../../components/ui/switch";
import { useState } from "react";

export default function SettingsPage() {
  const [twoFA, setTwoFA] = useState(false);
  const [ipGuard, setIpGuard] = useState(false);
  const [pinEnabled, setPinEnabled] = useState(false);

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
              onCheckedChange={(checked) => setTwoFA(checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <span className="font-medium text-gray-700">
              IP Monitoring & Alerts
            </span>
            <Switch
              checked={ipGuard}
              onCheckedChange={(checked) => setIpGuard(checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <span className="font-medium text-gray-700">
              Require Transaction PIN
            </span>
            <Switch
              checked={pinEnabled}
              onCheckedChange={(checked) => setPinEnabled(checked)}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
