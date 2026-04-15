import Link from "next/link";
import { PageShell } from "@/components/shared/page-shell";
import { directoryPageButtonClasses } from "@/components/shared/directory-page-styles";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { mockFaqs } from "@/data/mock-data";
import { BookOpen, ListChecks, Rocket, Search } from "lucide-react";

const guides = [
  {
    icon: Rocket,
    title: "Getting started",
    body: "Create your account, verify email, and publish your first listing with photos, category, and contact paths.",
  },
  {
    icon: ListChecks,
    title: "Listing quality",
    body: "Best practices for titles, descriptions, and structured fields so your business scans cleanly in the directory.",
  },
  {
    icon: Search,
    title: "Search & filters",
    body: "Use category filters and keyword search together to narrow results without losing context.",
  },
  {
    icon: BookOpen,
    title: "Policies & safety",
    body: "What belongs in the directory, how moderation works, and how to report inaccurate information.",
  },
];

export default function HelpPage() {
  const btn = directoryPageButtonClasses();

  return (
    <PageShell
      variant="directory"
      kicker="Help center"
      title="Answers for operators and researchers"
      description="Guides for publishing listings, improving discoverability, and using search the way the directory was designed—fast, structured, and calm."
      actions={
        <Link href="/contact" className={btn.primary}>
          Contact support
        </Link>
      }
    >
      <div className="rounded-3xl border border-black/10 bg-[linear-gradient(135deg,#fff5f5_0%,#ffffff_55%)] p-8 shadow-[0_22px_56px_rgba(0,0,0,0.06)] sm:p-10">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <div>
            <h2 className="text-2xl font-semibold tracking-[-0.03em] text-neutral-950">Still stuck after reading?</h2>
            <p className="mt-3 text-sm leading-7 text-neutral-600">
              Send a note with your URL, screenshots, and what you expected to happen. We route directory issues with priority because
              inaccurate metadata affects everyone downstream.
            </p>
            <Link href="/contact" className={`mt-6 inline-flex ${btn.outline}`}>
              Open a ticket
            </Link>
          </div>
          <div className="rounded-2xl border border-black/10 bg-white/90 p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-neutral-500">Typical response</p>
            <p className="mt-2 text-3xl font-semibold text-[#cf0f47]">&lt; 24h</p>
            <p className="mt-2 text-sm text-neutral-600">Business days for listing and verification questions.</p>
          </div>
        </div>
      </div>

      <div className="mt-14 grid gap-6 sm:grid-cols-2">
        {guides.map(({ icon: Icon, title, body }) => (
          <div key={title} className="rounded-3xl border border-black/10 bg-white p-7 shadow-[0_18px_48px_rgba(0,0,0,0.05)]">
            <span className="inline-flex rounded-2xl border border-black/10 bg-[#fff5f5] p-3">
              <Icon className="h-5 w-5 text-[#cf0f47]" />
            </span>
            <h3 className="mt-4 text-lg font-semibold text-neutral-950">{title}</h3>
            <p className="mt-2 text-sm leading-7 text-neutral-600">{body}</p>
          </div>
        ))}
      </div>

      <div className="mt-14">
        <h2 className="text-2xl font-semibold tracking-[-0.03em] text-neutral-950">Frequently asked questions</h2>
        <p className="mt-2 max-w-2xl text-sm text-neutral-600">Straight answers about accounts, listings, and the directory experience.</p>
        <Card className="mt-8 border-black/10 bg-white shadow-[0_18px_48px_rgba(0,0,0,0.05)]">
          <CardContent className="p-6 sm:p-8">
            <Accordion type="single" collapsible className="w-full">
              {mockFaqs.map((faq) => (
                <AccordionItem key={faq.id} value={faq.id} className="border-black/10">
                  <AccordionTrigger className="text-left text-neutral-950 hover:no-underline">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-sm leading-7 text-neutral-600">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </PageShell>
  );
}
