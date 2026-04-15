import Link from "next/link";
import { PageShell } from "@/components/shared/page-shell";
import { directoryPageButtonClasses } from "@/components/shared/directory-page-styles";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { mockTeamMembers } from "@/data/mock-data";
import { SITE_CONFIG } from "@/lib/site-config";
import { Building2, Compass, ShieldCheck, Sparkles, Target } from "lucide-react";

const milestones = [
  { year: "2024", title: "Directory foundation", body: "Launched a listing-first surface built for fast verification and clean metadata." },
  { year: "2025", title: "Trust-forward UX", body: "Tightened scan patterns, imagery, and contact paths so operators can compare businesses quickly." },
  { year: "2026", title: "Moon Rocket Coin", body: "Shipped the crimson-on-pale-pink identity you see today—distinct from generic SaaS templates." },
];

const pillars = [
  {
    icon: Target,
    title: "Clarity over noise",
    body: "Structured cards, predictable typography, and honest labels so the directory reads like a product—not a brochure.",
  },
  {
    icon: ShieldCheck,
    title: "Verification-minded",
    body: "Location, category, and contact cues are grouped so researchers can validate a business without hunting through fluff.",
  },
  {
    icon: Sparkles,
    title: "Built to scale",
    body: "The layout system supports more lanes later, but the homepage keeps listings in the lead where they belong.",
  },
];

export default function AboutPage() {
  const btn = directoryPageButtonClasses();

  return (
    <PageShell
      variant="directory"
      kicker="About"
      title={`The story behind ${SITE_CONFIG.name}`}
      description="We are a listing-first business discovery platform. Our goal is simple: help people find credible businesses, compare signals, and reach out with confidence."
      actions={
        <>
          <Link href="/team" className={btn.outline}>
            Meet the team
          </Link>
          <Link href="/contact" className={btn.primary}>
            Contact us
          </Link>
        </>
      }
    >
      <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
        <div className="rounded-3xl border border-black/10 bg-white p-8 shadow-[0_22px_56px_rgba(0,0,0,0.06)] sm:p-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-[#fff5f5] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-700">
            <Compass className="h-3.5 w-3.5 text-[#cf0f47]" />
            Mission
          </div>
          <h2 className="mt-5 text-3xl font-semibold tracking-[-0.04em] text-neutral-950">Directory craft, not generic feeds.</h2>
          <p className="mt-4 text-sm leading-7 text-neutral-600">
            {SITE_CONFIG.name} exists because business discovery should feel intentional. We bias toward structured entries, readable
            categories, and surfaces that respect the reader&apos;s time—whether they are researching vendors, venues, or local services.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-black/8 bg-[#fffafa] p-5 text-center">
              <div className="text-3xl font-semibold text-[#cf0f47]">12k+</div>
              <div className="mt-1 text-xs font-medium uppercase tracking-wider text-neutral-500">Signals indexed</div>
            </div>
            <div className="rounded-2xl border border-black/8 bg-[#fffafa] p-5 text-center">
              <div className="text-3xl font-semibold text-[#cf0f47]">180k</div>
              <div className="mt-1 text-xs font-medium uppercase tracking-wider text-neutral-500">Searches routed</div>
            </div>
            <div className="rounded-2xl border border-black/8 bg-[#fffafa] p-5 text-center">
              <div className="text-3xl font-semibold text-[#cf0f47]">8.6k</div>
              <div className="mt-1 text-xs font-medium uppercase tracking-wider text-neutral-500">Listings published</div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {pillars.map(({ icon: Icon, title, body }) => (
            <div key={title} className="rounded-3xl border border-black/10 bg-white p-6 shadow-[0_18px_48px_rgba(0,0,0,0.05)]">
              <div className="flex items-start gap-4">
                <span className="rounded-2xl border border-black/10 bg-[#fff5f5] p-3">
                  <Icon className="h-5 w-5 text-[#cf0f47]" />
                </span>
                <div>
                  <h3 className="text-lg font-semibold text-neutral-950">{title}</h3>
                  <p className="mt-2 text-sm leading-7 text-neutral-600">{body}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-14">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-neutral-500">Timeline</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-neutral-950">How we got here</h2>
          </div>
          <Link href="/press" className="text-sm font-semibold text-[#cf0f47] hover:underline">
            Press &amp; media
          </Link>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {milestones.map((m) => (
            <div key={m.year} className="rounded-3xl border border-black/10 bg-white p-6 shadow-[0_18px_48px_rgba(0,0,0,0.05)]">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#cf0f47]">{m.year}</span>
              <h3 className="mt-3 text-lg font-semibold text-neutral-950">{m.title}</h3>
              <p className="mt-2 text-sm leading-7 text-neutral-600">{m.body}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-16">
        <div className="mb-8 flex items-center gap-3">
          <Building2 className="h-5 w-5 text-[#cf0f47]" />
          <h2 className="text-3xl font-semibold tracking-[-0.04em] text-neutral-950">People behind the product</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {mockTeamMembers.map((member) => (
            <Card key={member.id} className="border-black/10 bg-white shadow-[0_18px_48px_rgba(0,0,0,0.05)]">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <Avatar className="h-14 w-14 border border-black/10">
                    <AvatarImage src={member.avatar} alt={member.name} />
                    <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-semibold text-neutral-950">{member.name}</p>
                    <p className="text-xs text-neutral-500">{member.role}</p>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-7 text-neutral-600">{member.bio}</p>
                <p className="mt-3 text-xs font-medium text-neutral-500">{member.location}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
