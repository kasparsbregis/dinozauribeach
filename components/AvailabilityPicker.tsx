"use client";

import { useTransition } from "react";
import { CalendarDays, Loader2 } from "lucide-react";
import { toggleAvailability } from "@/app/actions/availability";
import {
  getMonthGrid,
  getWeekdayLabels,
  TOURNAMENT_MONTHS,
  TOURNAMENT_YEAR,
} from "@/lib/dates";
import { Card } from "@/components/ui/Card";

type AvailabilityPickerProps = {
  selectedDates: string[];
};

export function AvailabilityPicker({ selectedDates }: AvailabilityPickerProps) {
  const [isPending, startTransition] = useTransition();
  const selected = new Set(selectedDates);

  return (
    <Card>
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sage-muted text-olive">
            <CalendarDays className="h-5 w-5" aria-hidden="true" />
          </span>
          <div>
            <h2 className="font-[family-name:var(--font-outfit)] text-xl font-semibold text-forest">
              Pick your dates
            </h2>
            <p className="mt-1 text-sm text-muted">
              Tap the days you can play in July and August {TOURNAMENT_YEAR}.
            </p>
          </div>
        </div>
        {isPending && (
          <span className="inline-flex items-center gap-1.5 text-sm font-medium text-olive">
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            Saving…
          </span>
        )}
      </div>

      <div className="mt-6 grid gap-8 lg:grid-cols-2">
        {TOURNAMENT_MONTHS.map((month) => (
          <MonthPicker
            key={month.index}
            label={month.label}
            monthIndex={month.index}
            selected={selected}
            disabled={isPending}
            onToggle={(dateKey) => {
              startTransition(async () => {
                await toggleAvailability(dateKey);
              });
            }}
          />
        ))}
      </div>
    </Card>
  );
}

type MonthPickerProps = {
  label: string;
  monthIndex: number;
  selected: Set<string>;
  disabled: boolean;
  onToggle: (dateKey: string) => void;
};

function MonthPicker({
  label,
  monthIndex,
  selected,
  disabled,
  onToggle,
}: MonthPickerProps) {
  const weekdays = getWeekdayLabels();
  const cells = getMonthGrid(TOURNAMENT_YEAR, monthIndex);

  return (
    <div>
      <h3 className="mb-3 font-[family-name:var(--font-outfit)] text-lg font-semibold text-forest">
        {label} {TOURNAMENT_YEAR}
      </h3>
      <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold text-muted">
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

          const isSelected = selected.has(cell.dateKey);

          return (
            <button
              key={cell.dateKey}
              type="button"
              disabled={disabled}
              aria-pressed={isSelected}
              aria-label={`${label} ${cell.day}, ${isSelected ? "available" : "not available"}`}
              onClick={() => onToggle(cell.dateKey!)}
              className={`aspect-square cursor-pointer rounded-xl text-sm font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-olive/40 disabled:cursor-not-allowed disabled:opacity-60 ${
                isSelected
                  ? "bg-olive text-cream shadow-sm hover:bg-olive-light"
                  : "bg-cream-dark text-forest hover:bg-sage-muted"
              }`}
            >
              {cell.day}
            </button>
          );
        })}
      </div>
    </div>
  );
}
