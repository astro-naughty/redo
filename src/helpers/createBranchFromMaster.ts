import axios from "axios";
import { RepoDetails } from "../types";
import getBranchName from "./getBranchName";

/**
 * This function should create new branch based on main branch.
 * docs: https://docs.github.com/en/rest/git/refs
 */
const createBranchFrommain = async (
  { owner, repo, token }: RepoDetails,
  pckg: string,
  version: string
) => {
  const getRefResponse = await axios.request({
    method: "get",
    url: `https://api.github.com/repos/${owner}/${repo}/git/ref/heads/main`,
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${token}`,
    },
  });

  const { sha } = getRefResponse.data.object;

  const createBranchResponse = await axios.request({
    method: "post",
    url: `https://api.github.com/repos/${owner}/${repo}/git/refs`,
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${token}`,
    },
    data: JSON.stringify({
      ref: `refs/heads/${getBranchName(pckg, version)}`,
      sha: sha,
    }),
  });

  // todo: verify createBranchResponse
};

export default createBranchFrommain;
