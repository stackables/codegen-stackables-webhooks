# Agent instructions

- Both `pnpm knip` and `pnpm knip --production` fail CI (steps of `.github/workflows/coverage.yml`). Fix what knip finds by deleting the dead code or unused dependency; do not ignore it. Any `ignore` entry in `knip.ts` needs a comment saying why.
