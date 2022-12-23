import axios from "axios";
import { RepoDetails } from "../types";
import getBranchName from "./getBranchName";

/**
 * This function updates package.json
 * docs: https://docs.github.com/en/rest/repos/contents
 */
const updatePackageJson = async (
  { owner, repo, token }: RepoDetails,
  pckg: string,
  version: string
) => {
  const getPackageJsonResponse = await axios.request({
    method: "get",
    url: `https://api.github.com/repos/${owner}/${repo}/contents/package.json?ref=${getBranchName(
      pckg,
      version
    )}`,
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${token}`,
    },
  });

  const pckgJson = JSON.parse(
    Buffer.from(getPackageJsonResponse.data.content, "base64").toString("ascii")
  );

  if (!pckgJson.dependencies?.[pckg]) {
    throw new Error(`${pckg} not found in the remote branch!`);
  }

  pckgJson.dependencies[pckg] = version;

  const pushCommitResponse = await axios.request({
    method: "put",
    url: `https://api.github.com/repos/${owner}/${repo}/contents/package.json`,
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${token}`,
    },
    data: JSON.stringify({
      branch: getBranchName(pckg, version),
      content: Buffer.from(JSON.stringify(pckgJson, null, 2)).toString(
        "base64"
      ),
      message: `Update ${pckg} version to ${version}.`,
      sha: getPackageJsonResponse.data.sha,
    }),
  });

  // todo: verify the response
};

export default updatePackageJson;
