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
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-olive">
          {eyebrow}
        </p>
      )}
      <h1 className="font-[family-name:var(--font-outfit)] text-3xl font-bold tracking-tight text-forest sm:text-4xl">
        {title}
      </h1>
      {description && (
        <p className="max-w-2xl text-base leading-7 text-muted">{description}</p>
      )}
    </header>
  );
}
