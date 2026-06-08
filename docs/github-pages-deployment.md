# GitHub Pages Deployment

This project is configured for static export with Next.js and can be deployed to GitHub Pages from GitHub Actions.

## What Is Already Set Up

- `next.config.ts` uses `output: "export"` so `npm run build` creates a static `out/` folder.
- `.github/workflows/deploy-github-pages.yml` builds the app, typechecks, lints, uploads `out/`, and deploys to GitHub Pages.
- The workflow sets `NEXT_PUBLIC_BASE_PATH` to `/<repository-name>`, which is correct for normal project pages such as:

```txt
https://your-username.github.io/tutorial/
```

## GitHub Setup

1. Push this repository to GitHub.
2. In GitHub, open the repository settings.
3. Go to `Pages`.
4. Under `Build and deployment`, set `Source` to `GitHub Actions`.
5. Push to the `main` branch or run the workflow manually from the `Actions` tab.

## User/Organization Pages Exception

If the repository is named like this:

```txt
your-username.github.io
```

then the site is served from the domain root, not from `/<repository-name>`.

In that case, edit `.github/workflows/deploy-github-pages.yml` and change:

```yaml
NEXT_PUBLIC_BASE_PATH: /${{ github.event.repository.name }}
```

to:

```yaml
NEXT_PUBLIC_BASE_PATH: ""
```

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
