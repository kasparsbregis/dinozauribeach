import Image from "next/image";
import { getAvatarUrl } from "@/lib/dates";

type UserAvatarProps = {
  email: string;
  name?: string | null;
  image?: string | null;
  initials?: string | null;
  size?: number;
  className?: string;
};

export function UserAvatar({
  email,
  name,
  image,
  initials,
  size = 32,
  className = "",
}: UserAvatarProps) {
  const label = initials ?? name?.slice(0, 2).toUpperCase() ?? "?";

  return (
    <span
      className={`relative inline-flex shrink-0 overflow-hidden rounded-full ring-2 ring-surface ${className}`}
      style={{ width: size, height: size }}
      title={`${name ?? email}${initials ? ` (${initials})` : ""}`}
    >
      <Image
        src={getAvatarUrl(email, image)}
        alt={label}
        width={size}
        height={size}
        className="h-full w-full object-cover"
      />
    </span>
  );
}
