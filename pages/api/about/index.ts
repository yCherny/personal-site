import mongoose from 'mongoose';
import { Section } from '@/interfaces/about';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';

import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const session = await getServerSession(req, res, authOptions);

	let client;
	try {
		client = await mongoose.connect(process.env.MONGO_INSTANCE as string);
	} catch (err) {
		res.status(500).json({ error: 'Connecting to the database failed.' });
		return;
	}

	switch (req.method) {
		case 'GET':
			try {
				const sections = await Section.find();
				res.status(200).json({ sections: sections });
			} catch (err) {
				res.status(500).json({ error: err });
			}
			break;
		case 'POST':
			if (session) {
				let section = await Section.exists({ title: req.body.title });
				if (section) {
					await Section.updateOne(
						{ title: req.body.title },
						req.body
					);
				} else {
					const newSection = new Section(req.body);
					try {
						const sectionUpload = await newSection.save();
					} catch (err) {
						res.status(500).json({ error: err });
					}
				}

				res.status(202).json({ message: `uploaded` });
			} else {
				res.status(401).json({
					error: `Unauthorized to access this api point`,
				});
			}
			break;
		default:
			res.setHeader('Allow', ['GET', 'POST']);
			res.status(405).end(`Method ${req.method} Not Allowed`);
			break;
	}
	client.connection.close();
}
