import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { getOverviewData } from "@/app/actions/availability";
import {
  BestDatesPanel,
  OverviewCalendar,
} from "@/components/OverviewCalendar";
import { PageHeader } from "@/components/PageHeader";
import { lv } from "@/lib/i18n/lv";

export const dynamic = "force-dynamic";

export default async function OverviewPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/");
  }

  const byDateMap = await getOverviewData();
  const byDate = Object.fromEntries(byDateMap);

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
      <PageHeader
        eyebrow={lv.overview.eyebrow}
        title={lv.overview.title}
        description={lv.overview.description}
      />

      <BestDatesPanel byDate={byDate} />
      <OverviewCalendar byDate={byDate} />
    </div>
  );
}
