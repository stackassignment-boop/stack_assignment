'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';
import { GraduationCap, Phone, Mail, Instagram } from 'lucide-react';
import TrustBadges from '@/components/marketing/TrustBadges';

interface FooterProps {
  onNavigate?: (page: string) => void;
}

/**
 * A footer link that is a real anchor for crawlers and still honours the legacy
 * in-app navigation callback.
 *
 * Every link in this footer used to be `<button onClick={() => onNavigate(page)}>`.
 * That works for a person but is invisible to a crawler: with no href there is no
 * link, so none of these pages received any internal link equity from the one
 * component that renders on every page of the site — including /integrity, the
 * page that most needs to be findable. Rendering a real `<Link href>` fixes that.
 * When the host page supplies `onNavigate` we still call it and suppress the
 * default navigation, so client-side routing behaves exactly as it did before.
 */
function FooterLink({
  href,
  page,
  onNavigate,
  children,
}: {
  href: string;
  page: string;
  onNavigate?: (page: string) => void;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className="hover:text-white transition-colors"
      onClick={(event) => {
        if (onNavigate) {
          event.preventDefault();
          onNavigate(page);
        }
      }}
    >
      {children}
    </Link>
  );
}

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <>
      <footer className="bg-slate-900 text-slate-300 py-12 mt-auto relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Trust Badges */}
          <div className="mb-10">
            <TrustBadges variant="footer" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-3 text-white text-2xl font-bold mb-4">
                <GraduationCap className="w-8 h-8 text-indigo-400" />
                Stack Assignment
              </div>
              <p className="text-sm opacity-90 leading-relaxed">
                {/*
                  Was "Professional academic writing & assignment assistance ...
                  Providing model / reference papers only — for learning
                  purposes." The "model answer" and "reference paper" framing is
                  the specific euphemism TEQSA guidance identifies as marketing
                  for a cheating service, and it appeared on every page of the
                  site via the footer.
                */}
                One-on-one tutoring and expert editing for university students.
                <br />
                You do the work. We help you do it better.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-white font-semibold mb-4 text-lg">Quick Links</h4>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <FooterLink href="/services" page="services" onNavigate={onNavigate}>
                    Services
                  </FooterLink>
                </li>
                <li>
                  <FooterLink href="/pricing" page="pricing" onNavigate={onNavigate}>
                    Pricing
                  </FooterLink>
                </li>
                <li>
                  <FooterLink href="/samples" page="samples" onNavigate={onNavigate}>
                    Samples
                  </FooterLink>
                </li>
                <li>
                  <FooterLink href="/blog" page="blog" onNavigate={onNavigate}>
                    Blog
                  </FooterLink>
                </li>
                <li>
                  <Link href="/universities" className="hover:text-white transition-colors">
                    Universities
                  </Link>
                </li>
                <li>
                  <Link href="/tools" className="hover:text-white transition-colors">
                    Free Tools
                  </Link>
                </li>
                <li>
                  <Link
                    href="/tools/wam-calculator"
                    className="hover:text-white transition-colors"
                  >
                    WAM Calculator
                  </Link>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="text-white font-semibold mb-4 text-lg">Support</h4>
              {/*
                Was "24/7 Assistance". The only contact number on the site is an
                Indian mobile, so round-the-clock coverage in Australian hours is
                not something this footer can stand behind — and a support claim
                published to prospective customers is a representation under the
                Australian Consumer Law (Competition and Consumer Act 2010 Sch 2
                ss 18, 29). Describing the channel instead of the coverage is both
                honest and, for an Australian audience, more useful.

                ⚠ FOR THE OWNER: an Australian landline or mobile would do more
                for local trust and NAP consistency than any on-page change in
                this pass. Right now the only phone number tells a Sydney student
                they are calling overseas.
              */}
              <p className="text-sm mb-2 opacity-90">Message us any time</p>
              <a
                href="tel:+919907300710"
                className="block text-sm hover:text-white transition-colors mb-1.5 flex items-center gap-2"
              >
                <Phone className="w-4 h-4 text-indigo-400" /> +91 99073 00710
              </a>
              <a
                href="mailto:stackassignment@gmail.com"
                className="block text-sm hover:text-white transition-colors flex items-center gap-2"
              >
                <Mail className="w-4 h-4 text-indigo-400" /> stackassignment@gmail.com
              </a>
            </div>

            {/* Legal */}
            <div>
              <h4 className="text-white font-semibold mb-4 text-lg">Legal</h4>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <FooterLink href="/terms" page="terms" onNavigate={onNavigate}>
                    Terms of Service
                  </FooterLink>
                </li>
                <li>
                  <FooterLink href="/privacy" page="privacy" onNavigate={onNavigate}>
                    Privacy Policy
                  </FooterLink>
                </li>
                <li>
                  <FooterLink href="/integrity" page="integrity" onNavigate={onNavigate}>
                    Academic Integrity
                  </FooterLink>
                </li>
              </ul>
            </div>
          </div>

          {/* Social Media Icons */}
          <div className="mt-10 pt-6 border-t border-slate-700">
            <div className="flex justify-center gap-8">
              <a
                href="https://www.facebook.com/profile.php?id=61587947056193"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-white transition-colors text-2xl"
                aria-label="Facebook"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                </svg>
              </a>
              <a
                href="https://instagram.com/stackassignment"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-pink-400 transition-colors text-2xl"
                aria-label="Instagram"
              >
                <Instagram className="w-6 h-6" />
              </a>
              <a
                href="http://www.linkedin.com/in/stack-assignment-6925ba280"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-white transition-colors text-2xl"
                aria-label="LinkedIn"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 6a2 2 0 100-4 2 2 0 000 4z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-6 text-center text-sm opacity-75">
            © 2010–2026 Stack Assignment. All rights reserved.
          </div>
        </div>
      </footer>
    </>
  );
}
