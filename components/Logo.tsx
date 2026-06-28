import Image from "next/image";
import Link from "next/link";

type LogoProps = {
  size?: number;
  showText?: boolean;
  className?: string;
};

export function Logo({ size = 48, showText = true, className = "" }: LogoProps) {
  return (
    <Link
      href="/"
      className={`group flex cursor-pointer items-center gap-3 ${className}`}
    >
      <span
        className="relative shrink-0 overflow-hidden rounded-full ring-2 ring-sage-muted transition-colors duration-200 group-hover:ring-olive/40"
        style={{ width: size, height: size }}
      >
        <Image
          src="/dinozauri.webp"
          alt="Dinozauri Beach logo"
          width={size}
          height={size}
          className="h-full w-full object-cover"
          priority
        />
      </span>
      {showText && (
        <span className="min-w-0">
          <span className="block font-[family-name:var(--font-outfit)] text-lg font-bold tracking-tight text-forest">
            Dinozauri Beach
          </span>
          <span className="block text-sm text-muted">Volleyball tournament</span>
        </span>
      )}
    </Link>
  );
}
