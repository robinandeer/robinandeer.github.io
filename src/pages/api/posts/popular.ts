import type {NextApiRequest, NextApiResponse} from 'next';

import getPopularPosts from 'database/get-popular-posts';

const getPosts = async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method === 'GET') {
		const blogPosts = await getPopularPosts();
		res.status(200).json({blogPosts});
	} else {
		res.status(400);
	}
};

export default getPosts;
