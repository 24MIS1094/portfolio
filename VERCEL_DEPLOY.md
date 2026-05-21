# Vercel Deploy — GitHub Actions

Follow these steps to enable automatic deploys from GitHub Actions to Vercel.

1. Create required repository secrets in GitHub

- Go to `Settings` → `Secrets and variables` → `Actions` → `New repository secret`.
- Add these secrets:
  - `VERCEL_TOKEN` — create a token in Vercel: Vercel Dashboard → Account Settings → Tokens → Create Token. Copy the token value.
  - `VERCEL_ORG_ID` — find in your Vercel dashboard under the Organization settings or Project settings (General → View IDs).
  - `VERCEL_PROJECT_ID` — find in the Project settings (General → View IDs).

2. Confirm workflow triggers

- The workflow `.github/workflows/vercel-deploy.yml` runs on `push` to `main`.
- To trigger a deploy immediately, push a commit to the `main` branch or run the workflow manually from the Actions tab.

3. Notes

- The workflow uses `npm run build` and deploys the `dist` folder. Ensure your build outputs to `dist` (Vite default is `dist`).
- If you prefer Vercel-integrated deployments, you can also connect the GitHub repo in the Vercel dashboard and skip the workflow.

If you want, I can also detect and open the specific GitHub Actions run page or create a README section linking to this file.
