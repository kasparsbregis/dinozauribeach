import Image from "next/image";
import { CalendarCheck2 } from "lucide-react";
import { auth, signIn } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getUserAvailability } from "@/app/actions/availability";
import { InitialsForm } from "@/components/InitialsForm";
import { AvailabilityPicker } from "@/components/AvailabilityPicker";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export const dynamic = "force-dynamic";

function GoogleIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}

export default async function HomePage() {
  const session = await auth();

  if (!session?.user) {
    return (
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <section className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
          <div className="order-2 lg:order-1">
            <PageHeader
              eyebrow="Beach volleyball"
              title="Find the best tournament date"
              description={
                <>
                  Sign in with Google, set your initials, and mark when you can play
                  in July or August. Everyone can then see which dates work best for
                  the group.
                </>
              }
            />

            <ul className="mt-8 space-y-3 text-sm text-muted">
              <li className="flex items-center gap-2">
                <CalendarCheck2 className="h-4 w-4 shrink-0 text-olive" aria-hidden="true" />
                Pick your free days on a shared calendar
              </li>
              <li className="flex items-center gap-2">
                <CalendarCheck2 className="h-4 w-4 shrink-0 text-olive" aria-hidden="true" />
                See who is available on each date
              </li>
              <li className="flex items-center gap-2">
                <CalendarCheck2 className="h-4 w-4 shrink-0 text-olive" aria-hidden="true" />
                Lock in the day with the most players
              </li>
            </ul>

            <form
              className="mt-8"
              action={async () => {
                "use server";
                await signIn("google");
              }}
            >
              <Button type="submit" className="px-6 py-3">
                <GoogleIcon />
                Sign in with Google
              </Button>
            </form>
          </div>

          <Card className="order-1 flex flex-col items-center justify-center bg-gradient-to-br from-sage-muted/70 via-surface to-cream py-10 lg:order-2">
            <div className="relative">
              <div className="absolute inset-0 scale-110 rounded-full bg-olive/10 blur-2xl" aria-hidden="true" />
              <Image
                src="/dinozauri.webp"
                alt="Dinozauri Beach mascot holding a volleyball"
                width={280}
                height={280}
                className="relative rounded-full ring-4 ring-sage-muted shadow-[0_8px_30px_rgba(27,61,47,0.12)]"
                priority
              />
            </div>
            <p className="mt-6 max-w-xs text-center text-sm leading-6 text-muted">
              Eight players. One perfect beach day. Let the dino help you find it.
            </p>
          </Card>
        </section>
      </div>
    );
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email! },
  });

  const selectedDates = user ? await getUserAvailability(user.id) : [];

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 sm:px-6">
      <PageHeader
        eyebrow="Your schedule"
        title="My availability"
        description={
          <>
            Signed in as{" "}
            <span className="font-medium text-forest">
              {session.user.name ?? session.user.email}
            </span>
            {user?.initials ? ` (${user.initials})` : ""}.
          </>
        }
      />

      <InitialsForm defaultValue={user?.initials} userName={session.user.name} />

      {user?.initials ? (
        <AvailabilityPicker selectedDates={selectedDates} />
      ) : (
        <Card dashed>
          <p className="text-sm leading-6 text-muted">
            Save your initials first, then you can pick the dates you are free.
          </p>
        </Card>
      )}
    </div>
  );
}
