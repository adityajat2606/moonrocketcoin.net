import Link from "next/link";
import { PageShell } from "@/components/shared/page-shell";
import { directoryPageButtonClasses } from "@/components/shared/directory-page-styles";
import { SITE_CONFIG } from "@/lib/site-config";

const sections: { id: string; title: string; body: string }[] = [
  {
    id: "agreement",
    title: "Agreement to terms",
    body: `By accessing or using ${SITE_CONFIG.name}, you agree to these Terms of Service and our Privacy Policy. If you do not agree, do not use the service.`,
  },
  {
    id: "accounts",
    title: "Accounts & eligibility",
    body: "You must provide accurate registration information and keep credentials secure. You are responsible for activity under your account. We may suspend accounts that present risk to users or the platform.",
  },
  {
    id: "content",
    title: "Listings & user content",
    body: "You retain rights to content you submit. You grant us a license to host, display, distribute, and promote that content in connection with operating the directory. You represent you have the rights needed to grant this license.",
  },
  {
    id: "acceptable-use",
    title: "Acceptable use",
    body: "No unlawful, misleading, or infringing listings. No harassment, scraping that degrades service quality, attempts to bypass security, or distribution of malware. We may remove content and take technical measures to enforce these rules.",
  },
  {
    id: "third-parties",
    title: "Third-party links",
    body: "Listings may link to external websites. We do not control third-party sites and are not responsible for their content or practices.",
  },
  {
    id: "disclaimers",
    title: "Disclaimers",
    body: "The service is provided “as is” to the maximum extent permitted by law. We do not warrant uninterrupted or error-free operation. Directory information is supplied by users and partners and may contain inaccuracies.",
  },
  {
    id: "limitation",
    title: "Limitation of liability",
    body: "To the fullest extent permitted by law, our aggregate liability arising out of the service will not exceed the greater of the fees you paid us in the twelve months before the claim or one hundred dollars.",
  },
  {
    id: "changes",
    title: "Changes",
    body: "We may update these terms from time to time. Material changes will be communicated through the product or by email where appropriate. Continued use after changes constitutes acceptance.",
  },
  {
    id: "contact-terms",
    title: "Contact",
    body: "Legal notices and questions about these terms can be submitted through the contact page with “Terms” in the subject line.",
  },
];

export default function TermsPage() {
  const btn = directoryPageButtonClasses();

  return (
    <PageShell
      variant="directory"
      kicker="Legal"
      title="Terms of service"
      description={`Rules for using ${SITE_CONFIG.name}, including accounts, listings, acceptable use, and limitations of liability.`}
      actions={
        <Link href="/privacy" className={btn.outline}>
          Privacy policy
        </Link>
      }
    >
      <p className="text-sm font-medium text-neutral-500">Last updated: April 15, 2026</p>

      <div className="mt-10 grid gap-5 lg:grid-cols-[0.32fr_1fr]">
        <nav className="rounded-3xl border border-black/10 bg-white p-5 shadow-[0_18px_48px_rgba(0,0,0,0.05)] lg:sticky lg:top-28 lg:self-start">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-neutral-500">Sections</p>
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
            <article key={section.id} id={section.id} className="scroll-mt-28 rounded-3xl border border-black/10 bg-white p-7 shadow-[0_18px_48px_rgba(0,0,0,0.05)] sm:p-8">
              <h2 className="text-xl font-semibold tracking-[-0.02em] text-neutral-950">{section.title}</h2>
              <p className="mt-4 text-sm leading-7 text-neutral-600">{section.body}</p>
            </article>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
