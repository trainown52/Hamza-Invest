import { Card, CardContent } from "../../components/ui/card";
import { cn } from "../../lib/utils";

interface StatCardProps {
  label: string;
  value: string | number;
  hint?: string;
  className?: string;
}

export default function StatCard({
  label,
  value,
  hint,
  className,
}: StatCardProps) {
  return (
    <Card className={cn("p-5", className)}>
      <div className="text-sm text-gray-500">{label}</div>
      <div className="mt-2 text-2xl font-bold">{value}</div>
      {hint && <div className="mt-1 text-xs text-gray-400">{hint}</div>}
    </Card>
  );
}