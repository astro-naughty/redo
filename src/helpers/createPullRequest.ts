import axios from "axios";
import { RepoDetails } from "../types";
import getBranchName from "./getBranchName";

/**
 * This function creates pull request for a branch create for given package and version.
 * docs: https://docs.github.com/en/rest/pulls/pulls
 * todo: describe params
 * @param param0
 * @param pckg
 * @param version
 */
const createPullRequest = async (
  { owner, repo, token }: RepoDetails,
  pckg: string,
  version: string
) => {
  const createPullRequestResponse = await axios.request({
    method: "post",
    url: `https://api.github.com/repos/${owner}/${repo}/pulls`,
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${token}`,
    },
    data: JSON.stringify({
      title: `${pckg} - new version available! (${version})`,
      body: `This is an automatic pull request. It is intended to update version of ${pckg} to the latetst available.`,
      head: getBranchName(pckg, version),
      base: "main",
    }),
  });

  // todo: validate the response
};

export default createPullRequest;
