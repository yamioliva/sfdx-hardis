import * as c from "chalk";
import * as fs from "fs-extra";
import { isCI } from "../../common/utils";
import { prompts } from "../../common/utils/prompts";

export const hook = async (options: any) => {
  // Skip hooks from other commands than hardis:scratch commands
  const commandId = options?.id || "";

  if (!process.argv.includes("--json")) {
    await manageGitIgnoreForceIgnore(commandId);
  }
};

async function manageGitIgnoreForceIgnore(commandId: string) {
  if (!commandId.startsWith("hardis")) {
    return;
  }
  if (commandId.startsWith("hardis:work:task:new")) {
    return;
  }
  // Manage .gitignore
  const gitIgnoreFile = "./.gitignore";
  if (fs.existsSync(gitIgnoreFile)) {
    const gitIgnore = await fs.readFile(gitIgnoreFile, "utf-8");
    const gitIgnoreLines = gitIgnore
      .replace("\r\n", "\n")
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line !== "");
    let updated = false;
    for (const gitIgnoreMandatoryLine of await getHardisGitRepoIgnoreContent()) {
      if (!gitIgnoreLines.includes(gitIgnoreMandatoryLine) && !gitIgnoreLines.includes(`# ${gitIgnoreMandatoryLine}`)) {
        gitIgnoreLines.push(gitIgnoreMandatoryLine);
        updated = true;
      }
    }
    // Remove duplicates
    const gitIgnoreLinesUnique = Array.from(new Set(gitIgnoreLines));
    // Propose user to apply updates
    if ((updated || gitIgnoreLines.length !== gitIgnoreLinesUnique.length) && !isCI) {
      const confirm = await prompts({
        type: "confirm",
        name: "value",
        initial: true,
        message: c.cyanBright("Your .gitignore is deprecated, do you agree to upgrade it ? (If you hesitate, just trust us and accept)"),
      });
      if (confirm.value === true || isCI) {
        await fs.writeFile(gitIgnoreFile, gitIgnoreLinesUnique.join("\n") + "\n", "utf-8");
        console.log(c.cyan("[sfdx-hardis] Updated .gitignore"));
      }
    }
  }

  // Manage .forceignore
  const forceIgnoreFile = "./.forceignore";
  if (fs.existsSync(forceIgnoreFile)) {
    const forceIgnore = await fs.readFile(forceIgnoreFile, "utf-8");
    const forceIgnoreLines = forceIgnore
      .replace("\r\n", "\n")
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line !== "");
    let updated = false;
    for (const forceIgnoreMandatoryLine of await getHardisForceIgnoreContent()) {
      if (!forceIgnoreLines.includes(forceIgnoreMandatoryLine) && !forceIgnoreLines.includes(`# ${forceIgnoreMandatoryLine}`)) {
        forceIgnoreLines.push(forceIgnoreMandatoryLine);
        updated = true;
      }
    }
    // Remove duplicates
    const forceIgnoreLinesUnique = Array.from(new Set(forceIgnoreLines));
    // Propose user to apply updates
    if ((updated || forceIgnoreLines.length !== forceIgnoreLinesUnique.length) && !isCI) {
      const confirm = await prompts({
        type: "confirm",
        name: "value",
        initial: true,
        message: c.cyanBright("Your .forceignore is deprecated, do you agree to upgrade it ? (If you hesitate, just trust us and accept)"),
      });
      if (confirm.value === true || isCI) {
        await fs.writeFile(forceIgnoreFile, forceIgnoreLinesUnique.join("\n") + "\n", "utf-8");
        console.log(c.cyan("[sfdx-hardis] Updated .forceignore"));
      }
    }
  }
}

async function getHardisGitRepoIgnoreContent() {
  const gitIgnoreContent = [
    ".cache/",
    "config/user/",
    "hardis-report/",
    "tmp/",
    "**/__tests__/**",
    // Metadatas to be ignored
    "**/siteDotComSites/*.site",
    // SFDX Items to be ignored
    "**/data/**/source/**",
    "**/data/**/target/**",
    "force-app/main/default/appMenus/AppSwitcher.appMenu-meta.xml",
  ];
  return gitIgnoreContent;
}

async function getHardisForceIgnoreContent() {
  const forceIgnoreContent = [
    "**/appMenu/**",
    "**/appSwitcher/**",
    //"**/objectTranslations/**",
    // "**/profiles/**",
    // "**/settings/**",

    "**/jsconfig.json",
    "**/.eslintrc.json",

    "**/__tests__/**",
    "**/pubsub/**",
    "**SfdxHardisDeferSharingRecalc**",
  ];
  return forceIgnoreContent;
}
