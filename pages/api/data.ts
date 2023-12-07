import { NextApiRequest, NextApiResponse } from 'next';

const messageApi = (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json([
    "npm",
    "yarn",
    "pnpm",
    "nrm",
    "fanyi",
    "@antfu/ni",
    "x-init",
    "corepack",
    "@jsdevtools/version-bump-prompt",
    "@ast-grep/cli",
    "esno"
  ]);
};

export default messageApi;