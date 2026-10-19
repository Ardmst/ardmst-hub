# ardmst-hub — ardmst.my.id

Single-page link aggregator for **ardmst.my.id** (Vercel Option B).

## Stack
Next.js 15 App Router · Tailwind 4 · Framer Motion · lucide-react

## Design tokens (from MyPortofolio)
`#09090B` void / `#141417` surface / `#27272A` edge · `#3B82F6` Electric Blue accent · Inter + Space Grotesk + JetBrains Mono · `shadow-[0_0_25px_rgba(59,130,246,0.25)]` hover glow · `grid-backdrop` + `animate-glow-pulse`

## Edit links
`src/lib/site.ts` → `LINKS` array. Each item: `title`, `href`, `description`, `badge`, `accent`, `external`. Use `href: "#"` for coming-soon (rendered disabled).

## Local dev
```
npm install
npm run dev    # http://localhost:3000
npm run build  # static output, 159kB first load
```

## Deploy — Vercel Option B

### Two Vercel projects

| Project | Repo | Domain | Framework |
|---------|------|--------|-----------|
| `ardmst-hub` | `Ardmst/ardmst-hub` (this repo) | `ardmst.my.id` | Next.js |
| `MyPortofolio` | `Ardmst/MyPortofolio` @ `e879d4f` | `portofolio.ardmst.my.id` | Next.js |

### Cloudflare DNS (domain registrar = Cloudflare)

| Type | Name | Content | Proxy | Purpose |
|------|------|---------|-------|---------|
| CNAME | `ardmst.my.id` | `cname.vercel-dns.com` | Proxied (orange) | ardmst-hub |
| CNAME | `portofolio` | `cname.vercel-dns.com` | Proxied (orange) | MyPortofolio |
| A | `hermes` | `85.211.245.219` | DNS only (grey) | VPS hermes |
| A | `api` | `85.211.245.219` | DNS only (grey) | VPS api |

> Delete/replace the old `A ardmst.my.id → 85.211.245.219 (DNS only)` and `A portofolio → 85.211.245.219 (DNS only)`. Vercel handles apex via CNAME flattening.

### Vercel — MyPortofolio env vars
Copy from VPS `/var/www/ardmst/.env.example` (placeholders below — fill real values in Vercel dashboard → Project → Settings → Environment Variables):

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
NEXT_PUBLIC_APP_URL=https://portofolio.ardmst.my.id
NEXT_PUBLIC_SUPABASE_BUCKET=portfolio-media
LOCAL_ADMIN_EMAIL=admin@ardmst.local
LOCAL_ADMIN_PASSWORD=***
AUTH_SECRET=***
```

`ardmst-hub` needs no env vars.

### Steps (dashboard)

1. **Hub**: Vercel → Add New Project → Import `Ardmst/ardmst-hub` → Deploy → Settings → Domains → Add `ardmst.my.id` → Cloudflare CNAME as above → wait for Valid.
2. **Portfolio**: Vercel → Add New Project → Import `Ardmst/MyPortofolio` → set env vars → Deploy → Domains → Add `portofolio.ardmst.my.id` → Cloudflare CNAME as above.
3. Push hub if not yet on GitHub:
   ```
   cd ardmst-hub
   git push -u origin main
   # create repo first if needed: gh repo create Ardmst/ardmst-hub --public --source=. --remote=origin --push
   ```
4. Vercel CLI alternative (requires `vercel login`):
   ```
   vercel link --project ardmst-hub
   vercel --prod
   ```

### Verification

```bash
curl -I https://ardmst.my.id
curl -I https://portofolio.ardmst.my.id
curl -I https://hermes.ardmst.my.id  # should hit VPS 85.211.245.219
dig ardmst.my.id CNAME +short
dig portofolio.ardmst.my.id CNAME +short
dig hermes.ardmst.my.id A +short   # expect 85.211.245.219
```

Expect `200` + `x-vercel-*` headers for the two Vercel domains, VPS response for hermes/api.
