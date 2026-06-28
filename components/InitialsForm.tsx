"use client";

import { useTransition } from "react";
import { UserRound } from "lucide-react";
import { updateInitials } from "@/app/actions/availability";
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
            Set your initials
          </h2>
          <p className="mt-2 text-sm leading-6 text-muted">
            {userName ? (
              <>
                Welcome, <span className="font-medium text-forest">{userName}</span>.
                Use up to 2 letters — e.g. Jānis Bērziņš →{" "}
                <strong className="text-forest">JB</strong>.
              </>
            ) : (
              <>Use up to 2 letters so others can spot you on the calendar.</>
            )}
          </p>

          <form
            className="mt-5 flex flex-wrap items-end gap-3"
            action={(formData) => {
              startTransition(async () => {
                await updateInitials(formData.get("initials")?.toString() ?? "");
              });
            }}
          >
            <label className="flex flex-col gap-1.5 text-sm font-medium text-forest">
              Initials
              <input
                name="initials"
                defaultValue={defaultValue ?? ""}
                maxLength={2}
                placeholder="JB"
                className="w-24 cursor-text rounded-xl border border-sage-muted bg-cream px-3 py-2.5 text-center text-lg uppercase tracking-widest text-forest outline-none transition-colors duration-200 focus:border-olive focus:ring-2 focus:ring-olive/25"
                autoComplete="off"
                required
              />
            </label>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Saving…" : "Save initials"}
            </Button>
          </form>
        </div>
      </div>
    </Card>
  );
}
