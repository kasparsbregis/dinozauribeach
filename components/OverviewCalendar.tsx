import { Trophy, Users } from "lucide-react";
import {
  getMonthGrid,
  getWeekdayLabels,
  TOURNAMENT_MONTHS,
  TOURNAMENT_YEAR,
} from "@/lib/dates";
import { UserAvatar } from "@/components/UserAvatar";
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

export function OverviewCalendar({ byDate }: OverviewCalendarProps) {
  const maxCount = Math.max(
    0,
    ...Object.values(byDate).map((players) => players.length),
  );

  return (
    <div className="grid gap-8 lg:grid-cols-2">
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
    <Card className="p-5">
      <h2 className="mb-4 font-[family-name:var(--font-outfit)] text-lg font-semibold text-forest">
        {label} {TOURNAMENT_YEAR}
      </h2>

      <div className="grid grid-cols-7 gap-1 text-center text-[11px] font-semibold text-muted">
        {weekdays.map((day) => (
          <div key={day} className="py-1">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {cells.map((cell, index) => {
          if (!cell.day || !cell.dateKey) {
            return <div key={`empty-${index}`} className="aspect-square" />;
          }

          const players = byDate[cell.dateKey] ?? [];

          return (
            <div
              key={cell.dateKey}
              className="aspect-square rounded-xl border border-sage-muted/70 p-1"
              style={{ backgroundColor: availabilityColor(players.length, maxCount) }}
              title={
                players.length > 0
                  ? `${players.length} available: ${players
                      .map((player) => player.initials ?? player.name ?? player.email)
                      .join(", ")}`
                  : "No one available"
              }
            >
              <div className="flex items-start justify-between gap-1">
                <span className="text-[11px] font-semibold text-forest">
                  {cell.day}
                </span>
                {players.length > 0 && (
                  <span className="rounded-full bg-surface/85 px-1 text-[10px] font-bold text-forest">
                    {players.length}
                  </span>
                )}
              </div>

              <div className="mt-1 flex flex-wrap gap-0.5">
                {players.slice(0, 4).map((player) => (
                  <UserAvatar
                    key={player.id}
                    email={player.email}
                    name={player.name}
                    image={player.image}
                    initials={player.initials}
                    size={18}
                  />
                ))}
                {players.length > 4 && (
                  <span className="inline-flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-forest px-1 text-[9px] font-bold text-cream">
                    +{players.length - 4}
                  </span>
                )}
              </div>
            </div>
          );
        })}
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
          <p className="text-sm leading-6 text-muted">
            No availability submitted yet. Once players pick dates, the best options
            will show up here.
          </p>
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
          Best dates so far
        </h2>
      </div>
      <ul className="space-y-3">
        {ranked.map((entry, index) => (
          <li
            key={entry.dateKey}
            className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-sage-muted/70 bg-cream px-4 py-3"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-olive/15 font-[family-name:var(--font-outfit)] text-sm font-bold text-olive">
                {index + 1}
              </span>
              <div>
                <p className="font-semibold text-forest">{entry.dateKey}</p>
                <p className="text-sm text-muted">
                  {entry.count} player{entry.count === 1 ? "" : "s"} available
                </p>
              </div>
            </div>
            <div className="flex -space-x-2">
              {entry.players.map((player) => (
                <UserAvatar
                  key={player.id}
                  email={player.email}
                  name={player.name}
                  image={player.image}
                  initials={player.initials}
                  size={28}
                />
              ))}
            </div>
          </li>
        ))}
      </ul>
    </Card>
  );
}
