# Deployment & Infrastructure — Mom'z Factory

Reference for how momzfactory.in is hosted and what accounts are involved.
Written 2026-07-04, the day everything was set up. No passwords in this
file — only account identifiers.

## The stack at a glance

```
Customer browser
      │
      ▼
momzfactory.in  ──────────  domain bought at GoDaddy (registrar only)
      │                     DNS + serving handled by Cloudflare
      ▼
Cloudflare Pages ─────────  free static hosting, project "momz-factory"
      │                     auto-deploys on every push to master
      ▼
github.com/PraneshMuthu/momz-factory  (branch: master)
```

Orders are NOT processed by any server — the site builds a prefilled
WhatsApp message (wa.me link) and the customer sends it themselves.

## Accounts

| Service | Used for | Account email |
|---|---|---|
| GoDaddy | Domain registrar (billing/renewal only) | momzfactory@gmail.com |
| Cloudflare | DNS + Pages hosting (free plan) | momzfactory@gmail.com |
| GitHub | Code + content, deploy trigger | PraneshMuthu |

## Domain: momzfactory.in

- **Purchased**: 2026-07-04 from GoDaddy, 1-year term
- **Expires**: 2027-07-04 — ⚠️ renew before this date or the site goes
  down and the domain can be lost. Check that auto-renew is ON in
  GoDaddy, and that the card on file works.
- **Nameservers** (set at GoDaddy, point to Cloudflare):
  `tia.ns.cloudflare.com`, `elias.ns.cloudflare.com`
  GoDaddy is ONLY the billing desk for the domain — all DNS lives in
  Cloudflare. Never change nameservers back; ignore GoDaddy's upsells
  and "your domain isn't connected" nags.

## Hosting: Cloudflare Pages (free plan)

- **Project name**: `momz-factory`
- **Production branch**: `master` (repo has no `main` branch)
- **Build settings**: framework preset None, build command empty,
  output directory `/` (plain static files, no build step)
- **Live URLs**:
  - https://momzfactory.in (primary)
  - https://www.momzfactory.in
  - https://momz-factory.pages.dev (permanent backup URL, always works
    even if the domain has problems)
- Pages serves pretty URLs: `/products` and `/products.html` both work
  (the latter 308-redirects to the former).
- Assets are served with `cache-control: must-revalidate`, so visitors
  always get the newest files after a deploy.

## How deploys work

1. Push (or edit on github.com) anything on `master`
2. Cloudflare Pages builds & publishes automatically, ~30 seconds
3. Check status: Cloudflare dash → Workers & Pages → momz-factory →
   Deployments
4. Every push also runs a GitHub Action (`.github/workflows/validate.yml`)
   that validates `data/*.json` — a red ✗ on the commit means a JSON
   syntax error; the site may serve a broken catalog until it's fixed.
5. Pushing any non-master branch gets an automatic preview URL
   (shown in the Deployments tab) — useful to check changes before merge.

Routine content edits (prices, stock, products, reviews, contact info)
are data-file edits — see [README.md](README.md) and
[data/README.md](data/README.md). No code knowledge needed.

## WhatsApp ordering

- Orders arrive at the number configured in `data/site.js`
  (currently +91 98422 75189) as normal WhatsApp chats.
- Changing that number in `data/site.js` + push is all it takes to
  reroute orders (nav, footer, About links all read from that file).

## If the site is down — checklist

1. Does https://momz-factory.pages.dev work?
   - **Yes** → problem is domain/DNS: check Cloudflare dash → the
     momzfactory.in zone is Active, and Pages → Custom domains both
     show Active. Check domain hasn't expired (GoDaddy).
   - **No** → check the latest deploy in the Deployments tab; roll back
     from there (every previous deploy is kept and can be restored with
     one click), and look at the GitHub Action for a failed validation.
2. DNS spot-checks from a terminal:
   `dig NS momzfactory.in +short` → should list tia/elias.ns.cloudflare.com
   `dig +short momzfactory.in @1.1.1.1` → should return Cloudflare IPs
