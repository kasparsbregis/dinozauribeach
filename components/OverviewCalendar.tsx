import { Trophy, Users } from "lucide-react";
import {
  formatLatvianDisplayDate,
  getMonthGrid,
  getWeekdayLabels,
  isSelectableTournamentDate,
  TOURNAMENT_MONTHS,
  TOURNAMENT_YEAR,
} from "@/lib/dates";
import { lv } from "@/lib/i18n/lv";
import { PlayerInitialsBadge } from "@/components/PlayerInitialsBadge";
import { Card } from "@/components/ui/Card";

type OverviewPlayer = {
  id: string;
  email: string;
  name: string | null;
  image: string | null;
  initials: string | null;
};

type OverviewCalendarProps = {
  byDate: Record<string, OverviewPlayer[]>;
};

function availabilityColor(count: number, maxCount: number): string {
  if (count === 0) {
    return "#edeae3";
  }

  const ratio = maxCount > 0 ? count / maxCount : 0;
  const mix = Math.max(22, Math.round(ratio * 72));
  return `color-mix(in srgb, #5c7a45 ${mix}%, #f7f5f0)`;
}

function playerLabel(player: OverviewPlayer): string {
  return player.initials ?? player.name ?? player.email;
}

export function OverviewCalendar({ byDate }: OverviewCalendarProps) {
  const maxCount = Math.max(
    0,
    ...Object.values(byDate).map((players) => players.length),
  );

  return (
    <div className="flex flex-col gap-10">
      {TOURNAMENT_MONTHS.map((month) => (
        <MonthOverview
          key={month.index}
          label={month.label}
          monthIndex={month.index}
          byDate={byDate}
          maxCount={maxCount}
        />
      ))}
    </div>
  );
}

type MonthOverviewProps = {
  label: string;
  monthIndex: number;
  byDate: Record<string, OverviewPlayer[]>;
  maxCount: number;
};

function MonthOverview({
  label,
  monthIndex,
  byDate,
  maxCount,
}: MonthOverviewProps) {
  const weekdays = getWeekdayLabels();
  const cells = getMonthGrid(TOURNAMENT_YEAR, monthIndex);

  return (
    <Card className="p-4 sm:p-5 md:p-6">
      <h2 className="mb-4 font-[family-name:var(--font-outfit)] text-lg font-semibold text-forest sm:mb-5 sm:text-xl">
        {label} {TOURNAMENT_YEAR}
      </h2>

      <div className="-mx-1 overflow-x-auto px-1 pb-1 sm:mx-0 sm:overflow-visible sm:px-0 sm:pb-0">
        <div className="min-w-[18.5rem] sm:min-w-0">
          <div className="grid grid-cols-7 gap-1 text-center text-[11px] font-semibold text-muted sm:text-xs md:text-sm">
            {weekdays.map((day) => (
              <div key={day} className="py-1">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1 sm:gap-1.5 md:gap-2">
        {cells.map((cell, index) => {
          if (!cell.day || !cell.dateKey) {
            return <div key={`empty-${index}`} className="min-h-14 sm:min-h-24" />;
          }

          const players = byDate[cell.dateKey] ?? [];
          const isDisabledDate = !isSelectableTournamentDate(cell.dateKey);

          if (isDisabledDate) {
            return (
              <div
                key={cell.dateKey}
                aria-label={`${label} ${cell.day}, ${lv.picker.disabled}`}
                className="flex min-h-14 flex-col rounded-lg border border-sage-muted/40 bg-cream-dark/50 p-1.5 opacity-60 sm:min-h-24 sm:rounded-xl sm:p-2 md:min-h-28"
              >
                <span className="text-xs font-semibold text-muted/50 line-through sm:text-sm">
                  {cell.day}
                </span>
              </div>
            );
          }

          return (
            <div
              key={cell.dateKey}
              className="flex min-h-14 flex-col rounded-lg border border-sage-muted/70 p-1.5 sm:min-h-24 sm:rounded-xl sm:p-2 md:min-h-28"
              style={{ backgroundColor: availabilityColor(players.length, maxCount) }}
              title={
                players.length > 0
                  ? lv.overview.dateTooltip(
                      players.length,
                      players.map(playerLabel).join(", "),
                    )
                  : lv.overview.noOneAvailable
              }
            >
              <div className="flex items-start justify-between gap-1">
                <span className="text-xs font-semibold text-forest sm:text-sm">{cell.day}</span>
                {players.length > 0 && (
                  <span className="hidden rounded-full bg-surface/85 px-1.5 py-0.5 text-[10px] font-bold text-forest sm:inline-flex">
                    {players.length}
                  </span>
                )}
              </div>

              {players.length > 0 && (
                <div
                  className="flex flex-1 items-center justify-center sm:hidden"
                  aria-label={lv.overview.playersAvailable(players.length)}
                >
                  <span className="font-[family-name:var(--font-outfit)] text-xl font-bold text-forest">
                    {players.length}
                  </span>
                </div>
              )}

              <div className="mt-2 hidden flex-wrap gap-1 sm:flex">
                {players.map((player) => (
                  <PlayerInitialsBadge
                    key={player.id}
                    playerId={player.id}
                    email={player.email}
                    name={player.name}
                    initials={player.initials}
                    size="sm"
                  />
                ))}
              </div>
            </div>
          );
        })}
          </div>
        </div>
      </div>
    </Card>
  );
}

type BestDatesProps = {
  byDate: Record<string, OverviewPlayer[]>;
};

export function BestDatesPanel({ byDate }: BestDatesProps) {
  const ranked = Object.entries(byDate)
    .map(([dateKey, players]) => ({ dateKey, players, count: players.length }))
    .filter((entry) => entry.count > 0)
    .sort((a, b) => b.count - a.count || a.dateKey.localeCompare(b.dateKey))
    .slice(0, 5);

  if (ranked.length === 0) {
    return (
      <Card dashed>
        <div className="flex items-start gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sage-muted text-olive">
            <Users className="h-5 w-5" aria-hidden="true" />
          </span>
          <p className="text-sm leading-6 text-muted">{lv.overview.empty}</p>
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <div className="mb-4 flex items-center gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sage-muted text-olive">
          <Trophy className="h-5 w-5" aria-hidden="true" />
        </span>
        <h2 className="font-[family-name:var(--font-outfit)] text-xl font-semibold text-forest">
          {lv.overview.bestDates}
        </h2>
      </div>
      <ul className="space-y-3">
        {ranked.map((entry, index) => (
          <li
            key={entry.dateKey}
            className="flex flex-col gap-3 rounded-xl border border-sage-muted/70 bg-cream px-4 py-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-olive/15 font-[family-name:var(--font-outfit)] text-sm font-bold text-olive">
                {index + 1}
              </span>
            <div className="min-w-0 flex-1">
              <p className="font-semibold text-forest text-sm leading-snug sm:text-base">
                {formatLatvianDisplayDate(entry.dateKey)}
              </p>
                <p className="text-sm text-muted">
                  {lv.overview.playersAvailable(entry.count)}
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-1.5 pl-11 sm:pl-0">
              {entry.players.map((player) => (
                <PlayerInitialsBadge
                  key={player.id}
                  playerId={player.id}
                  email={player.email}
                  name={player.name}
                  initials={player.initials}
                  size="md"
                />
              ))}
            </div>
          </li>
        ))}
      </ul>
    </Card>
  );
}
