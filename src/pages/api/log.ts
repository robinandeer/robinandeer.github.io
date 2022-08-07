import type {NextApiRequest, NextApiResponse} from 'next';

export const config = {
	runtime: 'experimental-edge',
};

import incrementPageCount from 'database/increment-page-count';

const log = async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method === 'POST') {
		await incrementPageCount(req.body.url);
		res.status(200).json({status: 'OK'});
	} else {
		res.status(400);
	}
};

export default log;
