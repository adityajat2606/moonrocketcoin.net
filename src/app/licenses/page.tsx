import Link from "next/link";
import { PageShell } from "@/components/shared/page-shell";
import { directoryPageButtonClasses } from "@/components/shared/directory-page-styles";
import { ExternalLink } from "lucide-react";

const licenses = [
  { name: "Next.js", license: "MIT", href: "https://github.com/vercel/next.js/blob/canary/license.md" },
  { name: "React", license: "MIT", href: "https://github.com/facebook/react/blob/main/LICENSE" },
  { name: "Tailwind CSS", license: "MIT", href: "https://github.com/tailwindlabs/tailwindcss/blob/master/LICENSE" },
  { name: "Radix UI", license: "MIT", href: "https://github.com/radix-ui/primitives/blob/main/LICENSE" },
  { name: "Lucide", license: "ISC", href: "https://github.com/lucide-icons/lucide/blob/main/LICENSE" },
  { name: "Zod", license: "MIT", href: "https://github.com/colinhacks/zod/blob/master/LICENSE" },
];

export default function LicensesPage() {
  const btn = directoryPageButtonClasses();

  return (
    <PageShell
      variant="directory"
      kicker="Open source"
      title="Licenses & acknowledgements"
      description="Moon Rocket Coin is built on a modern React stack. We are grateful to the maintainers of these projects and list their licenses here for transparency."
      actions={
        <Link href="https://opensource.org/licenses/MIT" target="_blank" rel="noopener noreferrer" className={btn.outline}>
          About the MIT license
        </Link>
      }
    >
      <div className="rounded-3xl border border-black/10 bg-[linear-gradient(180deg,#fffafa_0%,#ffffff_100%)] p-8 shadow-[0_22px_56px_rgba(0,0,0,0.06)] sm:p-10">
        <h2 className="text-2xl font-semibold tracking-[-0.03em] text-neutral-950">Third-party software</h2>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-neutral-600">
          The packages below are redistributed under the terms of their respective licenses. This is not legal advice—refer to each
          project&apos;s repository for the authoritative text.
        </p>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {licenses.map((item) => (
          <div
            key={item.name}
            className="flex flex-col justify-between rounded-3xl border border-black/10 bg-white p-6 shadow-[0_18px_48px_rgba(0,0,0,0.05)]"
          >
            <div>
              <h3 className="text-lg font-semibold text-neutral-950">{item.name}</h3>
              <p className="mt-2 text-sm text-neutral-600">{item.license}</p>
            </div>
            <Link
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#cf0f47] hover:underline"
            >
              View license
              <ExternalLink className="h-4 w-4" />
            </Link>
          </div>
        ))}
      </div>
    </PageShell>
  );
}
