"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "My dates" },
  { href: "/overview", label: "Overview" },
];

export function NavLinks() {
  const pathname = usePathname();

  return (
    <>
      {links.map((link) => {
        const active = pathname === link.href;

        return (
          <Link
            key={link.href}
            href={link.href}
            className={`cursor-pointer rounded-full px-3 py-1.5 font-medium transition-colors duration-200 ${
              active
                ? "bg-sage-muted text-forest"
                : "text-muted hover:bg-sage-muted/70 hover:text-forest"
            }`}
          >
            {link.label}
          </Link>
        );
      })}
    </>
  );
}
