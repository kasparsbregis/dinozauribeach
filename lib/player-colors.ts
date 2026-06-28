const PLAYER_COLORS = [
  { bg: "#1b3d2f", text: "#f7f5f0" },
  { bg: "#5c7a45", text: "#f7f5f0" },
  { bg: "#2f6b5e", text: "#f7f5f0" },
  { bg: "#6d8f52", text: "#f7f5f0" },
  { bg: "#3d5a80", text: "#f7f5f0" },
  { bg: "#8b6914", text: "#f7f5f0" },
  { bg: "#704214", text: "#f7f5f0" },
  { bg: "#4a6741", text: "#f7f5f0" },
] as const;

function hashString(value: string): number {
  let hash = 0;

  for (let i = 0; i < value.length; i++) {
    hash = (hash << 5) - hash + value.charCodeAt(i);
    hash |= 0;
  }

  return Math.abs(hash);
}

export function getPlayerColor(playerId: string) {
  const index = hashString(playerId) % PLAYER_COLORS.length;
  return PLAYER_COLORS[index];
}
