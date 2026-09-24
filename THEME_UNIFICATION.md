# Theme unification: Services page is the source of truth

Every hero on the site now uses the Services hero look:
slate-950 (#020617) base, soft indigo/purple glows, faint 44px grid,
yellow -> lavender -> purple headline accent.

## How it works
`src/app/globals.css` defines ONE token, `--stack-service-hero-bg`.
All hero classes point to it:
  .stack-hero, .stack-pricing-hero, .stack-samples-hero, .stack-blog-hero,
  .stack-universities-hero, .stack-tools-hero, .stack-regional-hero,
  .stack-site-hero, .stack-service-hero
To tweak the hero colour for the WHOLE site later, edit that one token.

Closing call-to-action bands use `.stack-cta-band`
(slate-950 -> indigo-700 -> purple-700, same as the Services final CTA).

## Files touched
- src/app/globals.css (token, hero rules, headline gradient, CTA band)
- src/components/home/HeroSection.tsx (Home)
- src/components/tools/ToolPageShell.tsx (all individual tool pages)
- src/components/seo/RegionLandingPage.tsx (AU / UK landing pages)
- kaplan / holmes / melbourne-institute / universities/[slug] (removed inline navy->purple overlay)
- 20 university pages + kaplan/holmes/MIT/[slug]: closing CTA -> .stack-cta-band
