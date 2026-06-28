import { auth } from "@/lib/auth";
import { PageTabs } from "@/components/PageTabs";

export async function ConditionalPageTabs() {
  const session = await auth();

  return <PageTabs signedIn={Boolean(session?.user)} />;
}
