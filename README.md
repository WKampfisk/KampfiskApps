# KampfiskApps

**Online store and marketplace for all my apps.**

A beautiful, simple web storefront showcasing the collection of apps built by Kampfisk.

## 5 Store Builds for Review (NEW)

We have created **5 distinct storefront designs** implementing the **Siamese fighting fish (Betta)** as the core visual motif in logos, backgrounds, and UI elements.

**Modern + Trustworthy design language** across all versions:
- Deep navy, teal and coral accents
- Elegant fish SVG logos
- Premium, clean layouts with strong trust signals

Open `builds/index.html` to review all 5:

- **V1 Betta Classic** — Dark elegant hero with prominent fish
- **V2 Aqua Minimal** — Light, airy, generous whitespace
- **V3 Premium Reef** — Rich dark premium with large imagery
- **V4 Stream Masonry** — Dynamic masonry + fish accents
- **V5 Trust Vault** — Professional, testimonial-heavy layout

All prototypes are fully interactive (search + modals). They use the same app catalog data (ShroomFinder, Spot-Finder, LesePoeng, Pasientreiser, etc).

## Live Site (GitHub Pages)

https://wkampfisk.github.io/KampfiskApps

## Local Development

```bash
npm install
npm run dev
```

## Stripe payments (test mode)

The storefront is ready for server-side Stripe Checkout through Vercel. It does not expose a Stripe secret key in the browser.

1. Create the paid product and price in the Stripe Dashboard (test mode).
2. Add its Stripe price ID as a Vercel environment variable.
3. Add its product ID to `api/create-checkout-session.js`, then set the same `productId` on the relevant item in `src/data/apps.js`.
4. Add `STRIPE_SECRET_KEY` and `PUBLIC_SITE_URL` in Vercel. Copy `.env.example` as a safe reference; never commit real keys.

Stripe Checkout handles the payment page. Before taking real payments, set up the legal business details, tax settings, fulfilment/download delivery, refund policy, and a Stripe webhook for confirmed orders.

## IONOS Domain

Deploy the project to Vercel, add `kampfiskapps.com` as a custom domain, then enter the DNS records Vercel shows in IONOS. Vercel will issue HTTPS automatically after the records propagate.

## Apps in the Catalog

See the live site or `src/data/apps.js`.

---

Built with ❤️ by WKampfisk / Kampfisk
