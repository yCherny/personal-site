import type { NextApiRequest, NextApiResponse } from 'next';

import { databaseConnect, getAllDocuments } from '@/lib/db-utils';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	let client;
	try {
		client = await databaseConnect();
	} catch (err) {
		res.status(500).json({ error: 'Connecting to the database failed.' });
		return;
	}

	if (req.method === 'GET') {
		let projects;

		try {
			projects = await getAllDocuments(
				client,
				process.env.DATABASE_NAME,
				'projects',
				{
					createdDate: -1,
				}
			);
		} catch (err) {
			res.status(500).json({ error: err });
			client.close();
			return;
		}

		res.status(200).json({ projects: projects });
	}

	client.close();
}
