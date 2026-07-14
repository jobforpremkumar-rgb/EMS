import { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

type Variant = "primary" | "secondary" | "danger" | "reset";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
}

const variants = {
  primary: "bg-blue-600 text-white ",
  secondary: "px-8 py-2.5 rounded-lg bg-violet-600 hover:bg-violet-700 text-white text-sm font-semibold shadow-sm shadow-violet-200 transition active:scale-95",
  danger: "bg-red-600 text-white hover:bg-red-700",
  reset : "px-4 py-2 text-sm font-medium rounded-lg border bg-white border-slate-200 text-slate-600 hover:border-slate-300 transition-colors"
};

const sizes = {
  sm: "px-3 py-1 text-sm",
  md: "px-4 py-2",
  lg: "px-6 py-3 text-lg",
};

export default function Button({
  variant = "primary",
  size = "md",
  loading,
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(
        "rounded-lg font-medium transition disabled:opacity-50 cursor-pointer",
        variants[variant],
        sizes[size],
        className
      )}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading ? "Loading..." : children}
    </button>
  );
}