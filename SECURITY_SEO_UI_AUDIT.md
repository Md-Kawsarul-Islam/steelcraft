# Kawsar production audit & hardening

## Implemented in this build

### Security
- Removed the insecure fallback admin session secret.
- Requires `ADMIN_SESSION_SECRET` and validates a minimum length of 32 characters.
- Admin cookie is `HttpOnly`, `SameSite=Strict`, `Secure` in production, path-scoped, and reduced to an 8-hour lifetime.
- Admin login uses constant-time comparison and IP-based rate limiting.
- Admin API has origin checks, authentication checks, request rate limiting, collection allow-listing, bounded payload fields, and safer error messages.
- Quote endpoint has origin checks, rate limiting, bounded fields, email validation, and a honeypot field.
- Added security response headers: HSTS, CSP, X-Content-Type-Options, X-Frame-Options, Referrer-Policy, and Permissions-Policy.
- Disabled the `X-Powered-By` header.
- Added `Cache-Control: no-store` to authenticated/session responses.

### SEO
- Added metadata base, title templates, description, keywords, canonical URL, Open Graph, Twitter metadata, robots directives, and viewport/theme metadata.
- Added `/sitemap.xml` via `app/sitemap.ts`.
- Added `/robots.txt` via `app/robots.ts` and excluded `/admin/`.
- Added page-level metadata for About, Products, Projects, Blog, and Contact.
- Added descriptive image alt text.

### Performance / images
- Replaced product/project `<img>` elements with `next/image`.
- Replaced the work gallery `<img>` elements with `next/image`.
- Added responsive `sizes` and limited image priority to above-the-fold gallery images.
- Added remote image configuration for the existing Unsplash source.

### UI / UX / accessibility
- Added consistent focus-visible states.
- Added selection styling, improved typography rendering, balanced headings, and readable line height.
- Added reduced-motion support to the existing animation system.
- Improved sticky header with translucent backdrop treatment.
- Improved mobile header/nav wrapping.
- Added disabled/loading state to quote submission.
- Added accessible `aria-label`/`aria-live` behavior to the quote form.
- Added a branded 404 page and a client error recovery page.
- Preserved the existing visual language and animation system instead of replacing the design.

## Important production configuration

Set these values before deployment:

- `NEXT_PUBLIC_SITE_URL=https://your-real-domain.com`
- `MONGODB_URI=...`
- `MONGODB_DB=Kawsar`
- `ADMIN_EMAIL=...`
- `ADMIN_PASSWORD=...` (use a strong unique password)
- `ADMIN_SESSION_SECRET=...` (use a cryptographically random value of at least 32 characters; 64+ is recommended)
- `RESEND_API_KEY=...`
- `QUOTE_TO_EMAIL=...`
- `RESEND_FROM_EMAIL=...`

## Validation note

The supplied archive did not contain `node_modules`, and package installation could not complete in the build environment because the package registry connection timed out. Therefore `npm run build` could not be executed here. Run `npm ci` followed by `npm run build` locally or in CI before deployment.
