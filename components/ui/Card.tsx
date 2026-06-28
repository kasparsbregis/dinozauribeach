import type { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  className?: string;
  dashed?: boolean;
};

export function Card({ children, className = "", dashed = false }: CardProps) {
  return (
    <section
      className={`rounded-2xl border bg-surface p-4 shadow-[0_1px_3px_rgba(27,61,47,0.08)] sm:p-6 ${
        dashed ? "border-dashed border-sage-muted bg-surface/80" : "border-sage-muted/80"
      } ${className}`}
    >
      {children}
    </section>
  );
}
