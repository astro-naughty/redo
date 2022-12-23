import createBranchFromMaster from "./helpers/createBranchFromMaster";
import createPullRequest from "./helpers/createPullRequest";
import updatePackageJson from "./helpers/updatePackageJson";
import session from "./session";

session(
  async (question) => {
    console.log(
      `Welcome!\nI will guide You through some simple steps now, please enter:`
    );

    // here we get all the information
    const pckgName = await question("package name: ");
    const pckgVersion = await question("package version: ");
    const repo = await question("repository name: ");
    const owner = await question("repository owner: ");
    const token = await question("auth token: ");

    console.log("Thanks! I am processing now...");

    console.log("Building new branch...");
    await createBranchFromMaster({ repo, owner, token }, pckgName, pckgVersion);

    console.log("Updating package.json...");
    await updatePackageJson({ repo, owner, token }, pckgName, pckgVersion);

    console.log("Creating a pull request...");
    await createPullRequest({ repo, owner, token }, pckgName, pckgVersion);

    console.log("Aaaaand... we're ready!");
  },
  { trim: true }
);
