'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  ArrowRight, Bookmark, Building2, ChevronRight, FileText, Image as ImageIcon,
  MapPin, MessageSquare, Plus, Minus, Search, Shield, Star, Users, Zap,
} from 'lucide-react'
import type { SitePost } from '@/lib/site-connector'
import type { HomeTimeSection } from '@/lib/task-data'
import type { TaskKey } from '@/lib/site-config'
import { SITE_CONFIG } from '@/lib/site-config'
import { pagesContent } from '@/editable/content/pages.content'
import { getEditablePostImage, postHref, toPlainText } from '@/editable/cards/PostCards'
import { EditableHeroCollage } from '@/editable/sections/EditableHeroCollage'

type HomeSectionProps = {
  primaryTask: TaskKey
  primaryRoute: string
  posts: SitePost[]
  timeSections: HomeTimeSection[]
}

const taskIcon: Record<TaskKey, typeof FileText> = {
  article: FileText,
  listing: Building2,
  classified: Zap,
  image: ImageIcon,
  sbm: Bookmark,
  pdf: FileText,
  profile: Users,
}

function getExcerpt(post?: SitePost | null, limit = 130) {
  const content = post?.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
  const raw =
    (typeof content.description === 'string' && content.description) ||
    (typeof content.summary === 'string' && content.summary) ||
    (typeof post?.summary === 'string' && post.summary) ||
    (typeof content.body === 'string' && content.body) ||
    (typeof content.excerpt === 'string' && content.excerpt) ||
    ''
  const clean = toPlainText(raw)
  return clean.length > limit ? `${clean.slice(0, limit).trim()}...` : clean
}

function categoryOf(post?: SitePost | null) {
  const content = post?.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
  return (typeof content.category === 'string' && content.category) || post?.tags?.[0] || ''
}

function hashStr(value: string) {
  let h = 0
  for (let i = 0; i < value.length; i += 1) h = (h * 31 + value.charCodeAt(i)) >>> 0
  return h
}

function ratingOf(post: SitePost) {
  const content = post?.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
  const real = Number(content.rating)
  if (real >= 1 && real <= 5) return Math.round(real * 10) / 10
  const h = hashStr(post.slug || post.id || post.title || 'x')
  return Math.round((3.7 + (h % 13) / 10) * 10) / 10
}

function Stars({ rating, className = 'h-4 w-4' }: { rating: number; className?: string }) {
  const rounded = Math.round(rating)
  return (
    <span className="inline-flex items-center gap-[2px]" aria-label={`${rating} out of 5`}>
      {[0, 1, 2, 3, 4].map((i) => (
        <Star
          key={i}
          className={`${className} ${i < rounded ? 'fill-amber-400 text-amber-400' : 'fill-gray-200 text-gray-200'}`}
        />
      ))}
    </span>
  )
}

const container = 'mx-auto w-full max-w-[var(--editable-container)] px-4 sm:px-6 lg:px-8'

function latestPostImages(posts: SitePost[], max = 8) {
  const seen = new Set<string>()
  const out: string[] = []
  for (const post of posts) {
    const img = getEditablePostImage(post)
    if (!img || img.includes('placeholder') || seen.has(img)) continue
    seen.add(img)
    out.push(img)
    if (out.length >= max) break
  }
  return out
}

function isClassified(post: SitePost) {
  const content = post.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
  const type = typeof content.type === 'string' ? content.type.toLowerCase() : ''
  return type === 'classified' || type === '' || !type
}

function dedupePosts(posts: SitePost[]) {
  const seen = new Set<string>()
  const out: SitePost[] = []
  for (const post of posts.filter(isClassified)) {
    const key = post.slug || post.id || post.title
    if (!key || seen.has(key)) continue
    seen.add(key)
    out.push(post)
  }
  return out
}

/* ─────────────────────────────── Logo strip ──────────────────────────────── */
const BRAND_LOGOS = [
  'Verified Listings', 'Local Services', 'Restaurants', 'Retail Stores',
  'Health & Beauty', 'Auto Services', 'Home Services', 'Professional Services',
  'Entertainment', 'Education', 'Travel & Hotels', 'Finance & Legal',
]

function LogoStrip() {
  return (
    <div className="overflow-hidden border-y border-[var(--editable-border)] bg-white py-10">
      <p className="mb-6 text-center text-xs font-bold uppercase tracking-[0.2em] text-[var(--slot4-muted-text)]">
        Trusted across every category
      </p>
      <div className="flex">
        <div className="auto-scroll-track flex shrink-0 gap-0">
          {[...BRAND_LOGOS, ...BRAND_LOGOS].map((name, i) => (
            <div
              key={i}
              className="mx-4 flex h-16 w-48 shrink-0 items-center justify-center rounded-xl border border-[var(--editable-border)] bg-[var(--slot4-page-bg)] px-6"
            >
              <span className="text-sm font-bold text-[var(--slot4-muted-text)]">{name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ────────────────────────────── Hero section ─────────────────────────────── */
export function EditableHomeHero({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const pool = dedupePosts([...posts, ...timeSections.flatMap((s) => s.posts)])
  const heroImages = latestPostImages(pool)
  const heroTitle = pagesContent.home.hero.title?.join(' ') || `Discover the best of ${SITE_CONFIG.name}`
  const featuredPost = pool[0]

  return (
    <>
      <section className="relative overflow-hidden">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-[linear-gradient(135deg,#0f1b4c_0%,#2d1b69_40%,#6c3baa_70%,#c94da8_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_20%_80%,rgba(201,77,168,0.3),transparent)]" />

        <div className={`relative z-10 py-20 sm:py-28 lg:py-32 ${container}`}>
          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* Left */}
            <div className="fade-in-up">
              <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-white/80 backdrop-blur-sm">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                {pagesContent.home.hero.badge || 'Trusted by thousands'}
              </p>
              <h1 className="editable-display mt-6 text-balance text-4xl font-extrabold italic leading-[1.05] tracking-[-0.02em] text-white sm:text-5xl lg:text-6xl">
                {heroTitle}
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-white/80">{pagesContent.home.hero.description}</p>

              <form action="/search" className="mt-8 flex w-full max-w-lg overflow-hidden rounded-full bg-white shadow-[0_20px_60px_rgba(0,0,0,0.3)]">
                <div className="flex flex-1 items-center gap-2.5 px-5">
                  <Search className="h-5 w-5 shrink-0 text-[#5a6178]" />
                  <input
                    name="q"
                    placeholder={pagesContent.home.hero.searchPlaceholder || 'Search businesses, services...'}
                    className="w-full bg-transparent py-4 text-sm text-[#0f1b4c] outline-none placeholder:text-[#8b90a0]"
                  />
                </div>
                <button
                  type="submit"
                  className="shrink-0 bg-[#6c3baa] px-6 text-sm font-bold text-white transition hover:bg-[#5a2d96] sm:px-8"
                >
                  Search
                </button>
              </form>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link href={primaryRoute} className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-bold text-[#0f1b4c] transition hover:shadow-lg">
                  Browse Listings <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/contact" className="inline-flex items-center gap-2 rounded-full border border-white/30 px-7 py-3 text-sm font-bold text-white transition hover:bg-white/10">
                  Learn More
                </Link>
              </div>
            </div>

            {/* Right: floating featured post card */}
            <div className="relative hidden lg:block">
              <div className="hero-float-animation relative">
                {featuredPost ? (
                  <Link href={postHref(primaryTask, featuredPost, primaryRoute)} className="group block overflow-hidden rounded-2xl bg-white shadow-[0_32px_80px_rgba(0,0,0,0.25)]">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      {heroImages[0] ? (
                        <img src={heroImages[0]} alt="" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                      ) : (
                        <div className="h-full w-full bg-[var(--slot4-media-bg)]" />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                      <span className="absolute left-4 top-4 rounded-full bg-[#6c3baa] px-3 py-1 text-xs font-bold text-white">Featured</span>
                    </div>
                    <div className="p-6">
                      <h3 className="editable-display line-clamp-2 text-lg font-bold text-[#0f1b4c]">{featuredPost.title}</h3>
                      <p className="mt-2 line-clamp-2 text-sm text-[#5a6178]">{getExcerpt(featuredPost, 100)}</p>
                      <div className="mt-3 flex items-center gap-2">
                        <Stars rating={ratingOf(featuredPost)} className="h-3.5 w-3.5" />
                        <span className="text-xs font-medium text-[#5a6178]">{ratingOf(featuredPost).toFixed(1)}</span>
                      </div>
                    </div>
                  </Link>
                ) : null}
              </div>
              <div className="hero-glow pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-[#c94da8]/20 blur-3xl" />
              <div className="hero-glow pointer-events-none absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-[#6c3baa]/20 blur-3xl" />
            </div>
          </div>

          {/* Stats strip */}
          <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { icon: Building2, label: 'Verified Businesses', value: 'Trusted' },
              { icon: Star, label: 'Community Reviews', value: 'Rated' },
              { icon: MapPin, label: 'Local Discovery', value: 'Nearby' },
              { icon: Zap, label: 'Updated Daily', value: 'Fresh' },
            ].map((stat) => (
              <div key={stat.label} className="rounded-2xl bg-white/10 px-5 py-4 backdrop-blur-sm">
                <stat.icon className="h-5 w-5 text-white/70" />
                <p className="mt-2 text-sm font-bold text-white">{stat.value}</p>
                <p className="text-xs text-white/60">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Auto-scrolling logo strip */}
      <LogoStrip />
    </>
  )
}

/* ──────────────────────────── Browse by category ─────────────────────────── */
export function EditableStoryRail({ primaryRoute }: HomeSectionProps) {
  const categories = SITE_CONFIG.tasks.filter((t) => t.enabled && t.key === 'classified')
  if (!categories.length) return null
  return (
    <section className="bg-[var(--slot4-page-bg)]">
      <div className={`py-16 sm:py-20 ${container}`}>
        <div className="text-center">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-[var(--slot4-accent-fill)]">Categories</p>
          <h2 className="editable-display mt-3 text-3xl font-extrabold italic tracking-[-0.02em] sm:text-4xl">Browse by category</h2>
          <p className="mx-auto mt-4 max-w-2xl text-[var(--slot4-muted-text)]">Jump straight to what you are looking for across all sections of our platform.</p>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {categories.map((task) => {
            const Icon = taskIcon[task.key] || FileText
            return (
              <Link
                key={task.key}
                href={task.route}
                className="group flex flex-col items-center gap-4 rounded-2xl border border-[var(--editable-border)] bg-white px-4 py-8 text-center transition duration-300 hover:-translate-y-1 hover:border-[var(--slot4-accent-fill)] hover:shadow-[0_12px_36px_rgba(15,27,76,0.1)]"
              >
                <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--slot4-accent-soft)] text-[var(--slot4-accent-fill)] transition group-hover:bg-[var(--slot4-accent-fill)] group-hover:text-white">
                  <Icon className="h-7 w-7" />
                </span>
                <span className="text-sm font-bold text-[var(--slot4-page-text)]">{task.label}</span>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────── Recent activity / Magazine split ────────────────── */
function FeaturedCard({ post, href }: { post: SitePost; href: string }) {
  const image = getEditablePostImage(post)
  const category = categoryOf(post)
  return (
    <Link href={href} className="group relative block overflow-hidden rounded-2xl bg-[#0f1b4c]">
      <div className="relative aspect-[16/10] overflow-hidden">
        <img src={image} alt={post.title} className="absolute inset-0 h-full w-full object-cover opacity-80 transition duration-700 group-hover:scale-105 group-hover:opacity-90" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f1b4c] via-[#0f1b4c]/40 to-transparent" />
      </div>
      <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
        {category ? <span className="rounded-full bg-[#6c3baa] px-3 py-1 text-xs font-bold text-white">{category}</span> : null}
        <h3 className="editable-display mt-3 text-2xl font-bold leading-snug text-white sm:text-3xl">{post.title}</h3>
        <p className="mt-3 line-clamp-2 text-sm leading-6 text-white/70">{getExcerpt(post, 150)}</p>
        <div className="mt-4 flex items-center gap-3">
          <Stars rating={ratingOf(post)} className="h-4 w-4" />
          <span className="text-sm font-medium text-white/80">{ratingOf(post).toFixed(1)}</span>
        </div>
      </div>
    </Link>
  )
}

function CompactHorizontalCard({ post, href }: { post: SitePost; href: string }) {
  const image = getEditablePostImage(post)
  const category = categoryOf(post)
  return (
    <Link href={href} className="group flex gap-4 rounded-2xl border border-[var(--editable-border)] bg-white p-4 transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(15,27,76,0.08)]">
      <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-[var(--slot4-media-bg)]">
        <img src={image} alt={post.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" loading="lazy" />
      </div>
      <div className="min-w-0 flex-1">
        {category ? <span className="text-xs font-bold uppercase tracking-[0.1em] text-[var(--slot4-accent-fill)]">{category}</span> : null}
        <h3 className="mt-1 line-clamp-2 text-[15px] font-bold leading-snug text-[var(--slot4-page-text)] group-hover:text-[var(--slot4-accent-fill)]">{post.title}</h3>
        <div className="mt-2 flex items-center gap-2">
          <Stars rating={ratingOf(post)} className="h-3 w-3" />
          <span className="text-xs text-[var(--slot4-muted-text)]">{ratingOf(post).toFixed(1)}</span>
        </div>
      </div>
    </Link>
  )
}

function EditorialCard({ post, href }: { post: SitePost; href: string }) {
  const image = getEditablePostImage(post)
  const category = categoryOf(post)
  return (
    <Link href={href} className="group block overflow-hidden rounded-2xl border border-[var(--editable-border)] bg-white transition duration-300 hover:-translate-y-1 hover:shadow-[0_12px_36px_rgba(15,27,76,0.1)]">
      <div className="relative aspect-[16/10] overflow-hidden bg-[var(--slot4-media-bg)]">
        <img src={image} alt={post.title} className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]" loading="lazy" />
        {category ? <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-[11px] font-bold text-[var(--slot4-page-text)] shadow-sm">{category}</span> : null}
      </div>
      <div className="p-5">
        <h3 className="line-clamp-2 text-base font-bold leading-snug text-[var(--slot4-page-text)] group-hover:text-[var(--slot4-accent-fill)]">{post.title}</h3>
        <p className="mt-2 line-clamp-2 text-sm leading-6 text-[var(--slot4-muted-text)]">{getExcerpt(post, 100)}</p>
        <div className="mt-3 flex items-center gap-2">
          <Stars rating={ratingOf(post)} className="h-3.5 w-3.5" />
          <span className="text-xs font-medium text-[var(--slot4-muted-text)]">{ratingOf(post).toFixed(1)}</span>
        </div>
      </div>
    </Link>
  )
}

/* Purple gradient feature section */
const FEATURES = [
  { title: 'From scattered searches to centralized discovery', body: 'Bring every business, service, and review into one connected platform so customers find exactly what they need, fast.' },
  { title: 'Turn invisible businesses into growth engines', body: null },
  { title: 'High visibility, low effort', body: null },
  { title: 'Turn data into better decisions', body: null },
]

function FeatureSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(135deg,#2d1b69_0%,#6c3baa_50%,#c94da8_100%)]" />
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle,rgba(255,255,255,0.15) 1px,transparent 1px)', backgroundSize: '28px 28px' }} />
      <div className={`relative z-10 py-20 sm:py-28 ${container}`}>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <h2 className="editable-display text-3xl font-extrabold italic leading-tight text-white sm:text-4xl lg:text-5xl">
              Unlock the power of connection and scale
            </h2>
            <div className="mt-10 space-y-6">
              {FEATURES.map((f) => (
                <div key={f.title}>
                  <h3 className="text-lg font-bold text-white">{f.title}</h3>
                  {f.body ? <p className="mt-2 text-sm leading-7 text-white/70">{f.body}</p> : null}
                </div>
              ))}
            </div>
          </div>
          {/* Mockup panel */}
          <div className="relative hidden lg:block">
            <div className="overflow-hidden rounded-2xl border border-white/20 bg-white/10 p-1 shadow-[0_32px_80px_rgba(0,0,0,0.3)] backdrop-blur-sm">
              <div className="overflow-hidden rounded-xl bg-[#0a0f2e] p-6">
                <div className="mb-4 flex items-center gap-2">
                  <div className="h-2.5 w-2.5 rounded-full bg-red-400" />
                  <div className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
                  <div className="h-2.5 w-2.5 rounded-full bg-green-400" />
                  <span className="ml-3 rounded-full bg-white/10 px-4 py-1 text-xs text-white/60">{SITE_CONFIG.domain}</span>
                </div>
                <div className="space-y-3">
                  <div className="h-8 w-3/4 rounded-lg bg-[#6c3baa]/40" />
                  <div className="grid grid-cols-3 gap-3">
                    {[...Array(6)].map((_, i) => (
                      <div key={i} className="h-20 rounded-xl bg-white/10" />
                    ))}
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="h-32 rounded-xl bg-white/10" />
                    <div className="space-y-3">
                      <div className="h-14 rounded-xl bg-white/10" />
                      <div className="h-14 rounded-xl bg-white/10" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
          </div>
        </div>
      </div>
    </section>
  )
}

/* Testimonial / stats gradient cards */
const TESTIMONIALS = [
  {
    gradient: 'bg-[linear-gradient(135deg,#6c3baa,#2d1b69)]',
    company: 'Restaurant District',
    role: 'Business Owner',
    quote: 'Since listing on this platform, our foot traffic has doubled and new customers mention finding us here almost every day.',
    stat: '2×',
    statLabel: 'More customer inquiries',
  },
  {
    gradient: 'bg-[linear-gradient(135deg,#3b5bdb,#1971c2)]',
    company: 'Local Services Hub',
    role: 'Operations Manager',
    quote: 'Our team can now manage multiple business locations from one dashboard. The directory made our expansion effortless.',
    stat: '300+',
    statLabel: 'Verified businesses on platform',
  },
  {
    gradient: 'bg-[linear-gradient(135deg,#c94da8,#6c3baa)]',
    company: 'Retail Network',
    role: 'Marketing Director',
    quote: 'Customers trust businesses they find here. The verified badges and community reviews gave our brand instant credibility.',
    stat: '+27',
    statLabel: 'NPS score improvement',
  },
]

function TestimonialCards() {
  return (
    <div className="overflow-hidden bg-[var(--slot4-page-bg)] py-16 sm:py-20">
      <div className={container}>
        <div className="mb-10 text-center">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-[var(--slot4-accent-fill)]">Success stories</p>
          <h2 className="editable-display mt-3 text-3xl font-extrabold italic tracking-[-0.02em] sm:text-4xl">Businesses love being discovered</h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <div key={t.company} className={`relative flex flex-col overflow-hidden rounded-2xl p-7 shadow-[0_12px_40px_rgba(15,27,76,0.18)] ${t.gradient}`}>
              <div className="mb-4 inline-flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-xs font-bold text-white">
                  {t.company[0]}
                </span>
                <div>
                  <p className="text-sm font-bold text-white">{t.company}</p>
                  <p className="text-[11px] text-white/70">{t.role}</p>
                </div>
              </div>
              <blockquote className="flex-1 text-sm leading-7 text-white/90">"{t.quote}"</blockquote>
              <div className="mt-6 border-t border-white/20 pt-5">
                <p className="text-3xl font-extrabold italic text-white">{t.stat}</p>
                <p className="mt-1 text-xs font-medium text-white/70">{t.statLabel}</p>
                <Link href="/contact" className="mt-4 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-[0.1em] text-white/80 transition hover:text-white">
                  Read story <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ─────────────────── Classified posts text list ─────────────────────────── */

function getPrice(post: SitePost) {
  const content = post.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
  const price = content.price ?? content.amount ?? content.cost ?? ''
  return typeof price === 'string' || typeof price === 'number' ? String(price).trim() : ''
}

function ClassifiedRow({ post, href }: { post: SitePost; href: string }) {
  const category = categoryOf(post)
  const excerpt = getExcerpt(post, 180)
  const price = getPrice(post)
  return (
    <Link
      href={href}
      className="group flex flex-col gap-3 rounded-2xl border border-[var(--editable-border)] bg-white p-5 transition hover:-translate-y-0.5 hover:border-[var(--slot4-accent-fill)] hover:shadow-[0_8px_24px_rgba(15,27,76,0.08)] sm:flex-row sm:items-start sm:gap-5"
    >
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          {category ? (
            <span className="rounded-full bg-[var(--slot4-accent-soft)] px-3 py-0.5 text-[11px] font-bold uppercase tracking-[0.08em] text-[var(--slot4-accent-fill)]">
              {category}
            </span>
          ) : null}
          {price ? (
            <span className="rounded-full bg-emerald-50 px-3 py-0.5 text-[11px] font-bold text-emerald-700">
              {price.startsWith('$') || price.startsWith('£') || price.startsWith('€') ? price : `$${price}`}
            </span>
          ) : null}
        </div>
        <h3 className="mt-2 text-base font-bold leading-snug text-[var(--slot4-page-text)] group-hover:text-[var(--slot4-accent-fill)]">
          {post.title}
        </h3>
        {excerpt ? (
          <p className="mt-2 text-sm leading-6 text-[var(--slot4-muted-text)]">{excerpt}</p>
        ) : null}
      </div>
      <span className="shrink-0 self-start rounded-full border border-[var(--editable-border)] px-4 py-2 text-xs font-bold text-[var(--slot4-page-text)] transition group-hover:border-[var(--slot4-accent-fill)] group-hover:text-[var(--slot4-accent-fill)]">
        View →
      </span>
    </Link>
  )
}

function ClassifiedSection({ posts, primaryTask, primaryRoute }: { posts: SitePost[]; primaryTask: TaskKey; primaryRoute: string }) {
  const items = dedupePosts(posts).slice(0, 6)
  if (!items.length) return null
  return (
    <section className="bg-[var(--slot4-page-bg)]">
      <div className={`py-16 sm:py-20 ${container}`}>
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-[var(--slot4-accent-fill)]">Marketplace</p>
            <h2 className="editable-display mt-3 text-3xl font-extrabold italic tracking-[-0.02em] sm:text-4xl">Latest classifieds</h2>
            <p className="mt-3 max-w-xl text-[var(--slot4-muted-text)]">Browse fresh listings — services, products, and opportunities posted by verified members.</p>
          </div>
          <Link
            href={primaryRoute}
            className="hidden items-center gap-1 rounded-full border border-[var(--editable-border)] px-5 py-2.5 text-sm font-bold text-[var(--slot4-page-text)] transition hover:border-[var(--slot4-accent-fill)] hover:text-[var(--slot4-accent-fill)] sm:inline-flex"
          >
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-8 grid gap-4">
          {items.map((post) => (
            <ClassifiedRow key={post.id || post.slug} post={post} href={postHref(primaryTask, post, primaryRoute)} />
          ))}
        </div>
        <div className="mt-6 text-center sm:hidden">
          <Link href={primaryRoute} className="inline-flex items-center gap-2 rounded-full border border-[var(--editable-border)] px-6 py-2.5 text-sm font-bold transition hover:border-[var(--slot4-accent-fill)] hover:text-[var(--slot4-accent-fill)]">
            View all classifieds <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}

export function EditableMagazineSplit({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const activity = dedupePosts([...posts, ...timeSections.flatMap((s) => s.posts)]).slice(0, 9)
  const featured = activity[0]
  const side = activity.slice(1, 4)
  const grid = activity.slice(4, 8)

  return (
    <>
      {/* Purple feature section */}
      <FeatureSection />

      {/* Recent posts */}
      {activity.length ? (
        <section className="bg-white">
          <div className={`py-16 sm:py-20 ${container}`}>
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.16em] text-[var(--slot4-accent-fill)]">Recent activity</p>
                <h2 className="editable-display mt-3 text-3xl font-extrabold italic tracking-[-0.02em] sm:text-4xl">Latest listings and posts</h2>
              </div>
              <Link href={primaryRoute} className="hidden items-center gap-1 rounded-full border border-[var(--editable-border)] px-5 py-2.5 text-sm font-bold text-[var(--slot4-page-text)] transition hover:border-[var(--slot4-accent-fill)] hover:text-[var(--slot4-accent-fill)] sm:inline-flex">
                View all <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="mt-10 grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
              {featured ? <FeaturedCard post={featured} href={postHref(primaryTask, featured, primaryRoute)} /> : null}
              <div className="grid gap-4">
                {side.map((post) => (
                  <CompactHorizontalCard key={post.id || post.slug} post={post} href={postHref(primaryTask, post, primaryRoute)} />
                ))}
              </div>
            </div>

            {grid.length ? (
              <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {grid.map((post) => (
                  <EditorialCard key={post.id || post.slug} post={post} href={postHref(primaryTask, post, primaryRoute)} />
                ))}
              </div>
            ) : null}
          </div>
        </section>
      ) : null}

      {/* Testimonial cards */}
      <TestimonialCards />

      {/* Classified posts text section */}
      <ClassifiedSection posts={[...posts, ...timeSections.flatMap((s) => s.posts)]} primaryTask={primaryTask} primaryRoute={primaryRoute} />
    </>
  )
}

/* ─────────────────────── Time-based discovery sections ───────────────────── */
const sectionCopy: Record<string, { eyebrow: string; title: string }> = {
  spotlight: { eyebrow: 'Fresh this week', title: 'Newly added this week' },
  browse: { eyebrow: 'Trending now', title: 'Popular this month' },
  index: { eyebrow: 'Evergreen', title: 'From the archive' },
}

function TimeCard({ post, href }: { post: SitePost; href: string }) {
  const image = getEditablePostImage(post)
  const category = categoryOf(post)
  return (
    <Link href={href} className="group flex flex-col overflow-hidden rounded-2xl border border-[var(--editable-border)] bg-white transition duration-300 hover:-translate-y-1 hover:shadow-[0_12px_36px_rgba(15,27,76,0.1)]">
      <div className="relative aspect-[3/2] overflow-hidden bg-[var(--slot4-media-bg)]">
        <img src={image} alt={post.title} className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]" loading="lazy" />
        {category ? (
          <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-[11px] font-bold text-[var(--slot4-page-text)] shadow-sm">{category}</span>
        ) : null}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="line-clamp-2 text-base font-bold leading-snug text-[var(--slot4-page-text)] group-hover:text-[var(--slot4-accent-fill)]">{post.title}</h3>
        <p className="mt-2 line-clamp-2 flex-1 text-sm leading-6 text-[var(--slot4-muted-text)]">{getExcerpt(post, 100)}</p>
        <div className="mt-3 flex items-center gap-2">
          <Stars rating={ratingOf(post)} className="h-3.5 w-3.5" />
          <span className="text-xs font-medium text-[var(--slot4-muted-text)]">{ratingOf(post).toFixed(1)}</span>
        </div>
      </div>
    </Link>
  )
}

export function EditableTimeCollections({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const sections =
    timeSections.length > 0
      ? timeSections
      : ([
          { key: 'spotlight', posts: posts.slice(0, 8), href: primaryRoute },
          { key: 'browse', posts: posts.slice(8, 16), href: primaryRoute },
          { key: 'index', posts: posts.slice(16, 24), href: primaryRoute },
        ] as Pick<HomeTimeSection, 'key' | 'posts' | 'href'>[])

  const visible = sections.filter((s) => s.posts.length)
  if (!visible.length) return null

  return (
    <>
      {visible.map((section, index) => {
        const copy = sectionCopy[section.key] || { eyebrow: 'Discover', title: 'More to explore' }
        const isAlt = index % 2 !== 0
        return (
          <section key={section.key} className={isAlt ? 'bg-white' : 'bg-[var(--slot4-page-bg)]'}>
            <div className={`py-16 sm:py-20 ${container}`}>
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.16em] text-[var(--slot4-accent-fill)]">{copy.eyebrow}</p>
                  <h2 className="editable-display mt-3 text-3xl font-extrabold italic tracking-[-0.02em] sm:text-4xl">{copy.title}</h2>
                </div>
                <Link href={section.href || primaryRoute} className="hidden items-center gap-1 rounded-full border border-[var(--editable-border)] px-5 py-2.5 text-sm font-bold transition hover:border-[var(--slot4-accent-fill)] hover:text-[var(--slot4-accent-fill)] sm:inline-flex">
                  See all <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {section.posts.slice(0, 8).map((post) => (
                  <TimeCard key={post.id || post.slug} post={post} href={postHref(primaryTask, post, primaryRoute)} />
                ))}
              </div>
            </div>
          </section>
        )
      })}
    </>
  )
}

/* ──────────────────── FAQ accordion ─────────────────────────────────────── */
const FAQ_ITEMS = [
  { q: 'How do I list my business on the platform?', a: 'Simply create an account, click "Add Your Business", fill in your business details including name, category, description, contact info, and images, then submit for review. Most listings go live within 24 hours.' },
  { q: 'Is it free to list my business?', a: 'Yes, basic business listings are completely free. You can create a full profile with your business details, contact information, and photos at no cost.' },
  { q: 'How do customer reviews work?', a: 'Verified customers can leave reviews and ratings on your business listing. Reviews help build trust and improve your visibility in search results. You can respond to reviews to show customer engagement.' },
  { q: 'Can I manage multiple business locations?', a: 'Yes, a single account allows you to manage multiple business locations and listings. Each location gets its own dedicated profile page with separate reviews and contact details.' },
  { q: 'How do I update or edit my business information?', a: 'Log in to your account, navigate to your listing, and click "Edit". You can update any information at any time, and changes are reflected immediately on your public listing.' },
]

function FaqSection() {
  const [open, setOpen] = useState<number | null>(null)
  return (
    <section className="bg-[var(--slot4-page-bg)]">
      <div className={`py-16 sm:py-20 ${container}`}>
        <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:items-start">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-[var(--slot4-accent-fill)]">FAQ</p>
            <h2 className="editable-display mt-3 text-3xl font-extrabold italic tracking-[-0.02em] sm:text-4xl">Frequently asked questions</h2>
            <p className="mt-5 text-[var(--slot4-muted-text)]">Have more questions? <Link href="/contact" className="font-bold text-[var(--slot4-accent-fill)] underline-offset-2 hover:underline">Contact us</Link></p>
          </div>
          <div className="divide-y divide-[var(--editable-border)]">
            {FAQ_ITEMS.map((item, i) => (
              <div key={i}>
                <button
                  type="button"
                  onClick={() => setOpen(open === i ? null : i)}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left text-[15px] font-bold text-[var(--slot4-page-text)] transition hover:text-[var(--slot4-accent-fill)]"
                >
                  {item.q}
                  {open === i
                    ? <Minus className="h-5 w-5 shrink-0 text-[var(--slot4-accent-fill)]" />
                    : <Plus className="h-5 w-5 shrink-0 text-[var(--slot4-muted-text)]" />
                  }
                </button>
                {open === i ? (
                  <p className="pb-5 text-sm leading-7 text-[var(--slot4-muted-text)]">{item.a}</p>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─────────────── Security / Trust badges section ─────────────────────────── */
function TrustSection() {
  return (
    <section className="border-y border-[var(--editable-border)] bg-white">
      <div className={`py-14 sm:py-16 ${container}`}>
        <div className="grid gap-10 sm:grid-cols-2">
          <div>
            <div className="mb-5 flex flex-wrap gap-3">
              {['Verified Listings', 'Secure Platform', 'Privacy First', 'GDPR Ready'].map((badge) => (
                <span key={badge} className="flex items-center gap-1.5 rounded-xl border border-[var(--editable-border)] bg-[var(--slot4-page-bg)] px-4 py-3 text-sm font-bold text-[var(--slot4-page-text)]">
                  <Shield className="h-4 w-4 text-[var(--slot4-accent-fill)]" />
                  {badge}
                </span>
              ))}
            </div>
            <h3 className="editable-display text-xl font-bold">Stay trusted, secure, and compliant</h3>
            <Link href="/about" className="mt-3 inline-flex items-center gap-1 text-sm font-bold uppercase tracking-[0.08em] text-[var(--slot4-accent-fill)] hover:underline">
              Our standards <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div>
            <div className="mb-5 flex flex-wrap gap-3">
              {['Business Listings', 'Reviews & Ratings', 'Photo Gallery', 'Contact Forms'].map((int) => (
                <span key={int} className="flex items-center gap-1.5 rounded-xl border border-[var(--editable-border)] bg-[var(--slot4-page-bg)] px-4 py-3 text-sm font-bold text-[var(--slot4-page-text)]">
                  <Zap className="h-4 w-4 text-[var(--slot4-accent-fill)]" />
                  {int}
                </span>
              ))}
            </div>
            <h3 className="editable-display text-xl font-bold">Platform features that keep you connected</h3>
            <Link href="/listing" className="mt-3 inline-flex items-center gap-1 text-sm font-bold uppercase tracking-[0.08em] text-[var(--slot4-accent-fill)] hover:underline">
              Explore features <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────── CTA band ────────────────────────────────── */
export function EditableHomeCta() {
  return (
    <>
      <FaqSection />
      <TrustSection />

      {/* Soft cloud CTA */}
      <section className="relative overflow-hidden bg-[var(--slot4-lavender)]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_50%,rgba(201,77,168,0.08),transparent)]" />
        <div className={`relative z-10 flex flex-col items-center gap-6 py-20 text-center sm:py-24 ${container}`}>
          <h2 className="editable-display max-w-2xl text-3xl font-extrabold italic tracking-[-0.02em] text-[var(--slot4-page-text)] sm:text-4xl">
            See {SITE_CONFIG.name} in action
          </h2>
          <p className="max-w-lg text-base text-[var(--slot4-muted-text)]">
            Browse thousands of verified business listings and find exactly what you need in your area.
          </p>
          <Link href="/listing" className="inline-flex items-center gap-2 rounded-full bg-[#6c3baa] px-8 py-3.5 text-sm font-bold text-white transition hover:brightness-110">
            Browse All Listings <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Final gradient CTA */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,#0f1b4c_0%,#2d1b69_50%,#6c3baa_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(201,77,168,0.2),transparent_60%)]" />
        <div className={`relative z-10 flex flex-col items-center gap-8 py-20 text-center sm:py-28 ${container}`}>
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-white/60">Get started today</p>
          <h2 className="editable-display max-w-3xl text-4xl font-extrabold italic tracking-[-0.02em] text-white sm:text-5xl">
            Ready to grow your business visibility?
          </h2>
          <p className="max-w-xl text-lg text-white/80">
            List your business on {SITE_CONFIG.name} and connect with customers who are actively looking for your services.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/create" className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-bold text-[#0f1b4c] transition hover:shadow-lg">
              Add Your Business <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/contact" className="inline-flex items-center gap-2 rounded-full border border-white/40 px-8 py-3.5 text-sm font-bold text-white transition hover:bg-white/10">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
