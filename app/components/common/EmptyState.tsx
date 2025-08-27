interface EmptyStateProps {
    title: string;
    subtitle?: string;
    action?: React.ReactNode;
  }
  
  export default function EmptyState({
    title,
    subtitle,
    action,
  }: EmptyStateProps) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center bg-white border border-dashed border-gray-300 rounded-2xl">
        <div className="text-lg font-semibold">{title}</div>
        {subtitle && <div className="mt-1 text-sm text-gray-500">{subtitle}</div>}
        {action && <div className="mt-6">{action}</div>}
      </div>
    );
  }