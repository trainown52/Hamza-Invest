"use client";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { Button } from "../../components/ui/button";
import { useState } from "react";

export default function NotificationsPage() {
  const [title, setTitle] = useState("");
  const [msg, setMsg] = useState("");

  return (
    <div className="space-y-8 p-4">
      <h1 className="text-2xl font-bold text-gray-800 tracking-tight">
        🔔 Notifications & Communication
      </h1>

      <Card className="shadow-md rounded-2xl border border-gray-200">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-700">
            Push Announcement
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-600">Title</label>
            <Input
            className="text-gray-700"
              placeholder="Enter notification title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-600">Message</label>
            <Textarea
              rows={6}
              className="text-gray-700"
              placeholder="Write your update…"
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
            />
          </div>

          <div className="flex gap-3 pt-2">
            <Button
              onClick={() => alert("Sent to all clients")}
              className="px-5 py-2 rounded-xl"
            >
              Send to All
            </Button>
            <Button
              variant="outline"
              onClick={() => alert("Preview")}
              className="px-5 py-2 rounded-xl"
            >
              Preview
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
