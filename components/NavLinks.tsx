"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { appNavLinks } from "@/lib/navigation";

export function NavLinks() {
  const pathname = usePathname();

  return (
    <div className="hidden items-center gap-2 sm:flex">
      {appNavLinks.map((link) => {
        const active = pathname === link.href;

        return (
          <Link
            key={link.href}
            href={link.href}
            className={`cursor-pointer rounded-full px-3 py-1.5 text-sm font-medium transition-colors duration-200 ${
              active
                ? "bg-sage-muted text-forest"
                : "text-muted hover:bg-sage-muted/70 hover:text-forest"
            }`}
          >
            {link.label}
          </Link>
        );
      })}
    </div>
  );
}
