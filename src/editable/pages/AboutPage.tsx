import { SITE_CONFIG } from '@/lib/site-config'
import { pagesContent } from '@/editable/content/pages.content'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'

export default function AboutPage() {
  return (
    <EditableSiteShell>
      <main>
        {/* Hero section with gradient */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(135deg,#0f1b4c_0%,#2d1b69_50%,#6c3baa_100%)]" />
          <div className="relative z-10 mx-auto max-w-[var(--editable-container)] px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-white/60">{pagesContent.about.badge}</p>
            <h1 className="editable-display mt-4 max-w-3xl text-4xl font-extrabold italic tracking-[-0.02em] text-white sm:text-5xl lg:text-6xl">About {SITE_CONFIG.name}</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/80">{pagesContent.about.description}</p>
          </div>
        </section>

        {/* Content section */}
        <section className="bg-[var(--slot4-page-bg)]">
          <div className="mx-auto max-w-[var(--editable-container)] px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
              <article className="rounded-2xl border border-[var(--editable-border)] bg-white p-8 lg:p-12">
                <div className="space-y-5 text-[15px] leading-8 text-[var(--slot4-muted-text)]">
                  {pagesContent.about.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                </div>
              </article>
              <aside className="space-y-5">
                {pagesContent.about.values.map((value) => (
                  <div key={value.title} className="rounded-2xl border border-[var(--editable-border)] bg-white p-7 transition hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(15,27,76,0.08)]">
                    <h2 className="editable-display text-xl font-bold text-[var(--slot4-page-text)]">{value.title}</h2>
                    <p className="mt-3 text-sm leading-7 text-[var(--slot4-muted-text)]">{value.description}</p>
                  </div>
                ))}
              </aside>
            </div>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
