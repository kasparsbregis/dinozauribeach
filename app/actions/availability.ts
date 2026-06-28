"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { isValidTournamentDateKey, parseDateKey } from "@/lib/dates";
import { prisma } from "@/lib/prisma";

export async function updateInitials(initials: string) {
  const session = await auth();
  if (!session?.user?.email) {
    throw new Error("You must sign in first.");
  }

  const normalized = initials.trim().toUpperCase();
  if (!/^\p{L}{1,2}$/u.test(normalized)) {
    throw new Error("Initials must be 1–2 letters.");
  }

  await prisma.user.update({
    where: { email: session.user.email },
    data: { initials: normalized },
  });

  revalidatePath("/");
  revalidatePath("/overview");
}

export async function toggleAvailability(dateKey: string) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("You must sign in first.");
  }

  if (!isValidTournamentDateKey(dateKey)) {
    throw new Error("Invalid date.");
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { initials: true },
  });

  if (!user?.initials) {
    throw new Error("Set your initials before picking dates.");
  }

  const date = parseDateKey(dateKey);
  const existing = await prisma.availability.findUnique({
    where: {
      userId_date: {
        userId: session.user.id,
        date,
      },
    },
  });

  if (existing) {
    await prisma.availability.delete({ where: { id: existing.id } });
  } else {
    await prisma.availability.create({
      data: {
        userId: session.user.id,
        date,
      },
    });
  }

  revalidatePath("/");
  revalidatePath("/overview");
}

export async function getOverviewData() {
  const availability = await prisma.availability.findMany({
    include: {
      user: {
        select: {
          id: true,
          email: true,
          name: true,
          image: true,
          initials: true,
        },
      },
    },
    orderBy: { date: "asc" },
  });

  const byDate = new Map<
    string,
    Array<{
      id: string;
      email: string;
      name: string | null;
      image: string | null;
      initials: string | null;
    }>
  >();

  for (const entry of availability) {
    const dateKey = entry.date.toISOString().slice(0, 10);
    const players = byDate.get(dateKey) ?? [];
    players.push(entry.user);
    byDate.set(dateKey, players);
  }

  return byDate;
}

export async function getUserAvailability(userId: string) {
  const rows = await prisma.availability.findMany({
    where: { userId },
    select: { date: true },
  });

  return rows.map((row) => row.date.toISOString().slice(0, 10));
}
