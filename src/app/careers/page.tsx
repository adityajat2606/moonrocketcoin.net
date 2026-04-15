import Link from "next/link";
import { PageShell } from "@/components/shared/page-shell";
import { directoryPageButtonClasses } from "@/components/shared/directory-page-styles";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SITE_CONFIG } from "@/lib/site-config";
import { Clock, Heart, Laptop, MapPin, Users } from "lucide-react";

const roles = [
  { title: "Senior Frontend Engineer", location: "Remote (US/EU overlap)", type: "Full-time", level: "Senior", focus: "Next.js, design systems, performance." },
  { title: "Product Designer", location: "Remote", type: "Full-time", level: "Mid", focus: "Directory UX, research, prototyping." },
  { title: "Developer Advocate", location: "Hybrid — NYC", type: "Full-time", level: "Mid", focus: "Docs, examples, partner integrations." },
];

const principles = [
  { icon: Users, title: "Small teams, sharp ownership", body: "You will ship end-to-end slices—not tickets lost in a backlog." },
  { icon: Laptop, title: "Remote-first rhythm", body: "Async by default with predictable collaboration windows." },
  { icon: Heart, title: "Craft is the default", body: "We polish typography, motion, and accessibility—not just pixels." },
];

const benefits = [
  "Competitive salary and meaningful equity",
  "Medical, dental, and vision for you and dependents",
  "$2.5k annual learning budget",
  "Quarterly in-person team weeks",
  "Home office stipend and ergonomic budget",
];

export default function CareersPage() {
  const btn = directoryPageButtonClasses();

  return (
    <PageShell
      variant="directory"
      kicker="Careers"
      title="Build the directory people trust"
      description={`Join ${SITE_CONFIG.name} and help shape a calmer, faster way to discover businesses—without the noise of generic marketplaces.`}
      actions={
        <Link href="/contact" className={btn.primary}>
          Start a conversation
        </Link>
      }
    >
      <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="space-y-5">
          {roles.map((role) => (
            <div
              key={role.title}
              className="rounded-3xl border border-black/10 bg-white p-7 shadow-[0_22px_56px_rgba(0,0,0,0.06)] transition hover:border-[#cf0f47]/25"
            >
              <div className="flex flex-wrap items-center gap-2">
                <Badge className="rounded-full border border-black/10 bg-[#fff5f5] text-neutral-900">{role.level}</Badge>
                <Badge variant="outline" className="rounded-full border-black/15">
                  {role.type}
                </Badge>
              </div>
              <h2 className="mt-4 text-xl font-semibold tracking-[-0.02em] text-neutral-950">{role.title}</h2>
              <p className="mt-2 flex items-center gap-2 text-sm text-neutral-600">
                <MapPin className="h-4 w-4 shrink-0 text-[#cf0f47]" />
                {role.location}
              </p>
              <p className="mt-3 text-sm leading-7 text-neutral-600">{role.focus}</p>
              <Link href="/contact" className={`mt-5 inline-flex ${btn.outline}`}>
                Discuss this role
              </Link>
            </div>
          ))}
        </div>

        <div className="space-y-6">
          <div className="rounded-3xl border border-black/10 bg-white p-7 shadow-[0_22px_56px_rgba(0,0,0,0.06)]">
            <h3 className="text-lg font-semibold text-neutral-950">How we work</h3>
            <div className="mt-5 space-y-5">
              {principles.map(({ icon: Icon, title, body }) => (
                <div key={title} className="flex gap-4">
                  <span className="rounded-2xl border border-black/10 bg-[#fff5f5] p-2.5">
                    <Icon className="h-5 w-5 text-[#cf0f47]" />
                  </span>
                  <div>
                    <p className="font-semibold text-neutral-950">{title}</p>
                    <p className="mt-1 text-sm leading-7 text-neutral-600">{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Card className="border-black/10 bg-[linear-gradient(180deg,#fffafa_0%,#ffffff_100%)] shadow-[0_18px_48px_rgba(0,0,0,0.05)]">
            <CardContent className="p-7">
              <div className="flex items-center gap-2 text-neutral-950">
                <Clock className="h-5 w-5 text-[#cf0f47]" />
                <h3 className="text-lg font-semibold">Benefits &amp; support</h3>
              </div>
              <ul className="mt-5 space-y-3 text-sm leading-7 text-neutral-600">
                {benefits.map((b) => (
                  <li key={b} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#cf0f47]" />
                    {b}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageShell>
  );
}
