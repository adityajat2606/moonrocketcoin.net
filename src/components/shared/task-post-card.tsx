import { ContentImage } from '@/components/shared/content-image'
import Link from 'next/link'
import { ArrowUpRight, ExternalLink, FileText, Mail, MapPin, Tag } from 'lucide-react'
import type { SitePost } from '@/lib/site-connector'
import { CATEGORY_OPTIONS, normalizeCategory } from '@/lib/categories'
import type { TaskKey } from '@/lib/site-config'
import { SITE_THEME } from '@/config/site.theme'
import { getFactoryState } from '@/design/factory/get-factory-state'
import { TASK_POST_CARD_OVERRIDE_ENABLED, TaskPostCardOverride } from '@/overrides/task-post-card'

type ListingContent = {
  location?: string
  category?: string
  description?: string
  email?: string
}

const stripHtml = (value?: string | null) =>
  (value || '')
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, ' ')
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, ' ')
    .replace(/<\/?[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

const getExcerpt = (value?: string | null, maxLength = 140) => {
  const text = stripHtml(value)
  if (!text) return ''
  if (text.length <= maxLength) return text
  return `${text.slice(0, maxLength).trimEnd()}…`
}

const getContent = (post: SitePost): ListingContent => {
  const content = post.content && typeof post.content === 'object' ? post.content : {}
  return content as ListingContent
}

const getImageUrl = (post: SitePost, content: ListingContent) => {
  const media = Array.isArray(post.media) ? post.media : []
  const mediaUrl = media[0]?.url
  if (mediaUrl) return mediaUrl

  const contentAny = content as Record<string, unknown>
  const contentImage = typeof contentAny.image === 'string' ? contentAny.image : null
  if (contentImage) return contentImage

  const contentImages = Array.isArray(contentAny.images) ? contentAny.images : []
  const firstImage = contentImages.find((value) => typeof value === 'string')
  if (firstImage) return firstImage as string

  const contentLogo = typeof contentAny.logo === 'string' ? contentAny.logo : null
  if (contentLogo) return contentLogo

  return '/placeholder.svg?height=640&width=960'
}

const cardStyles = {
  'listing-elevated': {
    frame: 'rounded-[1.9rem] border border-slate-200 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.08)] hover:-translate-y-1 hover:shadow-[0_28px_75px_rgba(15,23,42,0.14)]',
    muted: 'text-slate-600',
    title: 'text-slate-950',
    badge: 'bg-slate-950 text-white',
  },
  'editorial-feature': {
    frame: 'rounded-[1.8rem] border border-[rgba(125,83,45,0.12)] bg-[#fffaf3] shadow-[0_18px_55px_rgba(89,52,24,0.1)] hover:-translate-y-1 hover:shadow-[0_26px_75px_rgba(89,52,24,0.14)]',
    muted: 'text-[#71584b]',
    title: 'text-[#2b1d17]',
    badge: 'bg-[#2b1d17] text-[#fff3df]',
  },
  'studio-panel': {
    frame: 'rounded-[1.9rem] border border-white/10 bg-[linear-gradient(180deg,rgba(7,17,31,0.96),rgba(12,23,43,0.96))] text-white shadow-[0_24px_80px_rgba(15,23,42,0.35)] hover:-translate-y-1 hover:shadow-[0_30px_90px_rgba(15,23,42,0.42)]',
    muted: 'text-slate-300',
    title: 'text-white',
    badge: 'bg-[#8df0c8] text-[#07111f]',
  },
  'catalog-grid': {
    frame: 'rounded-[1.8rem] border border-[rgba(67,78,41,0.14)] bg-[#f8faf1] shadow-[0_18px_58px_rgba(55,65,31,0.1)] hover:-translate-y-1 hover:shadow-[0_28px_70px_rgba(55,65,31,0.14)]',
    muted: 'text-[#5b664c]',
    title: 'text-[#1f2617]',
    badge: 'bg-[#1f2617] text-[#edf5dc]',
  },
} as const

const getVariantForTask = (taskKey: TaskKey) => SITE_THEME.cards[taskKey] || 'listing-elevated'

export function TaskPostCard({
  post,
  href,
  taskKey,
  compact,
}: {
  post: SitePost
  href: string
  taskKey?: TaskKey
  compact?: boolean
}) {
  if (TASK_POST_CARD_OVERRIDE_ENABLED) {
    return <TaskPostCardOverride post={post} href={href} taskKey={taskKey} compact={compact} />
  }

  const content = getContent(post)
  const image = getImageUrl(post, content)
  const rawCategory = content.category || post.tags?.[0] || 'Post'
  const normalizedCategory = normalizeCategory(rawCategory)
  const category = CATEGORY_OPTIONS.find((item) => item.slug === normalizedCategory)?.name || rawCategory
  const variant = taskKey || 'listing'
  const visualVariant = cardStyles[getVariantForTask(variant)]
  const isBookmarkVariant = variant === 'sbm' || variant === 'social'
  const imageAspect = variant === 'image' ? 'aspect-[4/5]' : variant === 'article' ? 'aspect-[16/10]' : variant === 'pdf' ? 'aspect-[4/5]' : variant === 'classified' ? 'aspect-[16/11]' : 'aspect-[4/3]'
  const altText = `${post.title} ${category} ${variant === 'listing' ? 'business listing' : variant} image`
  const imageSizes = variant === 'article' ? '(max-width: 640px) 90vw, (max-width: 1024px) 48vw, 420px' : variant === 'image' ? '(max-width: 640px) 82vw, (max-width: 1024px) 34vw, 320px' : '(max-width: 640px) 85vw, (max-width: 1024px) 42vw, 340px'

  const { recipe } = getFactoryState()
  const isDirectoryProduct = recipe.homeLayout === 'listing-home' || recipe.homeLayout === 'classified-home'
  const isDirectorySurface = isDirectoryProduct && (variant === 'listing' || variant === 'classified' || variant === 'profile')

  if (isDirectorySurface) {
    const cardTone = {
      frame:
        'rounded-xl border border-black/10 bg-white shadow-[0_14px_40px_rgba(0,0,0,0.06)] hover:border-primary/25 hover:shadow-[0_18px_48px_rgba(207,15,71,0.08)]',
      badge: 'border border-primary/30 bg-[#ffeded] text-[#8f0b32]',
      pill: 'rounded-md bg-neutral-950 px-2 py-1 text-[9px] font-bold uppercase tracking-[0.16em] text-white',
      muted: 'text-neutral-600',
      title: 'text-neutral-950',
      cta: 'text-primary',
      tile: 'rounded-md border border-black/8 bg-[#fff7f7] px-2 py-2 text-center text-[11px] font-medium text-neutral-700',
    }

    const formatLabel = variant === 'classified' ? 'Classified' : variant === 'profile' ? 'Profile' : 'Listing'

    return (
      <Link
        href={href}
        className={`group flex h-full w-full flex-col overflow-hidden transition duration-300 sm:flex-row sm:items-stretch ${cardTone.frame}`}
      >
        <div className="relative h-44 w-full shrink-0 overflow-hidden bg-muted sm:h-auto sm:min-h-[188px] sm:w-[min(34%,268px)]">
          <ContentImage
            src={image}
            alt={altText}
            fill
            sizes="(max-width: 640px) 100vw, 280px"
            quality={72}
            className="object-cover opacity-95 transition duration-500 group-hover:scale-[1.03]"
            intrinsicWidth={960}
            intrinsicHeight={720}
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/45 to-transparent p-3 pt-10">
            <span className={`inline-flex items-center gap-1 ${cardTone.badge} px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em]`}>
              <Tag className="h-3 w-3" />
              {category}
            </span>
          </div>
        </div>
        <div className="flex min-w-0 flex-1 flex-col p-5 md:p-6">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <h3 className={`line-clamp-2 text-lg font-semibold leading-snug tracking-[-0.02em] md:text-xl ${cardTone.title}`}>{post.title}</h3>
            <span className={cardTone.pill}>{formatLabel}</span>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2">
            <div className={cardTone.tile}>
              <span className="block text-[9px] font-semibold uppercase tracking-wider text-neutral-500">Type</span>
              <span className="mt-0.5 line-clamp-1 text-xs font-semibold text-neutral-900">{category}</span>
            </div>
            <div className={cardTone.tile}>
              <span className="block text-[9px] font-semibold uppercase tracking-wider text-neutral-500">Area</span>
              <span className="mt-0.5 line-clamp-1 text-xs font-semibold text-neutral-900">{content.location || '—'}</span>
            </div>
            <div className={cardTone.tile}>
              <span className="block text-[9px] font-semibold uppercase tracking-wider text-neutral-500">Lane</span>
              <span className="mt-0.5 line-clamp-1 text-xs font-semibold text-neutral-900">{formatLabel}</span>
            </div>
          </div>
          <p className={`mt-4 line-clamp-3 text-sm leading-relaxed ${cardTone.muted}`}>
            {getExcerpt(content.description || post.summary) || 'Structured entry on moonrocketcoin.net.'}
          </p>
          <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs">
            {content.location ? (
              <span className={`inline-flex items-center gap-1 ${cardTone.muted}`}>
                <MapPin className="h-3.5 w-3.5 text-primary" />
                {content.location}
              </span>
            ) : null}
            {content.email ? (
              <span className={`inline-flex max-w-[200px] items-center gap-1 truncate ${cardTone.muted}`}>
                <Mail className="h-3.5 w-3.5 shrink-0 text-primary" />
                {content.email}
              </span>
            ) : null}
          </div>
          <div className="mt-auto flex items-center justify-between border-t border-black/5 pt-4">
            <span className={`text-sm font-semibold ${cardTone.cta}`}>{variant === 'classified' ? 'View offer' : 'View listing'}</span>
            <ArrowUpRight className={`h-5 w-5 shrink-0 ${cardTone.muted} transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5`} />
          </div>
        </div>
      </Link>
    )
  }

  if (isBookmarkVariant) {
    return (
      <Link href={href} className={`group flex h-full flex-row items-start gap-4 overflow-hidden p-5 transition duration-300 ${visualVariant.frame}`}>
        <div className="mt-1 rounded-full bg-white/10 p-2.5 text-current transition group-hover:scale-105">
          <ExternalLink className="h-4 w-4" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] ${visualVariant.badge}`}>
              <Tag className="h-3.5 w-3.5" />
              {category}
            </span>
            {content.location ? <span className={`inline-flex items-center gap-1 text-xs ${visualVariant.muted}`}><MapPin className="h-3.5 w-3.5" />{content.location}</span> : null}
          </div>
          <h3 className={`mt-3 line-clamp-2 text-lg font-semibold leading-snug group-hover:opacity-85 ${visualVariant.title}`}>{post.title}</h3>
          <p className={`mt-2 line-clamp-3 text-sm leading-7 ${visualVariant.muted}`}>{getExcerpt(content.description || post.summary, compact ? 120 : 180) || 'Explore this bookmark.'}</p>
          {content.email ? <div className={`mt-3 inline-flex items-center gap-1 text-xs ${visualVariant.muted}`}><Mail className="h-3.5 w-3.5" />{content.email}</div> : null}
        </div>
      </Link>
    )
  }

  return (
    <Link href={href} className={`group flex h-full flex-col overflow-hidden transition duration-300 ${visualVariant.frame}`}>
      <div className={`relative ${imageAspect} overflow-hidden bg-[#ede2dc]`}>
        <ContentImage src={image} alt={altText} fill sizes={imageSizes} quality={75} className="object-cover transition-transform duration-500 group-hover:scale-[1.04]" intrinsicWidth={960} intrinsicHeight={720} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent opacity-80" />
        <span className={`absolute left-4 top-4 inline-flex items-center gap-1 rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] ${visualVariant.badge}`}>
          <Tag className="h-3.5 w-3.5" />
          {category}
        </span>
        {variant === 'pdf' && <span className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-white/88 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-950 shadow"><FileText className="h-3.5 w-3.5" />PDF</span>}
      </div>
      <div className={`flex flex-1 flex-col p-5 ${compact ? 'py-4' : ''}`}>
        <h3 className={`line-clamp-2 font-semibold leading-snug ${variant === 'article' ? 'text-[1.35rem]' : 'text-lg'} ${visualVariant.title}`}>{post.title}</h3>
        <p className={`mt-3 text-sm leading-7 ${variant === 'article' ? 'line-clamp-4' : 'line-clamp-3'} ${visualVariant.muted}`}>{getExcerpt(content.description || post.summary) || 'Explore this post.'}</p>
        <div className="mt-auto pt-4">
          {content.location && <div className={`inline-flex items-center gap-1 text-xs ${visualVariant.muted}`}><MapPin className="h-3.5 w-3.5" />{content.location}</div>}
          {content.email && <div className={`mt-2 inline-flex items-center gap-1 text-xs ${visualVariant.muted}`}><Mail className="h-3.5 w-3.5" />{content.email}</div>}
        </div>
      </div>
    </Link>
  )
}
