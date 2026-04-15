"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ContentImage } from "@/components/shared/content-image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Props = {
  images: string[];
  autoplayMs?: number;
  compact?: boolean;
  className?: string;
};

export function TaskImageCarousel({ images, autoplayMs, compact, className }: Props) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: images.length > 1,
  });
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);
  const [index, setIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanPrev(emblaApi.canScrollPrev());
    setCanNext(emblaApi.canScrollNext());
    setIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  useEffect(() => {
    if (!emblaApi || images.length <= 1 || !autoplayMs) return;
    const id = window.setInterval(() => {
      emblaApi.scrollNext();
    }, autoplayMs);
    return () => window.clearInterval(id);
  }, [emblaApi, images.length, autoplayMs]);

  if (!images.length) return null;

  const aspectClass = compact ? "aspect-[21/9] max-h-52" : "aspect-[16/10]";

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl border border-border bg-muted/80",
        compact ? "shadow-sm" : "rounded-3xl",
        className
      )}
    >
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {images.map((src, i) => (
            <div key={`${src}-${i}`} className="min-w-0 flex-[0_0_100%]">
              <div className={cn("relative w-full", aspectClass)}>
                <ContentImage
                  src={src}
                  alt={`Image ${i + 1} of ${images.length}`}
                  fill
                  sizes={
                    compact
                      ? "(max-width: 768px) 100vw, 640px"
                      : "(max-width: 768px) 100vw, 900px"
                  }
                  quality={compact ? 72 : 78}
                  className={compact ? "object-cover object-center" : "object-cover"}
                  intrinsicWidth={1440}
                  intrinsicHeight={900}
                  priority={i === 0}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {images.length > 1 && (
        <>
          <div
            className="pointer-events-none absolute inset-x-0 bottom-2 flex justify-center gap-1.5"
            aria-hidden
          >
            {images.map((_, i) => (
              <span
                key={i}
                className={cn(
                  "h-1.5 w-1.5 rounded-full transition-opacity",
                  i === index ? "bg-primary opacity-100" : "bg-foreground/25 opacity-70"
                )}
              />
            ))}
          </div>
          <Button
            variant="secondary"
            size="icon"
            aria-label="Previous image"
            className="absolute left-3 top-1/2 z-10 h-9 w-9 -translate-y-1/2 opacity-90 shadow-sm"
            onClick={() => emblaApi?.scrollPrev()}
            disabled={!canPrev}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="secondary"
            size="icon"
            aria-label="Next image"
            className="absolute right-3 top-1/2 z-10 h-9 w-9 -translate-y-1/2 opacity-90 shadow-sm"
            onClick={() => emblaApi?.scrollNext()}
            disabled={!canNext}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </>
      )}
    </div>
  );
}
