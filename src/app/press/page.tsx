"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { PageShell } from "@/components/shared/page-shell";
import { directoryPageButtonClasses } from "@/components/shared/directory-page-styles";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { mockPressAssets, mockPressCoverage } from "@/data/mock-data";
import { Download, Newspaper, Sparkles } from "lucide-react";

export default function PressPage() {
  const { toast } = useToast();
  const [activeAssetId, setActiveAssetId] = useState<string | null>(null);
  const activeAsset = mockPressAssets.find((asset) => asset.id === activeAssetId);
  const btn = directoryPageButtonClasses();

  return (
    <PageShell
      variant="directory"
      kicker="Press"
      title="Media room & brand assets"
      description="Download approved logos, review product screenshots, and scan recent coverage of Moon Rocket Coin. For interview requests, reach out through the contact page."
      actions={
        <>
          <Link href="/contact" className={btn.outline}>
            Press contact
          </Link>
          <a href="/favicon.png" download className={`inline-flex items-center gap-2 ${btn.primary}`}>
            <Download className="h-4 w-4" />
            Logo (PNG)
          </a>
        </>
      }
    >
      <div className="grid gap-6 rounded-3xl border border-black/10 bg-white p-8 shadow-[0_22px_56px_rgba(0,0,0,0.06)] lg:grid-cols-3 lg:p-10">
        <div className="lg:col-span-1">
          <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-[#fff5f5] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-700">
            <Sparkles className="h-3.5 w-3.5 text-[#cf0f47]" />
            At a glance
          </div>
          <ul className="mt-6 space-y-4 text-sm text-neutral-600">
            <li className="flex justify-between border-b border-black/8 pb-3">
              <span>Founded</span>
              <span className="font-semibold text-neutral-950">2024</span>
            </li>
            <li className="flex justify-between border-b border-black/8 pb-3">
              <span>Focus</span>
              <span className="font-semibold text-neutral-950">Business directory</span>
            </li>
            <li className="flex justify-between">
              <span>HQ</span>
              <span className="font-semibold text-neutral-950">Remote-first</span>
            </li>
          </ul>
        </div>
        <div className="lg:col-span-2">
          <div className="flex items-center gap-2 text-neutral-950">
            <Newspaper className="h-5 w-5 text-[#cf0f47]" />
            <h2 className="text-2xl font-semibold tracking-[-0.03em]">Press kit downloads</h2>
          </div>
          <p className="mt-3 text-sm leading-7 text-neutral-600">
            Use these assets for editorial stories. Do not stretch logos, alter colors, or place the mark on busy photography without a
            clear quiet zone.
          </p>
          <div className="mt-6 space-y-3">
            {mockPressAssets.map((asset) => (
              <div key={asset.id} className="rounded-2xl border border-black/10 bg-[#fffafa] px-4 py-4">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-sm font-semibold text-neutral-950">{asset.title}</p>
                    <p className="mt-1 text-xs text-neutral-600">{asset.description}</p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge className="rounded-full border border-black/10 bg-white">{asset.fileType}</Badge>
                    <Button size="sm" variant="outline" className="rounded-full border-black/15" onClick={() => setActiveAssetId(asset.id)}>
                      Preview
                    </Button>
                    <Button
                      size="sm"
                      className="rounded-full bg-[#cf0f47] text-white hover:bg-[#a30c39]"
                      onClick={() =>
                        toast({
                          title: "Download started",
                          description: `${asset.title} is downloading.`,
                        })
                      }
                    >
                      Download
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-14">
        <h2 className="text-2xl font-semibold tracking-[-0.03em] text-neutral-950">Recent coverage</h2>
        <p className="mt-2 max-w-2xl text-sm text-neutral-600">Highlights from outlets covering our launch and directory approach.</p>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {mockPressCoverage.map((item) => (
            <div
              key={item.id}
              className="rounded-3xl border border-black/10 bg-white p-6 shadow-[0_18px_48px_rgba(0,0,0,0.05)] transition hover:border-[#cf0f47]/30"
            >
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[#cf0f47]">{item.outlet}</div>
              <p className="mt-3 text-base font-medium leading-snug text-neutral-950">{item.headline}</p>
              <p className="mt-3 text-xs text-neutral-500">{item.date}</p>
            </div>
          ))}
        </div>
      </div>

      <Dialog open={Boolean(activeAsset)} onOpenChange={() => setActiveAssetId(null)}>
        <DialogContent className="max-w-3xl border-black/10 bg-white">
          <DialogHeader>
            <DialogTitle>{activeAsset?.title}</DialogTitle>
          </DialogHeader>
          {activeAsset?.previewUrl && (
            <div className="relative aspect-video overflow-hidden rounded-2xl border border-black/10 bg-neutral-100">
              <Image src={activeAsset.previewUrl} alt={activeAsset.title} fill className="object-cover" />
            </div>
          )}
          <p className="text-sm leading-7 text-neutral-600">{activeAsset?.description}</p>
          <DialogFooter>
            <Button variant="outline" className="rounded-full" onClick={() => setActiveAssetId(null)}>
              Close
            </Button>
            <Button
              className="rounded-full bg-[#cf0f47] text-white hover:bg-[#a30c39]"
              onClick={() =>
                toast({
                  title: "Download started",
                  description: `${activeAsset?.title} is downloading.`,
                })
              }
            >
              Download {activeAsset?.fileType}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </PageShell>
  );
}
