// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { setCookie } from '@/utils/cookies';

type Data = {
  email?: string;
  role?: string;
  message?: string;
};

const data = [
  {
    email: 'bob@test.com',
    role: 'clients'
  },
  {
    email: 'alice@test.com',
    role: 'prospects'
  }
];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const email = req?.body?.email;
  const userRole = data.filter(userRole => userRole.email === email);

  if (!userRole.length) {
    res.status(200).json({ message: 'not found' });
  }

  setCookie(res, 'token', userRole[0]?.role, { path: '/', maxAge: 2592000 });
  res.status(200).json(userRole[0]);
}
