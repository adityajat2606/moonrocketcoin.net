import Link from "next/link";
import { PageShell } from "@/components/shared/page-shell";
import { directoryPageButtonClasses } from "@/components/shared/directory-page-styles";
import { Activity, CheckCircle2, Clock, Server } from "lucide-react";

const services = [
  { name: "Directory web app", detail: "SSR, navigation, listing pages", status: "Operational" as const },
  { name: "Search & filters", detail: "Category + keyword queries", status: "Operational" as const },
  { name: "Media delivery", detail: "Images & thumbnails", status: "Operational" as const },
  { name: "Auth & sessions", detail: "Sign-in and dashboard", status: "Operational" as const },
];

const incidents = [
  { date: "Mar 12, 2026", title: "Delayed notification digests", detail: "Email provider queue backlog; mitigated by scaling workers.", status: "Resolved" as const },
  { date: "Feb 22, 2026", title: "Search indexing lag", detail: "Temporary lag after bulk listing import; caches warmed.", status: "Resolved" as const },
  { date: "Jan 08, 2026", title: "Partial CDN degradation", detail: "Third-party edge provider; traffic rerouted within 22 minutes.", status: "Resolved" as const },
];

export default function StatusPage() {
  const btn = directoryPageButtonClasses();

  return (
    <PageShell
      variant="directory"
      kicker="Systems"
      title="Platform status"
      description="Live snapshot of core surfaces that power the Moon Rocket Coin directory. We post incidents here when they affect discovery, sign-in, or publishing."
      actions={
        <Link href="/contact" className={btn.outline}>
          Report an issue
        </Link>
      }
    >
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {services.map((s) => (
          <div key={s.name} className="rounded-3xl border border-black/10 bg-white p-6 shadow-[0_18px_48px_rgba(0,0,0,0.05)]">
            <div className="flex items-center justify-between gap-2">
              <Server className="h-5 w-5 text-[#cf0f47]" />
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-emerald-800">
                <CheckCircle2 className="h-3.5 w-3.5" />
                {s.status}
              </span>
            </div>
            <h2 className="mt-4 text-lg font-semibold text-neutral-950">{s.name}</h2>
            <p className="mt-2 text-sm text-neutral-600">{s.detail}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="rounded-3xl border border-black/10 bg-[linear-gradient(180deg,#fff5f5_0%,#ffffff_100%)] p-8 shadow-[0_22px_56px_rgba(0,0,0,0.06)]">
          <div className="flex items-center gap-2 text-neutral-950">
            <Activity className="h-5 w-5 text-[#cf0f47]" />
            <h2 className="text-xl font-semibold">Current period</h2>
          </div>
          <p className="mt-4 text-4xl font-semibold tracking-tight text-neutral-950">99.95%</p>
          <p className="mt-2 text-sm text-neutral-600">Rolling 90-day availability across monitored components (internal SLO).</p>
          <div className="mt-6 flex items-center gap-2 text-sm text-neutral-600">
            <Clock className="h-4 w-4 text-[#cf0f47]" />
            Last reviewed April 15, 2026
          </div>
        </div>

        <div className="rounded-3xl border border-black/10 bg-white p-8 shadow-[0_22px_56px_rgba(0,0,0,0.06)]">
          <h2 className="text-xl font-semibold text-neutral-950">Incident history</h2>
          <p className="mt-2 text-sm text-neutral-600">Notable events from the last quarter. Subscribe to updates via the contact page.</p>
          <ul className="mt-6 space-y-4">
            {incidents.map((incident) => (
              <li key={incident.title} className="rounded-2xl border border-black/8 bg-[#fffafa] px-4 py-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-semibold uppercase tracking-wide text-neutral-500">{incident.date}</span>
                  <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-800">{incident.status}</span>
                </div>
                <p className="mt-2 text-sm font-semibold text-neutral-950">{incident.title}</p>
                <p className="mt-1 text-sm text-neutral-600">{incident.detail}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </PageShell>
  );
}
