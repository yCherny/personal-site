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
	// const postId = req.query.postId as string;
	// let client;
	// try {
	// 	client = await databaseConnect();
	// } catch (err) {
	// 	res.status(500).json({ error: 'Connecting to the database failed.' });
	// 	return;
	// }

	// // Upload Post
	// if (req.method === 'POST') {
	// 	let result;
	// 	const postData = JSON.parse(req.body);

	// 	try {
	// 		result = await insertDocument(
	// 			client,
	// 			process.env.DATABASE_NAME,
	// 			'posts',
	// 			postData
	// 		);
	// 	} catch (err) {
	// 		res.status(500).json({ error: err });
	// 		client.close();
	// 		return;
	// 	}

	// 	res.status(200).send({
	// 		message: `Post ${result} successfully uploaded!`,
	// 	});
	// }

	// // Get Post by Id
	// if (req.method === 'GET') {
	// 	let post;

	// 	try {
	// 		post = await getDocumentById(
	// 			client,
	// 			process.env.DATABASE_NAME,
	// 			'posts',
	// 			postId
	// 		);
	// 	} catch (err) {
	// 		res.status(500).json({ error: err });
	// 		client.close();
	// 		return;
	// 	}

	// 	res.status(200).json({ post: post });
	// }

	// client.close();

	const session = await getServerSession(req, res, authOptions);
	const postSlug = req.query.postId as string;

	let client;
	try {
		client = await mongoose.connect(uri);
	} catch (err) {
		res.status(500).json({ error: 'Connecting to the database failed.' });
		return;
	}

	switch (req.method) {
		case 'GET':
			let post;
			const query = Post.where({ slug: postSlug });
			try {
				post = await query.findOne();
				console.log(`Retrieved Post: ${post}`);
			} catch (err) {
				res.status(500).json({ error: err });
				client.connection.close();
				return;
			}

			res.status(200).json({ post: post });
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
			res.setHeader('Allow', ['GET', 'DELETE']);
			res.status(405).end(`Method ${req.method} Not Allowed`);
			break;
	}
	client.connection.close();
}
