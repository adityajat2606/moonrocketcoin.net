'use client'

import type { ReactNode } from 'react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'

export function PageShell({
  title,
  description,
  actions,
  children,
  variant = 'default',
  kicker,
}: {
  title: string
  description?: string
  actions?: ReactNode
  children?: ReactNode
  /** Matches the directory homepage shell: pale grey/pink surfaces and crimson accents. */
  variant?: 'default' | 'directory'
  kicker?: string
}) {
  if (variant === 'directory') {
    return (
      <div className="min-h-screen bg-[#f3f0f0] text-neutral-950">
        <NavbarShell />
        <main>
          <section className="border-b border-black/10 bg-[linear-gradient(180deg,#ebe6e6_0%,#fff8f8_100%)]">
            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
              <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
                <div className="max-w-3xl">
                  {kicker ? (
                    <span className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-neutral-600">
                      {kicker}
                    </span>
                  ) : null}
                  <h1
                    className={`text-4xl font-semibold tracking-[-0.06em] text-neutral-950 sm:text-5xl ${
                      kicker ? 'mt-4' : ''
                    }`}
                  >
                    {title}
                  </h1>
                  {description ? (
                    <p className="mt-5 max-w-2xl text-base leading-8 text-neutral-600">{description}</p>
                  ) : null}
                </div>
                {actions ? <div className="flex flex-shrink-0 flex-wrap gap-3">{actions}</div> : null}
              </div>
            </div>
          </section>
          <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">{children}</section>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <NavbarShell />
      <main>
        <section className="border-b border-border bg-secondary/30">
          <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground">{title}</h1>
                {description && <p className="mt-2 max-w-2xl text-muted-foreground">{description}</p>}
              </div>
              {actions && <div className="flex flex-wrap gap-3">{actions}</div>}
            </div>
          </div>
        </section>
        <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">{children}</section>
      </main>
      <Footer />
    </div>
  )
}

