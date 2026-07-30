'use client'

import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { globalContent } from '@/editable/content/global.content'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'

export function EditableFooter() {
  const taskLinks = SITE_CONFIG.tasks.filter((task) => task.enabled && task.key === 'classified')
  const year = new Date().getFullYear()
  const { session, logout } = useEditableLocalAuthSession()

  return (
    <footer className="bg-[var(--editable-footer-bg)] text-[var(--editable-footer-text)]">
      <div className="mx-auto max-w-[var(--editable-container)] px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <span className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl bg-white/10">
                <img src="/favicon.png?v=20260413" alt={SITE_CONFIG.name} className="h-full w-full object-cover brightness-0 invert" />
              </span>
              <span className="editable-display text-xl font-bold">{SITE_CONFIG.name}</span>
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-7 text-white/60">{globalContent.footer?.description || SITE_CONFIG.description}</p>
          </div>

          {/* Explore column */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.12em] text-white/40">Explore</h3>
            <div className="mt-5 grid gap-3">
              {taskLinks.map((task) => (
                <Link key={task.key} href={task.route} className="inline-flex items-center gap-1.5 text-sm text-white/70 transition hover:text-white">
                  {task.label} <ArrowUpRight className="h-3.5 w-3.5 opacity-50" />
                </Link>
              ))}
            </div>
          </div>

          {/* Company column */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.12em] text-white/40">Company</h3>
            <div className="mt-5 grid gap-3">
              <Link href="/about" className="text-sm text-white/70 transition hover:text-white">About Us</Link>
              <Link href="/contact" className="text-sm text-white/70 transition hover:text-white">Contact</Link>
              <Link href="/search" className="text-sm text-white/70 transition hover:text-white">Search</Link>
            </div>
          </div>

          {/* Account column */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.12em] text-white/40">Account</h3>
            <div className="mt-5 grid gap-3">
              {session ? (
                <>
                  <Link href="/create" className="text-sm text-white/70 transition hover:text-white">Create Listing</Link>
                  <button type="button" onClick={logout} className="text-left text-sm text-white/70 transition hover:text-white">Logout</button>
                </>
              ) : (
                <>
                  <Link href="/login" className="text-sm text-white/70 transition hover:text-white">Sign In</Link>
                  <Link href="/signup" className="text-sm text-white/70 transition hover:text-white">Create Account</Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Copyright bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-[var(--editable-container)] flex-col items-center justify-between gap-4 px-4 py-6 sm:flex-row sm:px-6 lg:px-8">
          <p className="text-xs text-white/40">&copy; {year} {SITE_CONFIG.name}. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/about" className="text-xs text-white/40 transition hover:text-white/70">Privacy Policy</Link>
            <Link href="/contact" className="text-xs text-white/40 transition hover:text-white/70">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
