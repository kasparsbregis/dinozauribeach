import { createHash } from "crypto";

import { lv, TOURNAMENT_MONTHS_LV } from "@/lib/i18n/lv";

export const TOURNAMENT_YEAR = 2026;

export const TOURNAMENT_MONTHS = TOURNAMENT_MONTHS_LV;

export function formatDateKey(year: number, month: number, day: number): string {
  const monthPart = String(month + 1).padStart(2, "0");
  const dayPart = String(day).padStart(2, "0");
  return `${year}-${monthPart}-${dayPart}`;
}

/** Dates that cannot be selected for the tournament */
export const DISABLED_TOURNAMENT_DATES = new Set([
  formatDateKey(TOURNAMENT_YEAR, 7, 1),
  formatDateKey(TOURNAMENT_YEAR, 7, 2),
]);

export function parseDateKey(dateKey: string): Date {
  return new Date(`${dateKey}T12:00:00.000Z`);
}

export function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

export function getMonthLabel(monthIndex: number): string {
  return TOURNAMENT_MONTHS.find((month) => month.index === monthIndex)?.label ?? "";
}

export function isValidTournamentDateKey(dateKey: string): boolean {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(dateKey);
  if (!match) {
    return false;
  }

  const year = Number(match[1]);
  const month = Number(match[2]) - 1;
  const day = Number(match[3]);

  if (year !== TOURNAMENT_YEAR) {
    return false;
  }

  if (!TOURNAMENT_MONTHS.some((item) => item.index === month)) {
    return false;
  }

  const daysInMonth = getDaysInMonth(year, month);
  return day >= 1 && day <= daysInMonth;
}

export function isSelectableTournamentDate(dateKey: string): boolean {
  return isValidTournamentDateKey(dateKey) && !DISABLED_TOURNAMENT_DATES.has(dateKey);
}

export function getAvatarUrl(email: string, image?: string | null): string {
  if (image) {
    return image;
  }

  const hash = createHash("md5")
    .update(email.trim().toLowerCase())
    .digest("hex");

  return `https://www.gravatar.com/avatar/${hash}?d=identicon&s=80`;
}

export function getWeekdayLabels(): string[] {
  return [...lv.weekdays];
}

const MONTH_GENITIVE: Record<number, string> = {
  6: "jūlijs",
  7: "augusts",
};

export function formatLatvianDisplayDate(dateKey: string): string {
  const date = parseDateKey(dateKey);
  const weekdayIndex = (date.getUTCDay() + 6) % 7;
  const weekday = lv.weekdayNames[weekdayIndex];
  const day = date.getUTCDate();
  const month = date.getUTCMonth();
  const monthName = MONTH_GENITIVE[month] ?? "";

  return `${weekday}, ${day}. ${monthName}`;
}

export function getMonthGrid(year: number, month: number) {
  const daysInMonth = getDaysInMonth(year, month);
  const firstWeekday = (new Date(year, month, 1).getDay() + 6) % 7;
  const cells: Array<{ day: number | null; dateKey: string | null }> = [];

  for (let i = 0; i < firstWeekday; i++) {
    cells.push({ day: null, dateKey: null });
  }

  for (let day = 1; day <= daysInMonth; day++) {
    cells.push({
      day,
      dateKey: formatDateKey(year, month, day),
    });
  }

  while (cells.length % 7 !== 0) {
    cells.push({ day: null, dateKey: null });
  }

  return cells;
}
