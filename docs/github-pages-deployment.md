# GitHub Pages Deployment

This project is configured for static export with Next.js and can be deployed to GitHub Pages from GitHub Actions.

## What Is Already Set Up

- `next.config.ts` uses `output: "export"` so `npm run build` creates a static `out/` folder.
- `.github/workflows/deploy-github-pages.yml` builds the app, typechecks, lints, uploads `out/`, and deploys to GitHub Pages.
- The workflow sets `NEXT_PUBLIC_BASE_PATH` to an empty string because this site is configured for the custom root domain:

```txt
https://layeredcomputing.com/
```

## GitHub Setup

1. Push this repository to GitHub.
2. In GitHub, open the repository settings.
3. Go to `Pages`.
4. Under `Build and deployment`, set `Source` to `GitHub Actions`.
5. Push to the `main` branch or run the workflow manually from the `Actions` tab.

## DNS Setup For `layeredcomputing.com`

In your domain registrar or DNS provider, configure the apex/root domain:

```dns
layeredcomputing.com  A     185.199.108.153
layeredcomputing.com  A     185.199.109.153
layeredcomputing.com  A     185.199.110.153
layeredcomputing.com  A     185.199.111.153
```

Optional IPv6 records:

```dns
layeredcomputing.com  AAAA  2606:50c0:8000::153
layeredcomputing.com  AAAA  2606:50c0:8001::153
layeredcomputing.com  AAAA  2606:50c0:8002::153
layeredcomputing.com  AAAA  2606:50c0:8003::153
```

For the `www` alternate name:

```dns
www.layeredcomputing.com  CNAME  Finie.github.io
```

In GitHub repository settings:

1. Go to `Settings` → `Pages`.
2. Set `Custom domain` to `layeredcomputing.com`.
3. Keep `Source` set to `GitHub Actions`.
4. Wait for the DNS check to pass.
5. Enable `Enforce HTTPS` when GitHub allows it.

## Local Checks

Run these before pushing:

```bash
npm run typecheck
npm run lint
npm run build
```

After `npm run build`, the static site output will be in:

```txt
out/
```
