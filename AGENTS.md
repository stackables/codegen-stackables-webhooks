# Agent instructions

- Dependencies and unused code (files, exports, types, cycles) are checked with `pnpm knip` and `pnpm knip --production` (config: `knip.ts`); both fail CI (steps of `.github/workflows/coverage.yml`). An export nothing else imports should not be exported: a barrel re-export is not a use. The production run leaves tests and devDependencies out, so code only a test calls counts as dead: delete it, or move it into the test. Fix what knip finds by deleting the dead code or unused dependency; do not ignore it. Any `ignore` entry in `knip.ts` needs a comment saying why.
