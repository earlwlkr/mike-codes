# Deploy Blocker

Date: 2026-03-08 (UTC)

Production deploy was not triggered from this environment due to the following blockers:

1. Dependency installation failed because the npm registry could not be resolved.
   - Command: `pnpm install`
   - Error: `getaddrinfo EAI_AGAIN registry.npmjs.org`
2. Vercel CLI is not available in this environment.
   - Command: `vercel --version`
   - Error: `vercel: command not found`

Because of these constraints, `vercel --prod --yes` could not be executed.
