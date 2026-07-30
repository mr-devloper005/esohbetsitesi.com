'use client'

import { Building2, FileText, Image as ImageIcon, Mail, MapPin, Phone, Sparkles, Bookmark } from 'lucide-react'
import { pagesContent } from '@/editable/content/pages.content'
import { getFactoryState } from '@/design/factory/get-factory-state'
import { getProductKind } from '@/design/factory/get-product-kind'
import { EditableContactLeadForm } from '@/editable/components/EditableContactLeadForm'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'

const tone = {
  shell: 'bg-[var(--slot4-page-bg)] text-[var(--slot4-page-text)]',
  panel: 'border border-[var(--editable-border)] bg-white',
  soft: 'border border-[var(--editable-border)] bg-white',
  muted: 'text-[var(--slot4-muted-text)]',
  action: 'bg-[var(--slot4-accent-fill)] text-[var(--slot4-on-accent)] hover:opacity-90',
}

function getLanes(kind: ReturnType<typeof getProductKind>) {
  if (kind === 'directory') {
    return [
      { icon: Building2, title: 'Business onboarding', body: 'Add listings, verify operational details, and bring your business surface live quickly.' },
      { icon: Phone, title: 'Partnership support', body: 'Talk through bulk publishing, local growth, and operational setup questions.' },
      { icon: MapPin, title: 'Coverage requests', body: 'Need a new geography or category? We can shape the directory around it.' },
    ]
  }
  if (kind === 'editorial') {
    return [
      { icon: FileText, title: 'Editorial submissions', body: 'Pitch essays, columns, and long-form ideas that fit the publication.' },
      { icon: Mail, title: 'Newsletter partnerships', body: 'Coordinate sponsorships, collaborations, and issue-level campaigns.' },
      { icon: Sparkles, title: 'Contributor support', body: 'Get help with voice, formatting, and publication workflow questions.' },
    ]
  }
  if (kind === 'visual') {
    return [
      { icon: ImageIcon, title: 'Creator collaborations', body: 'Discuss gallery launches, creator features, and visual campaigns.' },
      { icon: Sparkles, title: 'Licensing and use', body: 'Reach out about usage rights, commercial requests, and visual partnerships.' },
      { icon: Mail, title: 'Media kits', body: 'Request creator decks, editorial support, or visual feature placement.' },
    ]
  }
  return [
    { icon: Bookmark, title: 'Collection submissions', body: 'Suggest resources, boards, and links that deserve a place in the library.' },
    { icon: Mail, title: 'Resource partnerships', body: 'Coordinate curation projects, reference pages, and link programs.' },
    { icon: Sparkles, title: 'Curator support', body: 'Need help organizing shelves, collections, or profile-connected boards?' },
  ]
}

export default function ContactPage() {
  const { recipe } = getFactoryState()
  const productKind = getProductKind(recipe)
  const lanes = getLanes(productKind)

  return (
    <EditableSiteShell className={tone.shell}>
      <main>
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(135deg,#0f1b4c_0%,#2d1b69_50%,#6c3baa_100%)]" />
          <div className="relative z-10 mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-white/60">{pagesContent.contact.eyebrow}</p>
            <h1 className="editable-display mt-4 max-w-2xl text-4xl font-extrabold italic tracking-[-0.02em] text-white sm:text-5xl">{pagesContent.contact.title}</h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-white/80">{pagesContent.contact.description}</p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
            <div className="space-y-5">
              {lanes.map((lane) => (
                <div key={lane.title} className={`rounded-2xl p-6 transition hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(15,27,76,0.08)] ${tone.soft}`}>
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--slot4-accent-soft)] text-[var(--slot4-accent-fill)]">
                    <lane.icon className="h-5 w-5" />
                  </span>
                  <h2 className="editable-display mt-4 text-lg font-bold">{lane.title}</h2>
                  <p className={`mt-2 text-sm leading-7 ${tone.muted}`}>{lane.body}</p>
                </div>
              ))}
            </div>

            <div className={`rounded-2xl p-7 sm:p-8 ${tone.panel}`}>
              <h2 className="editable-display text-2xl font-bold">{pagesContent.contact.formTitle}</h2>
              <EditableContactLeadForm />
            </div>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
