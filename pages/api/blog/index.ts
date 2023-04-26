import mongoose from 'mongoose';
import { Post } from '@/interfaces/content';
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
				const query = Post.where({ type: 'blog' });
				const posts = await query.find();
				res.status(200).json({ posts: posts });
			} catch (err) {
				res.status(500).json({ error: err });
			}
			break;
		case 'POST':
			if (session) {
				let post = await Post.exists({ slug: req.body.slug });
				if (post) {
					await Post.updateOne({ slug: req.body.slug }, req.body);
				} else {
					const newPost = new Post(req.body);
					try {
						const postUpload = await newPost.save({
							timestamps: true,
						});
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
