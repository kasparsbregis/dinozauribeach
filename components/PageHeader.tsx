import type { ReactNode } from "react";

type PageHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: ReactNode;
};

export function PageHeader({ eyebrow, title, description }: PageHeaderProps) {
  return (
    <header className="space-y-2">
      {eyebrow && (
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-olive sm:tracking-[0.22em]">
          {eyebrow}
        </p>
      )}
      <h1 className="font-[family-name:var(--font-outfit)] text-2xl font-bold tracking-tight text-forest sm:text-4xl lg:text-[2.75rem] lg:leading-tight">
        {title}
      </h1>
      {description && (
        <p className="max-w-2xl text-sm leading-6 text-muted sm:text-base sm:leading-7">
          {description}
        </p>
      )}
    </header>
  );
}
