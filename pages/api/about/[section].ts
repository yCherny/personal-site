import { Section } from '@/interfaces/about';
import mongoose from 'mongoose';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';

import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const session = await getServerSession(req, res, authOptions);
	const sectionSlug = req.query.section as string;

	let client;
	try {
		client = await mongoose.connect(process.env.MONGO_INSTANCE as string);
	} catch (err) {
		res.status(500).json({ error: 'Connecting to the database failed.' });
		return;
	}

	switch (req.method) {
		case 'GET':
			let section;
			try {
				const query = Section.where({ title: sectionSlug });
				section = await query.findOne();
			} catch (err) {
				res.status(500).json({ error: err });
				client.connection.close();
				return;
			}

			res.status(200).json({ section: section });
			break;
		case 'DELETE':
			if (session) {
				console.log(`API DELETE: ${sectionSlug}`);
				await Section.deleteOne({ title: sectionSlug });
				res.status(202).json({
					deleted: `Section ${sectionSlug}`,
				});
			} else {
				res.status(401).json({
					error: `Unauthorized to access this api point`,
				});
			}
			break;
		default:
			res.setHeader('Allow', ['GET', 'DELETE']);
			res.status(405).end(`Method ${req.method} Not Allowed`);
			break;
	}
	client.connection.close();
}
