import Link from 'next/link'
import { ArrowRight, Globe, Mail, MapPin, Phone, ShieldCheck, Tag } from 'lucide-react'
import { SchemaJsonLd } from '@/components/seo/schema-jsonld'
import { TaskPostCard } from '@/components/shared/task-post-card'
import { TaskImageCarousel } from '@/components/tasks/task-image-carousel'
import type { SitePost } from '@/lib/site-connector'
import type { TaskKey } from '@/lib/site-config'

export function DirectoryTaskDetailPage({
  task,
  taskLabel,
  taskRoute,
  post,
  description,
  category,
  images,
  mapEmbedUrl,
  related,
}: {
  task: TaskKey
  taskLabel: string
  taskRoute: string
  post: SitePost
  description: string
  category: string
  images: string[]
  mapEmbedUrl: string | null
  related: SitePost[]
}) {
  const content = post.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
  const location = typeof content.address === 'string' ? content.address : typeof content.location === 'string' ? content.location : ''
  const website = typeof content.website === 'string' ? content.website : ''
  const phone = typeof content.phone === 'string' ? content.phone : ''
  const email = typeof content.email === 'string' ? content.email : ''
  const highlights = Array.isArray(content.highlights) ? content.highlights.filter((item): item is string => typeof item === 'string') : []
  const schemaPayload = {
    '@context': 'https://schema.org',
    '@type': task === 'profile' ? 'Organization' : 'LocalBusiness',
    name: post.title,
    description,
    image: images[0],
    url: `${taskRoute}/${post.slug}`,
    address: location || undefined,
    telephone: phone || undefined,
    email: email || undefined,
  }

  const metaTiles = [
    { label: 'Category', value: category || taskLabel },
    { label: 'Locale', value: (typeof content.location === 'string' && content.location) || '—' },
    { label: 'Format', value: task === 'classified' ? 'Classified' : task === 'profile' ? 'Profile' : 'Listing' },
  ]

  return (
    <>
      <SchemaJsonLd data={schemaPayload} />
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <Link
          href={taskRoute}
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          ← Back to {taskLabel}
        </Link>

        <section className="grid gap-8 lg:grid-cols-[minmax(220px,300px)_1fr] lg:items-start">
          <div className="space-y-4">
            <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
              <TaskImageCarousel
                images={images}
                autoplayMs={images.length > 1 ? 3000 : undefined}
                compact
                className="rounded-none border-0 bg-muted/50"
              />
            </div>
            <p className="text-center text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              {images.length > 1 ? 'Rotating every 3s · details lead' : 'Reference image'}
            </p>
          </div>

          <div className="min-w-0 space-y-6">
            <div className="rounded-xl border border-border bg-card p-6 shadow-sm md:p-8">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center rounded-md border border-primary/25 bg-secondary px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
                      {category || taskLabel}
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-md border border-border bg-muted/60 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                      <ShieldCheck className="h-3.5 w-3.5 text-primary" /> Verified-style
                    </span>
                  </div>
                  <h1 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-foreground md:text-4xl">{post.title}</h1>
                </div>
              </div>

              <div className="mt-6 grid gap-2 sm:grid-cols-3">
                {metaTiles.map((tile) => (
                  <div
                    key={tile.label}
                    className="rounded-lg border border-border bg-muted/40 px-3 py-3 text-center sm:text-left"
                  >
                    <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">{tile.label}</p>
                    <p className="mt-1 text-sm font-semibold text-foreground">{tile.value}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 space-y-2 text-sm leading-7 text-muted-foreground">
                <p>{description}</p>
              </div>

              <div className="mt-6 grid gap-2">
                {location ? (
                  <div className="flex items-center gap-3 rounded-lg border border-border bg-muted/30 px-4 py-3 text-sm">
                    <MapPin className="h-4 w-4 shrink-0 text-primary" /> {location}
                  </div>
                ) : null}
                {phone ? (
                  <div className="flex items-center gap-3 rounded-lg border border-border bg-muted/30 px-4 py-3 text-sm">
                    <Phone className="h-4 w-4 shrink-0 text-primary" /> {phone}
                  </div>
                ) : null}
                {email ? (
                  <div className="flex items-center gap-3 rounded-lg border border-border bg-muted/30 px-4 py-3 text-sm">
                    <Mail className="h-4 w-4 shrink-0 text-primary" /> {email}
                  </div>
                ) : null}
                {website ? (
                  <div className="flex items-center gap-3 rounded-lg border border-border bg-muted/30 px-4 py-3 text-sm">
                    <Globe className="h-4 w-4 shrink-0 text-primary" /> {website}
                  </div>
                ) : null}
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                {website ? (
                  <a
                    href={website}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
                  >
                    Visit website <ArrowRight className="h-4 w-4" />
                  </a>
                ) : null}
                <Link
                  href={taskRoute}
                  className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-5 py-3 text-sm font-semibold text-foreground hover:bg-muted/50"
                >
                  Browse more
                </Link>
              </div>
            </div>

            {highlights.length ? (
              <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">Highlights</p>
                <div className="mt-4 grid gap-2 md:grid-cols-2">
                  {highlights.slice(0, 6).map((item) => (
                    <div key={item} className="rounded-lg border border-border bg-muted/30 px-4 py-3 text-sm text-foreground">
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </section>

        {mapEmbedUrl ? (
          <div className="mt-10 overflow-hidden rounded-xl border border-border bg-card shadow-sm">
            <div className="border-b border-border px-6 py-4">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">Location</p>
            </div>
            <iframe
              src={mapEmbedUrl}
              title={`${post.title} map`}
              className="h-[320px] w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        ) : null}

        {related.length ? (
          <section className="mt-14">
            <div className="flex flex-wrap items-end justify-between gap-4 border-b border-border pb-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">Related</p>
                <h2 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-foreground">More in this lane</h2>
              </div>
              <span className="inline-flex items-center gap-2 rounded-md border border-border bg-muted/40 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                <Tag className="h-3.5 w-3.5" /> {taskLabel}
              </span>
            </div>
            <div className="mt-8 flex max-w-5xl flex-col gap-5">
              {related.map((item) => (
                <TaskPostCard key={item.id} post={item} href={`${taskRoute}/${item.slug}`} taskKey={task} />
              ))}
            </div>
          </section>
        ) : null}
      </main>
    </>
  )
}
