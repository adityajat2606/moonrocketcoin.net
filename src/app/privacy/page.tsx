import Link from "next/link";
import { PageShell } from "@/components/shared/page-shell";
import { directoryPageButtonClasses } from "@/components/shared/directory-page-styles";
import { SITE_CONFIG } from "@/lib/site-config";

const sections: { id: string; title: string; body: string }[] = [
  {
    id: "overview",
    title: "Overview",
    body: `${SITE_CONFIG.name} collects the minimum information needed to operate a business directory: account details, listing content you submit, and technical logs that keep the service reliable. This page explains what we collect, why we collect it, and the choices available to you.`,
  },
  {
    id: "information-we-collect",
    title: "Information we collect",
    body: "Account identifiers (such as email), profile and listing fields you provide, media you upload, usage events tied to security (sign-ins, failed attempts), and device/browser metadata commonly found in web server logs. We do not sell your personal information.",
  },
  {
    id: "how-we-use-information",
    title: "How we use information",
    body: "To display and rank listings, prevent abuse, respond to support requests, improve search relevance, meet legal obligations, and communicate service updates. Aggregated statistics may be used to describe product usage without identifying individuals.",
  },
  {
    id: "sharing",
    title: "Sharing",
    body: "We share data with subprocessors that provide hosting, email delivery, analytics, and security monitoring—under contracts that limit use to providing the service. We may disclose information if required by law or to protect the rights and safety of users.",
  },
  {
    id: "retention-deletion",
    title: "Retention & deletion",
    body: "We retain account and listing data while your account is active and for a limited period afterward for recovery, billing, and legal compliance. You may request deletion of personal data subject to exceptions (e.g., fraud prevention records).",
  },
  {
    id: "your-choices",
    title: "Your choices",
    body: "Update profile and listing fields from your dashboard, opt out of non-essential emails where offered, and contact us to export or delete personal data where applicable law provides those rights.",
  },
  {
    id: "international-users",
    title: "International users",
    body: "If you access the service from outside your home region, your information may be processed in countries where we or our vendors operate, using safeguards appropriate to the transfer.",
  },
  {
    id: "contact",
    title: "Contact",
    body: "Questions about this policy or your data can be sent through the contact page. Please include the email on your account and a concise description of your request.",
  },
];

export default function PrivacyPage() {
  const btn = directoryPageButtonClasses();

  return (
    <PageShell
      variant="directory"
      kicker="Legal"
      title="Privacy policy"
      description="How we collect, use, store, and protect information across the Moon Rocket Coin directory."
      actions={
        <Link href="/contact" className={btn.outline}>
          Privacy requests
        </Link>
      }
    >
      <p className="text-sm font-medium text-neutral-500">Last updated: April 15, 2026</p>

      <div className="mt-10 grid gap-5 lg:grid-cols-[0.32fr_1fr]">
        <nav className="rounded-3xl border border-black/10 bg-white p-5 shadow-[0_18px_48px_rgba(0,0,0,0.05)] lg:sticky lg:top-28 lg:self-start">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-neutral-500">On this page</p>
          <ul className="mt-4 space-y-2 text-sm">
            {sections.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className="text-neutral-600 hover:text-[#cf0f47]">
                  {s.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="space-y-5">
          {sections.map((section) => (
            <article
              key={section.id}
              id={section.id}
              className="scroll-mt-28 rounded-3xl border border-black/10 bg-white p-7 shadow-[0_18px_48px_rgba(0,0,0,0.05)] sm:p-8"
            >
              <h2 className="text-xl font-semibold tracking-[-0.02em] text-neutral-950">{section.title}</h2>
              <p className="mt-4 text-sm leading-7 text-neutral-600">{section.body}</p>
            </article>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
