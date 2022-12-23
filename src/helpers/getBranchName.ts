const getBranchName = (pckg: string, version: string) =>
  // todo: test character replacement
  `${pckg}_${version}`.replace(/:|\./g, "_");

export default getBranchName;
