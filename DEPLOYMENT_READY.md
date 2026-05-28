# Deployment readiness

This project is prepared as a static website. The final domain is the only required deployment input.

## Build

```bash
SITE_ORIGIN=https://your-domain.com npm run build
```

The generated site is written to `public/`.

## Publish directory

Use:

```text
public
```

## Domain-dependent files

The build command injects `SITE_ORIGIN` into:

- canonical URLs
- Open Graph URLs
- Twitter image URLs
- JSON-LD schema URLs
- `sitemap.xml`
- `robots.txt`

Do not deploy the default `https://example.com` build to production.

## Included launch assets

- 50 keyword pages
- homepage
- `/tools/` index page
- trust pages: `/about/`, `/how-it-works/`, `/privacy/`, `/terms/`, `/contact/`
- `404.html`
- `sitemap.xml`
- `robots.txt`
- Cloudflare Pages `_headers`
- favicon SVG
- apple touch icon SVG
- web app manifest
- Open Graph and Twitter Card tags
- social sharing SVG
- `@graph` schema on all indexable pages
- WebApplication + FAQPage + BreadcrumbList on tool pages
- WebSite + Organization on homepage
- CollectionPage + ItemList on tools index
- WebPage + BreadcrumbList on trust pages

## Pre-deploy check

```bash
npm run build
find public -name 'index.html' | wc -l
rg "https://example.com" public
```

Expected index page count: `57`.
Expected sitemap URL count: `57`.

After building with the real domain, the `rg "https://example.com" public` command should return no results.
