'use client'

import Link from 'next/link'
import { Globe, Mail, MapPin, Phone, ShieldCheck, Tag, Calendar, ChevronRight, X } from 'lucide-react'
import { ContentImage } from '@/components/shared/content-image'
import { SchemaJsonLd } from '@/components/seo/schema-jsonld'
import { TaskPostCard } from '@/components/shared/task-post-card'
import type { SitePost } from '@/lib/site-connector'
import type { TaskKey } from '@/lib/site-config'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { RichContent } from '@/components/shared/rich-content'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { useState } from 'react'

function getDirectoryTone() {
  return {
    shell: 'bg-[#f3f0f0] text-neutral-950',
    hero: 'bg-[linear-gradient(180deg,#ebe6e6_0%,#fff8f8_100%)]',
    panel: 'border border-black/10 bg-white shadow-[0_22px_56px_rgba(0,0,0,0.07)]',
    soft: 'border border-black/8 bg-[#ffeded]',
    muted: 'text-neutral-600',
    title: 'text-neutral-950',
    badge: 'bg-neutral-950 text-white',
    action: 'bg-[#cf0f47] text-white hover:bg-[#a30c39]',
    actionAlt: 'border border-black/10 bg-white text-neutral-950 hover:bg-[#fff5f5]',
  }
}

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
  const services = Array.isArray(content.services) ? content.services.filter((item): item is string => typeof item === 'string') : []
  const businessTags = Array.isArray(post.tags) ? post.tags.filter((item): item is string => typeof item === 'string') : []
  const tone = getDirectoryTone()
  const [lightboxImage, setLightboxImage] = useState<string | null>(null)
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
  const stats = [category || taskLabel, location ? 'Mapped' : 'Directory', website ? 'Website' : 'Profile']

  return (
    <div className={`min-h-screen ${tone.shell}`}>
      <SchemaJsonLd data={schemaPayload} />
      <main className="pb-16">
        {/* Title Section */}
        <section className={`${tone.hero}`}>
          <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <Link href={taskRoute} className={`inline-flex items-center gap-2 text-sm font-semibold opacity-85 transition hover:opacity-100 ${tone.muted}`}>
              ← Back to {taskLabel}
            </Link>
            <h1 className={`mt-4 text-4xl font-semibold leading-tight sm:text-5xl ${tone.title}`}>{post.title}</h1>
            {location ? (
              <p className={`mt-3 flex items-start gap-2 text-sm leading-7 opacity-85 ${tone.muted}`}>
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                {location}
              </p>
            ) : null}
          </div>
        </section>

        {/* Photo Gallery Section */}
        {images.length > 1 ? (
          <section className="mx-auto mt-8 max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className={`mb-4 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] ${tone.badge}`}>
              <ShieldCheck className="h-4 w-4" />
              Photo Gallery
            </div>
            <div className="flex gap-4 overflow-x-auto pb-4 [-webkit-overflow-scrolling:touch]">
              {images.map((image, index) => (
                <div 
                  key={image} 
                  className={`relative h-48 w-64 shrink-0 overflow-hidden rounded-xl border border-black/10 bg-white shadow-lg sm:h-56 sm:w-72 ${tone.panel} cursor-pointer`}
                  onClick={() => setLightboxImage(image)}
                >
                  <ContentImage src={image} alt={`${post.title} photo ${index + 1}`} fill className="object-cover" />
                </div>
              ))}
            </div>
          </section>
        ) : null}

        <div className="mx-auto mt-10 grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:px-8">
          <div className="space-y-8">
            {/* Profile Summary */}
            <article className={`p-6 sm:p-8 ${tone.panel}`}>
              <p className={`text-[11px] font-semibold uppercase tracking-[0.2em] ${tone.badge}`}>Profile summary</p>
              <h2 className={`mt-3 text-2xl font-semibold ${tone.title}`}>Details, context, and what to expect</h2>
              <div className={`mt-5 max-w-4xl text-sm leading-8 ${tone.muted}`}>
                <RichContent html={description} />
              </div>
              {highlights.length ? (
                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                  {highlights.slice(0, 6).map((item) => (
                    <div key={item} className={`px-4 py-3 text-sm ${tone.soft}`}>{item}</div>
                  ))}
                </div>
              ) : null}
            </article>

            {/* Services Offered Section */}
            {services.length > 0 ? (
              <section className={`p-6 sm:p-8 ${tone.panel}`}>
                <div className={`mb-6 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] ${tone.badge}`}>
                  <ShieldCheck className="h-4 w-4" />
                  Services Offered
                </div>
                <div className="grid gap-6 sm:grid-cols-2">
                  {services.slice(0, 4).map((service, index) => (
                    <div key={index} className={`rounded-xl border border-black/10 bg-white p-5 ${tone.panel}`}>
                      <div className={`relative aspect-video overflow-hidden rounded-lg mb-4 ${tone.soft}`}>
                        {images[index % images.length] && (
                          <ContentImage 
                            src={images[index % images.length]} 
                            alt={service} 
                            fill 
                            className="object-cover" 
                          />
                        )}
                      </div>
                      <h3 className={`text-lg font-semibold ${tone.title}`}>{service}</h3>
                      <p className={`mt-2 text-sm ${tone.muted}`}>Professional {service.toLowerCase()} services with expert guidance and support.</p>
                      <div className="mt-4 flex items-center justify-between">
                        <Badge className={`border border-black/10 bg-white text-xs ${tone.muted}`}>Business lead generation</Badge>
                        <Button variant="ghost" size="sm" className={`text-xs ${tone.muted} hover:text-neutral-950`}>
                          View more
                          <ChevronRight className="ml-1 h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            ) : null}

            {/* Business Tags Section */}
            {businessTags.length > 0 ? (
              <section className={`p-6 sm:p-8 ${tone.panel}`}>
                <div className={`mb-6 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] ${tone.badge}`}>
                  <Tag className="h-4 w-4" />
                  Business Tag
                </div>
                <div className="flex flex-wrap gap-2">
                  {businessTags.map((tag) => (
                    <Badge key={tag} variant="secondary" className={`border border-black/10 bg-white ${tone.muted}`}>
                      {tag}
                    </Badge>
                  ))}
                </div>
              </section>
            ) : null}
          </div>

          <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
            {/* Our Location */}
            <div className={`p-5 ${tone.panel}`}>
              <p className={`text-[11px] font-semibold uppercase tracking-[0.2em] ${tone.badge}`}>Our Location</p>
              <div className="mt-5 grid gap-3 text-sm">
                {location ? <div className={`flex items-start gap-3 px-3 py-2 ${tone.soft}`}><MapPin className="mt-0.5 h-4 w-4 shrink-0" />{location}</div> : null}
                {phone ? <div className={`flex items-center gap-3 px-3 py-2 ${tone.soft}`}><Phone className="h-4 w-4 shrink-0" />{phone}</div> : null}
                {email ? <div className={`flex items-center gap-3 px-3 py-2 ${tone.soft}`}><Mail className="h-4 w-4 shrink-0" />{email}</div> : null}
                {website ? <div className={`flex items-center gap-3 px-3 py-2 ${tone.soft}`}><Globe className="h-4 w-4 shrink-0" />{website}</div> : null}
              </div>
            </div>

            {/* Company Info */}
            <div className={`p-5 ${tone.panel}`}>
              <p className={`text-[11px] font-semibold uppercase tracking-[0.2em] ${tone.badge}`}>Company Info</p>
              <div className="mt-5 space-y-3 text-sm">
                <div className={`flex items-center gap-3 px-3 py-2 ${tone.soft}`}>
                  <Calendar className="h-4 w-4 shrink-0" />
                  <span className={tone.muted}>Established {post.publishedAt ? new Date(post.publishedAt).getFullYear() : 'Recently'}</span>
                </div>
                <div className={`flex items-center gap-3 px-3 py-2 ${tone.soft}`}>
                  <Tag className="h-4 w-4 shrink-0" />
                  <span className={tone.muted}>{category}</span>
                </div>
              </div>
            </div>

            {/* Location Map */}
            {mapEmbedUrl ? (
              <div className={`overflow-hidden ${tone.panel}`}>
                <div className="px-5 py-4">
                  <p className={`text-[11px] font-semibold uppercase tracking-[0.2em] ${tone.badge}`}>Location Map</p>
                </div>
                <iframe src={mapEmbedUrl} title={`${post.title} map`} className="h-[300px] w-full border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
              </div>
            ) : null}

            {/* Discover More */}
            <div className={`p-5 ${tone.panel}`}>
              <p className={`text-[11px] font-semibold uppercase tracking-[0.2em] ${tone.badge}`}>Discover More</p>
              <div className="mt-5 space-y-2">
                <Link href={taskRoute} className={`block px-3 py-2 text-sm ${tone.soft} hover:bg-white transition`}>
                  Browse all {taskLabel}
                </Link>
                <Link href={`/search?q=${encodeURIComponent(category)}`} className={`block px-3 py-2 text-sm ${tone.soft} hover:bg-white transition`}>
                  Search in {category}
                </Link>
              </div>
            </div>
          </aside>
        </div>

        {related.length ? (
          <section className="mx-auto mt-16 max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className={`text-[11px] font-semibold uppercase tracking-[0.2em] ${tone.badge}`}>Recommended</p>
                <h2 className={`mt-2 text-2xl font-semibold ${tone.title}`}>More nearby matches</h2>
              </div>
              <span className={`inline-flex w-fit items-center gap-2 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] ${tone.soft}`}>
                <Tag className="h-3.5 w-3.5" />
                {taskLabel}
              </span>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
              {related.map((item) => (
                <TaskPostCard key={item.id} post={item} href={`${taskRoute}/${item.slug}`} taskKey={task} compact />
              ))}
            </div>
          </section>
        ) : null}
      </main>

      {/* Image Lightbox */}
      <Dialog open={!!lightboxImage} onOpenChange={() => setLightboxImage(null)}>
        <DialogContent className="max-w-4xl p-0 bg-transparent border-none shadow-none">
          <DialogTitle className="sr-only">Image Preview</DialogTitle>
          <button
            onClick={() => setLightboxImage(null)}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition"
          >
            <X className="h-6 w-6" />
          </button>
          {lightboxImage && (
            <div className="relative w-full h-[80vh] rounded-lg overflow-hidden">
              <ContentImage src={lightboxImage} alt={post.title} fill className="object-contain" />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
