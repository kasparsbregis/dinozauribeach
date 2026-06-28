import { getOverviewData } from "@/app/actions/availability";
import {
  BestDatesPanel,
  OverviewCalendar,
} from "@/components/OverviewCalendar";
import { PageHeader } from "@/components/PageHeader";

export const dynamic = "force-dynamic";

export default async function OverviewPage() {
  const byDateMap = await getOverviewData();
  const byDate = Object.fromEntries(byDateMap);

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 sm:px-6">
      <PageHeader
        eyebrow="Group view"
        title="Group availability"
        description="Deeper green days mean more players are free. Avatars show who picked each date — use this to pick the best tournament day."
      />

      <BestDatesPanel byDate={byDate} />
      <OverviewCalendar byDate={byDate} />
    </div>
  );
}
