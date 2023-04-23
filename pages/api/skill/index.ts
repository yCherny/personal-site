import { Skill } from '@/interfaces/skill';
import mongoose from 'mongoose';
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
			let skills;
			try {
				skills = await Skill.find();
				console.log(skills);
			} catch (err) {
				res.status(500).json({ error: err });
				client.connection.close();
				return;
			}

			res.status(200).json({ skills: skills });
			break;
		case 'POST':
			if (session) {
				let skill = await Skill.exists({ name: req.body.name });
				if (skill) {
					// Skill Already Exists -> Update it;
					await Skill.updateOne({ name: req.body.name }, req.body);
				} else {
					// New Post, Who Dis?
					const newSkill = new Skill(req.body);
					let skillUpload;
					try {
						skillUpload = await newSkill.save();
						console.log(`Response: ${skillUpload}`);
					} catch (err) {
						res.status(500).json({ error: err });
						client.connection.close();
						return;
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
