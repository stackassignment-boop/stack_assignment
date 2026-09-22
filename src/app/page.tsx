import type { Metadata } from 'next';
import HomeRoute from '@/components/home/HomeRoute';
import { seoConfig } from '@/lib/seo-config';

/**
 * Deliberately minimal. The title, description and Open Graph block for the
 * home page all come from the root layout's defaults, which is the correct
 * behaviour for `/` — restating them here would only risk drift.
 *
 * Note that Next.js *replaces* the `openGraph` object rather than merging it,
 * so any page that declares its own `openGraph` has to repeat `locale` or it
 * silently loses the `en_AU` signal set in the layout. That is the reason this
 * file sets nothing but the canonical.
 *
 * This page could not export metadata at all until now: it was a `'use client'`
 * component, and `export const metadata` from a client component is a hard
 * error in the App Router.
 */
export const metadata: Metadata = {
  alternates: { canonical: seoConfig.siteUrl },
};

export default function Page() {
  return <HomeRoute />;
}
