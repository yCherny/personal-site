import type { NextApiRequest, NextApiResponse } from 'next';
import { Post } from '@/interfaces/content';
import mongoose from 'mongoose';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';

const uri = process.env.MONGO_INSTANCE as string;
export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const session = await getServerSession(req, res, authOptions);

	let client;
	try {
		client = await mongoose.connect(uri);
	} catch (err) {
		res.status(500).json({ error: 'Connecting to the database failed.' });
		return;
	}

	switch (req.method) {
		case 'GET':
			let projects;
			const query = Post.where({ type: 'portfolio' });
			try {
				projects = await query.find();
				console.log(projects);
			} catch (err) {
				res.status(500).json({ error: err });
				client.connection.close();
				return;
			}

			res.status(200).json({ projects: projects });
			break;
		case 'POST':
			if (session) {
				let post = new Post(req.body);
				let postUpload;
				try {
					postUpload = await post.save({ timestamps: true });
					console.log(`Response: ${postUpload}`);
				} catch (err) {
					res.status(500).json({ error: err });
					client.connection.close();
					return;
				}

				res.status(202).json({ message: `uploaded` });
			} else {
				res.status(401).json({
					error: `Unauthorized to access this api point`,
				});
			}
			break;
		case 'DELETE':
			if (session) {
				const deletedPost = await Post.deleteOne({ name: req.body });
				res.status(202).json({
					message: `deleted post: ${deletedPost}`,
				});
			} else {
				res.status(401).json({
					error: `Unauthorized to access this api point`,
				});
			}
			break;
		default:
			res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
			res.status(405).end(`Method ${req.method} Not Allowed`);
			break;
	}
	client.connection.close();
}
