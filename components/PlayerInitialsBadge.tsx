import { getPlayerColor } from "@/lib/player-colors";

type PlayerInitialsBadgeProps = {
  playerId: string;
  initials?: string | null;
  name?: string | null;
  email: string;
  size?: "sm" | "md";
  className?: string;
};

const sizeClasses = {
  sm: "h-7 min-w-7 px-1 text-[10px]",
  md: "h-9 min-w-9 px-1.5 text-xs",
};

function getLabel(
  initials?: string | null,
  name?: string | null,
  email?: string,
): string {
  if (initials) {
    return initials;
  }

  if (name) {
    return name.slice(0, 2).toUpperCase();
  }

  return email?.slice(0, 2).toUpperCase() ?? "??";
}

export function PlayerInitialsBadge({
  playerId,
  initials,
  name,
  email,
  size = "sm",
  className = "",
}: PlayerInitialsBadgeProps) {
  const label = getLabel(initials, name, email);
  const colors = getPlayerColor(playerId);

  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center rounded-full font-bold uppercase tracking-wide ring-2 ring-surface ${sizeClasses[size]} ${className}`}
      style={{ backgroundColor: colors.bg, color: colors.text }}
      title={name ?? email}
    >
      {label}
    </span>
  );
}
