import { cn } from "../../lib/utils";
import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost";
}

export function Button({
  className,
  variant = "default",
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition border";
  const styles = {
    default: "bg-gray-900 text-white border-gray-900 hover:bg-gray-800",
    outline: "bg-white text-gray-900 border-gray-300 hover:bg-gray-50",
    ghost: "bg-transparent text-gray-700 border-transparent hover:bg-gray-100",
  }[variant];

  return <button className={cn(base, styles, className)} {...props} />;
}