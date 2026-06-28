import Image from "next/image";
import Link from "next/link";
import { lv } from "@/lib/i18n/lv";

type LogoProps = {
  size?: number;
  showText?: boolean;
  className?: string;
};

export function Logo({ size = 48, showText = true, className = "" }: LogoProps) {
  return (
    <Link
      href="/"
      className={`group flex min-w-0 cursor-pointer items-center gap-2.5 sm:gap-3 ${className}`}
    >
      <span
        className="relative shrink-0 overflow-hidden rounded-full ring-2 ring-sage-muted transition-colors duration-200 group-hover:ring-olive/40"
        style={{ width: size, height: size }}
      >
        <Image
          src="/dinozauri.webp"
          alt={lv.brand.logoAlt}
          width={size}
          height={size}
          className="h-full w-full object-cover"
          priority
        />
      </span>
      {showText && (
        <span className="min-w-0">
          <span className="block truncate font-[family-name:var(--font-outfit)] text-base font-bold tracking-tight text-forest sm:text-lg">
            {lv.brand.name}
          </span>
          <span className="hidden truncate text-sm text-muted sm:block">
            {lv.brand.tagline}
          </span>
        </span>
      )}
    </Link>
  );
}
