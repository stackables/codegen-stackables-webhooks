import type { KnipConfig } from "knip";

// `pnpm knip --production` leaves out tests and devDependencies, so exports that only a test
// uses count as dead there. In that run an export used only inside its own file is dead too.
const production = process.argv.includes("--production");

const config: KnipConfig = {
  // Production source is marked with `!`; the tests are only in the default run.
  project: ["src/**/*.ts!", "test/**/*.ts"],
  ignoreExportsUsedInFile: production,
  // knip reports `cycles` as a warning by default, which never fails CI: make an import cycle an error.
  rules: { cycles: "error" },
  include: [
    "files",
    "dependencies",
    "unlisted",
    "binaries",
    "unresolved",
    "exports",
    "types",
    "nsTypes",
    "enumMembers",
    "namespaceMembers",
    "duplicates",
    "cycles",
  ],
};

export default config;
