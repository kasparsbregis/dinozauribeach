"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { appNavLinks } from "@/lib/navigation";

export function PageTabs({ signedIn }: { signedIn: boolean }) {
  const pathname = usePathname();

  if (!signedIn) {
    return null;
  }

  return (
    <nav
      aria-label="Lapas navigācija"
      className="mb-6 sm:hidden"
    >
      <div className="flex rounded-2xl border border-sage-muted/80 bg-cream-dark/60 p-1">
        {appNavLinks.map((link) => {
          const active = pathname === link.href;

          return (
            <Link
              key={link.href}
              href={link.href}
              aria-current={active ? "page" : undefined}
              className={`flex min-h-11 flex-1 cursor-pointer items-center justify-center rounded-xl px-3 py-2 text-center text-sm font-semibold transition-colors duration-200 ${
                active
                  ? "bg-surface text-forest shadow-[0_1px_3px_rgba(27,61,47,0.08)]"
                  : "text-muted hover:text-forest"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
