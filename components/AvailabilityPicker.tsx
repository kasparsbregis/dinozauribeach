"use client";

import { useTransition } from "react";
import { CalendarDays, Loader2 } from "lucide-react";
import { toggleAvailability } from "@/app/actions/availability";
import {
  getMonthGrid,
  getWeekdayLabels,
  isSelectableTournamentDate,
  TOURNAMENT_MONTHS,
  TOURNAMENT_YEAR,
} from "@/lib/dates";
import { lv } from "@/lib/i18n/lv";
import { Card } from "@/components/ui/Card";

type AvailabilityPickerProps = {
  selectedDates: string[];
};

export function AvailabilityPicker({ selectedDates }: AvailabilityPickerProps) {
  const [isPending, startTransition] = useTransition();
  const selected = new Set(selectedDates);

  return (
    <Card>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sage-muted text-olive">
            <CalendarDays className="h-5 w-5" aria-hidden="true" />
          </span>
          <div className="min-w-0">
            <h2 className="font-[family-name:var(--font-outfit)] text-lg font-semibold text-forest sm:text-xl">
              {lv.picker.title}
            </h2>
            <p className="mt-1 text-sm leading-6 text-muted">
              {lv.picker.description(TOURNAMENT_YEAR)}
            </p>
          </div>
        </div>
        {isPending && (
          <span className="inline-flex items-center gap-1.5 text-sm font-medium text-olive">
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            {lv.picker.saving}
          </span>
        )}
      </div>

      <div className="mt-6 flex flex-col gap-10">
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
    <div className="min-w-0">
      <h3 className="mb-4 font-[family-name:var(--font-outfit)] text-lg font-semibold text-forest sm:mb-5 sm:text-xl">
        {label} {TOURNAMENT_YEAR}
      </h3>

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
                return (
                  <div
                    key={`empty-${index}`}
                    className="min-h-[5.5rem] sm:min-h-24 md:min-h-28"
                  />
                );
              }

              const isSelected = selected.has(cell.dateKey);
              const isDisabledDate = !isSelectableTournamentDate(cell.dateKey);

              if (isDisabledDate) {
                return (
                  <div
                    key={cell.dateKey}
                    aria-label={`${label} ${cell.day}, ${lv.picker.disabled}`}
                    className="flex min-h-[5.5rem] flex-col rounded-lg border border-sage-muted/40 bg-cream-dark/50 p-1.5 opacity-60 sm:min-h-24 sm:rounded-xl sm:p-2 md:min-h-28"
                  >
                    <span className="text-xs font-semibold text-muted/50 line-through sm:text-sm">
                      {cell.day}
                    </span>
                  </div>
                );
              }

              return (
                <button
                  key={cell.dateKey}
                  type="button"
                  disabled={disabled}
                  aria-pressed={isSelected}
                  aria-label={`${label} ${cell.day}, ${isSelected ? lv.picker.available : lv.picker.notAvailable}`}
                  onClick={() => onToggle(cell.dateKey!)}
                  className={`flex min-h-[5.5rem] cursor-pointer touch-manipulation flex-col rounded-lg border p-1.5 text-left transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-olive/40 disabled:cursor-not-allowed disabled:opacity-60 sm:min-h-24 sm:rounded-xl sm:p-2 md:min-h-28 ${
                    isSelected
                      ? "border-olive bg-olive text-cream shadow-sm hover:bg-olive-light"
                      : "border-sage-muted/70 bg-cream-dark text-forest hover:bg-sage-muted active:bg-sage-muted"
                  }`}
                >
                  <span className="text-xs font-semibold sm:text-sm">{cell.day}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
