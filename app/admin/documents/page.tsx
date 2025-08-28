"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import EmptyState from "../../components/common/EmptyState";
import { Button } from "../../components/ui/button";

export default function DocumentsPage() {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

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
        📑 Document Center
      </h1>

      <Card className="shadow-md rounded-2xl border border-gray-200">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-700">
            Upload Reports & Policies
          </CardTitle>
        </CardHeader>
        <CardContent>
          <EmptyState
            title="No documents uploaded yet"
            subtitle="Upload audit reports, policies, and legal documents here."
            action={
              <Button className="px-5 py-2 rounded-xl">
                Upload Files
              </Button>
            }
          />
        </CardContent>
      </Card>
    </div>
  );
}
