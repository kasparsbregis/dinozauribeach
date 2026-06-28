import { lv } from "@/lib/i18n/lv";

export const appNavLinks = [
  { href: "/", label: lv.nav.myDates },
  { href: "/overview", label: lv.nav.overview },
] as const;
