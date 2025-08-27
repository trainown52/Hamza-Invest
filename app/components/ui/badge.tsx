interface BadgeProps {
    children: React.ReactNode;
    intent?: "default" | "success" | "warning" | "danger";
  }
  
  export function Badge({ children, intent = "default" }: BadgeProps) {
    const map = {
      default: "bg-gray-100 text-gray-700",
      success: "bg-green-100 text-green-700",
      warning: "bg-amber-100 text-amber-700",
      danger: "bg-red-100 text-red-700",
    }[intent];
  
    return (
      <span
        className={`px-2 py-1 rounded-lg text-xs font-medium ${map}`}
      >
        {children}
      </span>
    );
  }