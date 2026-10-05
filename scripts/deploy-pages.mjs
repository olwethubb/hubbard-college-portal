// Builds the site for GitHub Pages and publishes dist/ to the `gh-pages` branch.
//
//   npm run deploy
//
// The repo's Pages source must be the `gh-pages` branch (root). The site is served from
// https://<owner>.github.io/<repo>/, so the build uses "/<repo>/" as its base path.
import { execSync } from "node:child_process";
import fs from "node:fs";

const run = (cmd, opts = {}) => execSync(cmd, { stdio: "inherit", ...opts });
const read = (cmd) => execSync(cmd, { encoding: "utf8" }).trim();

const remote = read("git remote get-url origin");
const match = remote.match(/github\.com[/:]([^/]+)\/(.+?)(\.git)?$/);
if (!match) throw new Error(`origin is not a GitHub remote: ${remote}`);
const [, owner, repo] = match;

run("npm run build", {
  env: {
    ...process.env,
    BASE_PATH: `/${repo}/`,
    VITE_SITE_URL: `https://${owner.toLowerCase()}.github.io/${repo}`,
  },
});

// Skip Jekyll processing so every built file is served as-is.
fs.writeFileSync("dist/.nojekyll", "");

const sha = read("git rev-parse --short HEAD");
const git = (args) => run(`git ${args}`, { cwd: "dist" });
git("init -q -b gh-pages");
git("add -A");
git(`-c user.name="${read("git config user.name")}" -c user.email="${read("git config user.email")}" commit -qm "Deploy ${sha}"`);
git(`push -qf ${remote} gh-pages`);
fs.rmSync("dist/.git", { recursive: true, force: true });

console.log(`\nDeployed ${sha} → https://${owner.toLowerCase()}.github.io/${repo}/`);
