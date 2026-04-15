import Link from "next/link";
import { PageShell } from "@/components/shared/page-shell";
import { directoryPageButtonClasses } from "@/components/shared/directory-page-styles";

const rows = [
  {
    name: "Session & authentication",
    purpose: "Keeps you signed in securely and prevents cross-site request issues for dashboard actions.",
    duration: "Session or up to 30 days when “remember me” is used.",
  },
  {
    name: "Preferences",
    purpose: "Stores UI choices such as theme or filter defaults so pages load consistently.",
    duration: "Up to 12 months.",
  },
  {
    name: "Analytics (aggregated)",
    purpose: "Helps us understand which surfaces are used and where performance tuning matters.",
    duration: "Up to 24 months in aggregated form.",
  },
];

const sections = [
  {
    title: "What are cookies?",
    body: "Cookies are small text files stored on your device. We use cookies and similar technologies (such as local storage) to operate authentication, remember preferences, and measure product health.",
  },
  {
    title: "Managing cookies",
    body: "You can control cookies through browser settings. Blocking essential cookies may prevent sign-in or security features from working correctly.",
  },
  {
    title: "Updates",
    body: "When our practices change, we will update this page and revise the “last updated” date below.",
  },
];

export default function CookiesPage() {
  const btn = directoryPageButtonClasses();

  return (
    <PageShell
      variant="directory"
      kicker="Legal"
      title="Cookie policy"
      description="Transparent breakdown of how Moon Rocket Coin uses cookies and similar technologies across the directory."
      actions={
        <Link href="/privacy" className={btn.outline}>
          Full privacy policy
        </Link>
      }
    >
      <p className="text-sm font-medium text-neutral-500">Last updated: April 15, 2026</p>

      <div className="mt-10 overflow-hidden rounded-3xl border border-black/10 bg-white shadow-[0_22px_56px_rgba(0,0,0,0.06)]">
        <div className="grid grid-cols-12 gap-0 border-b border-black/10 bg-[#fff5f5] px-5 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-neutral-600 sm:px-6">
          <div className="col-span-12 sm:col-span-3">Cookie</div>
          <div className="col-span-12 mt-2 sm:col-span-5 sm:mt-0">Purpose</div>
          <div className="col-span-12 mt-2 sm:col-span-4 sm:mt-0">Duration</div>
        </div>
        {rows.map((row) => (
          <div key={row.name} className="grid grid-cols-12 gap-0 border-b border-black/8 px-5 py-5 last:border-b-0 sm:px-6">
            <div className="col-span-12 text-sm font-semibold text-neutral-950 sm:col-span-3">{row.name}</div>
            <div className="col-span-12 mt-2 text-sm leading-7 text-neutral-600 sm:col-span-5 sm:mt-0">{row.purpose}</div>
            <div className="col-span-12 mt-2 text-sm text-neutral-600 sm:col-span-4 sm:mt-0">{row.duration}</div>
          </div>
        ))}
      </div>

      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {sections.map((s) => (
          <div key={s.title} className="rounded-3xl border border-black/10 bg-white p-7 shadow-[0_18px_48px_rgba(0,0,0,0.05)]">
            <h2 className="text-lg font-semibold text-neutral-950">{s.title}</h2>
            <p className="mt-3 text-sm leading-7 text-neutral-600">{s.body}</p>
          </div>
        ))}
      </div>
    </PageShell>
  );
}
