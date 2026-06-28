import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "outline";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  children: ReactNode;
};

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-olive text-cream hover:bg-olive-light focus-visible:ring-olive/40",
  secondary:
    "bg-forest text-cream hover:bg-forest-deep focus-visible:ring-forest/40",
  ghost:
    "bg-transparent text-forest hover:bg-sage-muted focus-visible:ring-olive/30",
  outline:
    "border border-sage-muted bg-surface text-forest hover:bg-sage-muted/60 focus-visible:ring-olive/30",
};

export function Button({
  variant = "primary",
  className = "",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`inline-flex cursor-pointer items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
