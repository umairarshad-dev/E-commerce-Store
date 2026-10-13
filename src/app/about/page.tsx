import Image from 'next/image';
import type { Metadata } from 'next';
import AboutHero from '@/components/about/AboutHero';
import StatsStrip from '@/components/about/StatsStrip';
import ValuesGrid from '@/components/about/ValuesGrid';
import CtaBanner from '@/components/about/CtaBanner';
import Reveal from '@/components/ui/Reveal';
import {
  ClockIcon,
  LockClosedIcon,
  ShieldCheckIcon,
  TruckIcon,
} from '@heroicons/react/24/outline';

export const metadata: Metadata = {
  title: 'About Us — SHOP.CO',
  description: 'The story, mission and values behind SHOP.CO.',
};

const TEAM = [
  { name: 'Hassan Ali', role: 'Founder & CEO' },
  { name: 'Zara Khan', role: 'Head of Design' },
  { name: 'Bilal Ahmed', role: 'Customer Experience' },
];

export default function AboutPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'SHOP.CO',
    url: 'https://shopco.example.com',
    description: 'Modern clothing store offering quality fashion at fair prices.',
    email: 'support@pakipreneurs.com',
    telephone: '+92-300-1234567',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '123 Fashion Street',
      addressLocality: 'Lahore',
      postalCode: '54000',
      addressCountry: 'PK',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="w-full bg-white">
        <AboutHero />
        <StatsStrip />

        {/* Story + Mission */}
        <section className="w-full bg-white">
          <div className="px-4 py-12 sm:px-8">
            <div className="mx-auto max-w-screen-xl space-y-12">
              <div className="grid items-center gap-8 lg:grid-cols-2">
                <Reveal>
                  <div>
                    <h2 className="font-heading text-2xl font-extrabold tracking-tight text-[var(--ink)] md:text-3xl">
                      Our Story
                    </h2>
                    <p className="mt-4 leading-relaxed text-[var(--muted)]">
                      Founded with a passion for fashion, we strive to bring you the best
                      clothing options from around the world. Our journey began with a
                      simple idea: to make quality fashion accessible to everyone.
                    </p>
                    <p className="mt-3 leading-relaxed text-[var(--muted)]">
                      What started as a small Lahore storefront is now a trusted online
                      destination for thousands of customers who want style without the
                      markup.
                    </p>
                  </div>
                </Reveal>
                <Reveal delay={80}>
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl bg-neutral-100">
                    <Image
                      src="/images/categories/formal-dress.png"
                      alt="The SHOP.CO team at work"
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover"
                    />
                  </div>
                </Reveal>
              </div>

              <div className="grid items-center gap-8 lg:grid-cols-2">
                <Reveal>
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl bg-neutral-100 lg:order-1">
                    <Image
                      src="/images/categories/party-dress.png"
                      alt="A curated SHOP.CO collection"
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover"
                    />
                  </div>
                </Reveal>
                <Reveal delay={80}>
                  <div>
                    <h2 className="font-heading text-2xl font-extrabold tracking-tight text-[var(--ink)] md:text-3xl">
                      Our Mission
                    </h2>
                    <p className="mt-4 leading-relaxed text-[var(--muted)]">
                      To provide our customers with high-quality, stylish clothing at
                      affordable prices while maintaining exceptional customer service and
                      building lasting relationships.
                    </p>
                    <p className="mt-3 leading-relaxed text-[var(--muted)]">
                      We obsess over fit, fabric and fairness — so every order feels like a
                      win.
                    </p>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        <ValuesGrid />

        {/* Trust strip */}
        <section className="w-full bg-white">
          <div className="px-4 pb-12 sm:px-8">
            <Reveal>
              <div className="mx-auto max-w-screen-xl">
                <h2 className="font-heading text-2xl font-extrabold tracking-tight text-[var(--ink)] md:text-3xl">
                  Why Shop With Us
                </h2>
                <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
                  {[
                    { icon: TruckIcon, label: 'Free delivery over Rs 5,000' },
                    { icon: ShieldCheckIcon, label: '7-day easy returns' },
                    { icon: ClockIcon, label: 'Cash on delivery' },
                    { icon: LockClosedIcon, label: 'Secure payments' },
                  ].map(({ icon: Icon, label }) => (
                    <div
                      key={label}
                      className="flex items-center gap-3 rounded-2xl border border-black/5 bg-white p-4 shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
                    >
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--accent-soft)]">
                        <Icon className="h-5 w-5 text-[var(--accent)]" aria-hidden="true" />
                      </span>
                      <span className="text-sm font-semibold text-[var(--ink)]">{label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Team */}
        <section className="w-full bg-white">
          <div className="px-4 pb-12 sm:px-8">
            <Reveal>
              <div className="mx-auto max-w-screen-xl">
                <h2 className="font-heading text-2xl font-extrabold tracking-tight text-[var(--ink)] md:text-3xl">
                  Meet the Team
                </h2>
                <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
                  {TEAM.map((member) => (
                    <div
                      key={member.name}
                      className="flex items-center gap-4 rounded-2xl border border-black/5 bg-white p-5 shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
                    >
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[var(--accent-soft)] text-base font-bold text-[var(--accent)]">
                        {member.name
                          .split(' ')
                          .map((p) => p[0])
                          .join('')}
                      </span>
                      <div>
                        <p className="text-sm font-bold text-[var(--ink)]">{member.name}</p>
                        <p className="text-xs text-[var(--muted)]">{member.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <CtaBanner />
      </div>
    </>
  );
}
