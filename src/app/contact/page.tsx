'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import {
  CheckCircleIcon,
  ChevronRightIcon,
  ClockIcon,
  EnvelopeIcon,
  MapPinIcon,
  PaperAirplaneIcon,
  PhoneIcon,
} from '@heroicons/react/24/outline';

const MAX_MESSAGE = 500;

const inputClasses =
  'h-12 w-full rounded-xl border border-black/10 bg-neutral-50 pl-11 pr-4 text-sm text-[var(--ink)] ' +
  'transition-colors duration-150 placeholder:text-neutral-400 focus:border-black focus:bg-white ' +
  'focus:outline-none focus:ring-2 focus:ring-black/10';

/** Business hours: Mon-Fri 9-18, Sat 10-16, Sun closed (local time). */
function isOpenNow(date = new Date()): boolean {
  const day = date.getDay(); // 0 = Sunday
  const hour = date.getHours();
  if (day === 0) return false;
  if (day === 6) return hour >= 10 && hour < 16;
  return hour >= 9 && hour < 18;
}

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(isOpenNow()), []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'message' ? value.slice(0, MAX_MESSAGE) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    // simulate a network round-trip; swap for an API route / Supabase later
    setTimeout(() => setStatus('success'), 900);
  };

  const messageLength = formData.message.length;
  const canSubmit = useMemo(
    () =>
      formData.name.trim() &&
      formData.email.trim() &&
      formData.subject.trim() &&
      formData.message.trim(),
    [formData],
  );

  return (
    <div className="w-full bg-white">
      <div className="px-4 py-12 sm:px-8">
        <div className="mx-auto max-w-screen-xl">
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-1.5 text-sm">
            <Link href="/" className="text-[var(--muted)] transition-colors hover:text-[var(--ink)]">
              Home
            </Link>
            <ChevronRightIcon className="h-3 w-3 text-[var(--muted)]" />
            <span className="text-[var(--ink)]">Contact</span>
          </nav>

          <h1 className="font-heading text-3xl font-extrabold tracking-tight text-[var(--ink)] md:text-4xl">
            Contact Us
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-[var(--muted)]">
            Have a question or feedback? We&apos;d love to hear from you — fill out the
            form and we&apos;ll get back to you within one business day.
          </p>

          <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
            {/* Form card */}
            <div className="rounded-3xl border border-black/5 bg-white p-6 shadow-soft md:p-8">
              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-[var(--ink)]"
                    >
                      Name
                    </label>
                    <div className="relative">
                      <svg className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-[var(--muted)]" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.25a7.5 7.5 0 1115 0v.75h-15v-.75z" />
                      </svg>
                      <input
                        id="contact-name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        className={inputClasses}
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="contact-email"
                      className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-[var(--ink)]"
                    >
                      Email
                    </label>
                    <div className="relative">
                      <EnvelopeIcon
                        className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-[var(--muted)]"
                        aria-hidden="true"
                      />
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        className={inputClasses}
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="contact-phone"
                      className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-[var(--ink)]"
                    >
                      Phone
                    </label>
                    <div className="relative">
                      <PhoneIcon
                        className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-[var(--muted)]"
                        aria-hidden="true"
                      />
                      <input
                        id="contact-phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+92 300 1234567"
                        className={inputClasses}
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="contact-subject"
                      className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-[var(--ink)]"
                    >
                      Subject
                    </label>
                    <div className="relative">
                      <svg className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-[var(--muted)]" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                      </svg>
                      <input
                        id="contact-subject"
                        name="subject"
                        type="text"
                        required
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="How can we help?"
                        className={inputClasses}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <div className="mb-1.5 flex items-center justify-between">
                    <label
                      htmlFor="contact-message"
                      className="block text-xs font-bold uppercase tracking-wide text-[var(--ink)]"
                    >
                      Message
                    </label>
                    <span
                      className={`text-xs tabular-nums ${
                        messageLength >= MAX_MESSAGE ? 'text-red-500' : 'text-[var(--muted)]'
                      }`}
                      aria-live="polite"
                    >
                      {messageLength}/{MAX_MESSAGE}
                    </span>
                  </div>
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us more about your inquiry..."
                    className="w-full resize-none rounded-xl border border-black/10 bg-neutral-50 p-4 text-sm text-[var(--ink)] transition-colors duration-150 placeholder:text-neutral-400 focus:border-black focus:bg-white focus:outline-none focus:ring-2 focus:ring-black/10"
                  />
                </div>

                <div aria-live="polite">
                  {status === 'success' ? (
                    <div className="flex h-12 items-center justify-center gap-2 rounded-xl bg-neutral-100 text-sm font-semibold text-black">
                      <CheckCircleIcon className="h-5 w-5" aria-hidden="true" />
                      Thank you! Your message has been sent.
                    </div>
                  ) : (
                    <button
                      type="submit"
                      disabled={!canSubmit || status === 'loading'}
                      className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-black text-sm font-bold text-white shadow-sm transition duration-200 hover:bg-neutral-800 focus:outline-none focus-visible:ring-[3px] focus-visible:ring-black/10 disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none"
                    >
                      {status === 'loading' ? (
                        <>
                          <span
                            className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"
                            aria-hidden="true"
                          />
                          Sending...
                        </>
                      ) : (
                        <>
                          <PaperAirplaneIcon className="h-5 w-5" aria-hidden="true" />
                          Send Message
                        </>
                      )}
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* Contact info card */}
            <div className="space-y-5">
              <div className="rounded-3xl border border-black/5 bg-white p-6 shadow-soft md:p-8">
                <div className="flex items-center justify-between gap-3">
                  <h2 className="font-heading text-xl font-extrabold tracking-tight text-[var(--ink)]">
                    Contact Information
                  </h2>
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${
                      open
                        ? 'bg-black text-white'
                        : 'bg-neutral-100 text-[var(--muted)]'
                    }`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${open ? 'bg-white' : 'bg-neutral-400'}`}
                      aria-hidden="true"
                    />
                    {open ? 'Open now' : 'Closed now'}
                  </span>
                </div>

                <ul className="mt-6 space-y-5">
                  <li className="flex items-start gap-3.5">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-neutral-100">
                      <MapPinIcon className="h-5 w-5 text-black" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="text-sm font-bold text-[var(--ink)]">Address</p>
                      <a
                        href="https://maps.google.com/?q=123+Fashion+Street+Lahore"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-[var(--muted)] transition-colors hover:text-black"
                      >
                        123 Fashion Street, Lahore, Pakistan 54000
                      </a>
                    </div>
                  </li>

                  <li className="flex items-start gap-3.5">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-neutral-100">
                      <EnvelopeIcon className="h-5 w-5 text-black" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="text-sm font-bold text-[var(--ink)]">Email</p>
                      <a
                        href="mailto:support@pakipreneurs.com"
                        className="block text-sm text-[var(--muted)] transition-colors hover:text-black"
                      >
                        support@pakipreneurs.com
                      </a>
                      <a
                        href="mailto:info@pakipreneurs.com"
                        className="block text-sm text-[var(--muted)] transition-colors hover:text-black"
                      >
                        info@pakipreneurs.com
                      </a>
                    </div>
                  </li>

                  <li className="flex items-start gap-3.5">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-neutral-100">
                      <PhoneIcon className="h-5 w-5 text-black" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="text-sm font-bold text-[var(--ink)]">Phone</p>
                      <a
                        href="tel:+923001234567"
                        className="block text-sm text-[var(--muted)] transition-colors hover:text-black"
                      >
                        +92 300 1234567
                      </a>
                      <a
                        href="https://wa.me/923001234567"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-sm text-[var(--muted)] transition-colors hover:text-black"
                      >
                        WhatsApp us
                      </a>
                    </div>
                  </li>

                  <li className="flex items-start gap-3.5">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-neutral-100">
                      <ClockIcon className="h-5 w-5 text-black" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="text-sm font-bold text-[var(--ink)]">Business Hours</p>
                      <p className="text-sm text-[var(--muted)]">
                        Mon–Fri: 9:00 AM – 6:00 PM
                      </p>
                      <p className="text-sm text-[var(--muted)]">Saturday: 10:00 AM – 4:00 PM</p>
                      <p className="text-sm text-[var(--muted)]">Sunday: Closed</p>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Map placeholder */}
              <div className="flex aspect-[16/7] w-full items-center justify-center rounded-3xl border border-black/5 bg-neutral-100 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
                <div className="text-center">
                  <MapPinIcon className="mx-auto h-8 w-8 text-[var(--muted)]" aria-hidden="true" />
                  <p className="mt-2 text-sm font-semibold text-[var(--ink)]">Store location</p>
                  <a
                    href="https://maps.google.com/?q=123+Fashion+Street+Lahore"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 inline-block text-xs font-semibold text-black transition-colors hover:underline"
                  >
                    Open in Google Maps
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
