import { config } from "dotenv";

config();

import createBranchFromMaster from "../src/helpers/createBranchFromMaster";
import createPullRequest from "../src/helpers/createPullRequest";
import updatePackageJson from "../src/helpers/updatePackageJson";

const generateRandomVersion = () =>
  [
    Math.round(Math.random() * 10),
    Math.round(Math.random() * 10),
    Math.round(Math.random() * 10),
  ].join(".");

const pckgName = process.env.TEST_PACKAGE_NAME;
const repo = process.env.TEST_REPOSITORY;
const owner = process.env.TEST_REPOSITORY_OWNER;
const token = process.env.TEST_REPOSITORY_TOKEN;

describe("whole process tests", () => {
  const pckgVersion = generateRandomVersion();

  it("should create new branch", async () => {
    await createBranchFromMaster({ repo, owner, token }, pckgName, pckgVersion);
  });

  it("should update package version", async () => {
    await updatePackageJson({ repo, owner, token }, pckgName, pckgVersion);
  });

  it("should create a pull request", async () => {
    await createPullRequest({ repo, owner, token }, pckgName, pckgVersion);
  });
});
