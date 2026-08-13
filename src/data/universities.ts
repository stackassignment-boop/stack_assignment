export interface UniversityData {
  slug: string
  name: string
  country: string
  campuses: string[]
  courseAreas: string[]
  heroImageId: number // picsum.photos id, for visual variety between pages
}

// Universities with a dedicated hand-built page (excluded from the dynamic
// route so we don't create duplicate/competing URLs):
//   Kaplan Business School      -> /kaplan-assignment-help
//   Melbourne Institute of Tech -> /melbourne-institute-of-technology-assignment-help
//   Holmes Institute            -> /holmes-institute-assignment-help
//
// Course areas below are kept general (business/IT/health/etc.) rather than
// claiming institution-specific referencing guides or unit codes we haven't
// verified — unlike the three hand-built pages above, which cite confirmed
// facts. The FAQ template reflects that by not asserting a specific
// referencing style.
export const universities: UniversityData[] = [
  // NOTE: CQUniversity is intentionally NOT listed here. It moved to a
  // dedicated hand-built page at src/app/universities/cquniversity/page.tsx
  // (same URL — Next.js resolves the static route ahead of this [slug]
  // catch-all automatically) because it needed course/unit-level content
  // this generic template doesn't support.
  // NOTE: Deakin University moved to a dedicated hand-built page at
  // src/app/universities/deakin-university/ (same URL — Next.js resolves
  // the static route ahead of this [slug] catch-all automatically).
  {
    slug: 'de-montfort-university',
    name: 'De Montfort University',
    country: 'United Kingdom',
    campuses: ['Leicester'],
    courseAreas: ['Business & Law', 'Computing & Engineering', 'Health & Life Sciences', 'Art, Design & Humanities'],
    heroImageId: 1022,
  },
  {
    slug: 'federation-university',
    name: 'Federation University',
    country: 'Australia',
    campuses: ['Ballarat', 'Berwick', 'Gippsland', 'Brisbane'],
    courseAreas: ['Business', 'Health', 'Education', 'Engineering & Technology'],
    heroImageId: 1033,
  },
  // NOTE: La Trobe University moved to a dedicated hand-built page at
  // src/app/universities/la-trobe-university/ (same URL, same reasoning
  // as Deakin above).
  {
    slug: 'liverpool-hope-university',
    name: 'Liverpool Hope University',
    country: 'United Kingdom',
    campuses: ['Liverpool'],
    courseAreas: ['Business', 'Education', 'Humanities', 'Health Sciences'],
    heroImageId: 1047,
  },
  {
    slug: 'qut',
    name: 'Queensland University of Technology',
    country: 'Australia',
    campuses: ['Brisbane (Gardens Point)', 'Brisbane (Kelvin Grove)'],
    courseAreas: ['Business', 'IT', 'Engineering', 'Creative Industries', 'Health'],
    heroImageId: 1051,
  },
  {
    slug: 'thompson-rivers-university',
    name: 'Thompson Rivers University',
    country: 'Canada',
    campuses: ['Kamloops, BC'],
    courseAreas: ['Business & Economics', 'Science', 'Arts', 'Nursing & Health'],
    heroImageId: 1058,
  },
  {
    slug: 'university-of-newcastle',
    name: 'University of Newcastle',
    country: 'Australia',
    campuses: ['Newcastle (Callaghan)', 'Central Coast', 'Sydney'],
    courseAreas: ['Business', 'Health & Medicine', 'Engineering', 'Education', 'Science'],
    heroImageId: 1060,
  },
  {
    slug: 'university-of-new-england',
    name: 'University of New England',
    country: 'Australia',
    campuses: ['Armidale, NSW'],
    courseAreas: ['Business', 'Education', 'Health', 'Science & Agriculture'],
    heroImageId: 1067,
  },
  {
    slug: 'unsw-sydney',
    name: 'UNSW Sydney',
    country: 'Australia',
    campuses: ['Sydney (Kensington)'],
    courseAreas: ['Business', 'Engineering', 'Law', 'Medicine & Health', 'Science'],
    heroImageId: 1071,
  },
  {
    slug: 'university-of-canberra',
    name: 'University of Canberra',
    country: 'Australia',
    campuses: ['Canberra, ACT'],
    courseAreas: ['Business & Government', 'IT', 'Health', 'Education', 'Communication'],
    heroImageId: 1076,
  },
  {
    slug: 'university-of-sunshine-coast',
    name: 'University of the Sunshine Coast (UniSC)',
    country: 'Australia',
    campuses: ['Sunshine Coast, QLD', 'Moreton Bay', 'South Bank (Brisbane)'],
    courseAreas: ['Business', 'Health Sciences', 'Education', 'Science & Engineering'],
    heroImageId: 1080,
  },
  {
    slug: 'university-of-bedfordshire',
    name: 'University of Bedfordshire',
    country: 'United Kingdom',
    campuses: ['Luton', 'Bedford'],
    courseAreas: ['Business', 'Computing', 'Health & Social Sciences', 'Education'],
    heroImageId: 1084,
  },
  {
    slug: 'university-of-western-australia',
    name: 'University of Western Australia',
    country: 'Australia',
    campuses: ['Perth (Crawley)'],
    courseAreas: ['Business', 'Engineering', 'Law', 'Health & Medical Sciences', 'Science'],
    heroImageId: 1088,
  },
  // NOTE: Victoria University, Torrens University, and Victorian Institute
  // of Technology moved to dedicated hand-built pages at
  // src/app/universities/victoria-university/, torrens-university/, and
  // victorian-institute-of-technology/ (same URLs — Next.js resolves the
  // static routes ahead of this [slug] catch-all automatically).
  {
    slug: 'academies-australasia-polytechnic',
    name: 'Academies Australasia Polytechnic',
    country: 'Australia',
    campuses: ['Sydney'],
    courseAreas: ['Business', 'Early Childhood Education', 'IT', 'Community Services'],
    heroImageId: 1045,
  },
  {
    slug: 'southern-cross-institute',
    name: 'Southern Cross Institute',
    country: 'Australia',
    campuses: ['Sydney'],
    courseAreas: ['Business', 'Hospitality Management', 'IT'],
    heroImageId: 1055,
  },
  {
    slug: 'solent-university',
    name: 'Solent University',
    country: 'United Kingdom',
    campuses: ['Southampton'],
    courseAreas: ['Business', 'Maritime & Engineering', 'Media & Design', 'Sport Science'],
    heroImageId: 1065,
  },
  {
    slug: 'university-of-east-london',
    name: 'University of East London',
    country: 'United Kingdom',
    campuses: ['Docklands (London)', 'Stratford (London)'],
    courseAreas: ['Business', 'Law', 'Computing & Engineering', 'Health & Bioscience', 'Psychology'],
    heroImageId: 1069,
  },
  {
    slug: 'pia-polytechnic-institute-australia',
    name: 'PIA — Polytechnic Institute Australia',
    country: 'Australia',
    campuses: ['Sydney', 'Geelong'],
    courseAreas: ['Business (Accounting)', 'Business (Marketing)', 'Networking & Telecommunications', 'Diploma of Business', 'Diploma of Networking Technology'],
    heroImageId: 1074,
  },
]

export function getUniversityBySlug(slug: string): UniversityData | undefined {
  return universities.find((u) => u.slug === slug)
}
