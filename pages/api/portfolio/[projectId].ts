import type { NextApiRequest, NextApiResponse } from 'next';

import {
	databaseConnect,
	insertDocument,
	getDocumentById,
} from '@/lib/db-utils';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const projectId = req.query.projectId as string;
	let client;
	try {
		client = await databaseConnect();
	} catch (err) {
		res.status(500).json({ error: 'Connecting to the database failed.' });
		return;
	}

	// Upload Project
	if (req.method === 'POST') {
		let result;
		const projectData = JSON.parse(req.body);

		try {
			result = await insertDocument(
				client,
				process.env.DATABASE_NAME,
				'projects',
				projectData
			);
		} catch (err) {
			res.status(500).json({ error: err });
			client.close();
			return;
		}

		res.status(200).send({
			message: `Project ${result} successfully uploaded!`,
		});
	}

	// Get Project by Id
	if (req.method === 'GET') {
		let project;

		try {
			project = await getDocumentById(
				client,
				process.env.DATABASE_NAME,
				'projects',
				projectId
			);
		} catch (err) {
			res.status(500).json({ error: err });
			client.close();
			return;
		}

		res.status(200).json({ project: project });
	}

	client.close();
}
