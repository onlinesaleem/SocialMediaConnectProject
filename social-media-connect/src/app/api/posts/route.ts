import { prisma } from '@/lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';
  // Adjust the path to your Prisma client

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const scheduledPosts = await prisma.post.findMany({
        where: {
          status: 'SCHEDULED',  // Fetch only scheduled posts
        },
      });
      res.status(200).json(scheduledPosts);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch scheduled posts' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
