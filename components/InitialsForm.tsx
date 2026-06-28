"use client";

import { useTransition } from "react";
import { UserRound } from "lucide-react";
import { updateInitials } from "@/app/actions/availability";
import { lv } from "@/lib/i18n/lv";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

type InitialsFormProps = {
  defaultValue?: string | null;
  userName?: string | null;
};

export function InitialsForm({ defaultValue, userName }: InitialsFormProps) {
  const [isPending, startTransition] = useTransition();

  return (
    <Card>
      <div className="flex items-start gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sage-muted text-olive">
          <UserRound className="h-5 w-5" aria-hidden="true" />
        </span>
        <div className="min-w-0 flex-1">
          <h2 className="font-[family-name:var(--font-outfit)] text-xl font-semibold text-forest">
            {lv.initials.title}
          </h2>
          <p className="mt-2 text-sm leading-6 text-muted">
            {userName ? (
              <>
                {lv.initials.welcome(userName)}
                <strong className="text-forest">JB</strong>.
              </>
            ) : (
              lv.initials.hint
            )}
          </p>

          <form
            className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-end"
            action={(formData) => {
              startTransition(async () => {
                await updateInitials(formData.get("initials")?.toString() ?? "");
              });
            }}
          >
            <label className="flex flex-col gap-1.5 text-sm font-medium text-forest">
              {lv.initials.label}
              <input
                name="initials"
                defaultValue={defaultValue ?? ""}
                maxLength={2}
                placeholder={lv.initials.placeholder}
                className="h-12 w-full max-w-[6.5rem] cursor-text rounded-xl border border-sage-muted bg-cream px-3 py-2.5 text-center text-lg uppercase tracking-widest text-forest outline-none transition-colors duration-200 focus:border-olive focus:ring-2 focus:ring-olive/25 sm:h-auto sm:w-24"
                autoComplete="off"
                required
              />
            </label>
            <Button type="submit" disabled={isPending} className="w-full sm:w-auto">
              {isPending ? lv.initials.saving : lv.initials.save}
            </Button>
          </form>
        </div>
      </div>
    </Card>
  );
}
