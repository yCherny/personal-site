import mongoose from 'mongoose';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';

import type { NextApiRequest, NextApiResponse } from 'next';
import { Contact } from '@/interfaces/contact';

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
			if (session) {
				try {
					const contacts = await Contact.find();
					res.status(200).json({ contacts: contacts });
				} catch (err) {
					res.status(500).json({ error: err });
				}
			} else {
				res.status(401).json({
					error: `Unauthorized to access this api point`,
				});
			}

			break;
		case 'POST':
			const newContact = new Contact(req.body);
			try {
				const contactUpload = await newContact.save();
				res.status(202).json({ message: `uploaded` });
			} catch (err) {
				res.status(500).json({ error: err });
				client.connection.close();
				return;
			}
			break;
		default:
			res.setHeader('Allow', ['GET', 'POST']);
			res.status(405).end(`Method ${req.method} Not Allowed`);
			break;
	}
	client.connection.close();
}
