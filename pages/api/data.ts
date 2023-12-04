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
  ]);
};

export default messageApi;