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
	const postId = req.query.postId as string;
	let client;
	try {
		client = await databaseConnect();
	} catch (err) {
		res.status(500).json({ error: 'Connecting to the database failed.' });
		return;
	}

	// Upload Post
	if (req.method === 'POST') {
		let result;
		const postData = JSON.parse(req.body);

		try {
			result = await insertDocument(
				client,
				process.env.DATABASE_NAME,
				'posts',
				postData
			);
		} catch (err) {
			res.status(500).json({ error: err });
			client.close();
			return;
		}

		res.status(200).send({
			message: `Post ${result} successfully uploaded!`,
		});
	}

	// Get Post by Id
	if (req.method === 'GET') {
		let post;

		try {
			post = await getDocumentById(
				client,
				process.env.DATABASE_NAME,
				'posts',
				postId
			);
		} catch (err) {
			res.status(500).json({ error: err });
			client.close();
			return;
		}

		res.status(200).json({ post: post });
	}

	client.close();
}
