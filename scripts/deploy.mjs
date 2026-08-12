import { execSync } from "node:child_process";

const run = (command) =>
  execSync(command, { stdio: "inherit", shell: process.platform === "win32" });

const get = (command) => execSync(command, { encoding: "utf8" }).trim();

try {
  const dirty = get("git status --porcelain") !== "";

  if (dirty) {
    run("git add -A");
    const stamp = new Date().toISOString().replace(/[:T]/g, "-").slice(0, 19);
    run(`git commit -m "deploy: update site (${stamp})"`);
    console.log("\nCommitted all changes.");
  } else {
    console.log("Nothing to commit — pushing the current commit.");
  }

  const branch = get("git rev-parse --abbrev-ref HEAD") || "main";
  run(`git push origin ${branch}`);

  console.log(
    "\nPushed to GitHub. The push-to-main workflow will build and update the deployed site automatically."
  );
} catch (error) {
  console.error("\nDeploy failed:", error.message);
  process.exit(1);
}