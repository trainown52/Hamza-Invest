"use client";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import EmptyState from "../../components/common/EmptyState";
import { Button } from "../../components/ui/button";

export default function DocumentsPage() {
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
