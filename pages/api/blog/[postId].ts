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
	const postSlug = req.query.postId as string;

	console.log(`REQUEST POST: ${JSON.stringify(req.body)}`);

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
			try {
				const query = Post.where({ slug: postSlug });
				post = await query.findOne();
				// console.log(`Retrieved Post: ${post}`);
			} catch (err) {
				res.status(500).json({ error: err });
				client.connection.close();
				return;
			}

			res.status(200).json({ post: post });
			break;
		case 'POST':
			// Handle Cookies Here
			console.log(`Asked to Update Post`);
			const data = req.body;
			const view = data.view as boolean;
			const upvote = data.upvote as boolean;
			const userID = data.cookie as string;

			console.log(
				`[${postSlug}] Asked to Perform the Following Operations on Post: (upvote: ${upvote}) (visitor_uuid: ${userID}), (view: ${view})`
			);

			if (view) {
				try {
					await Post.updateOne(
						{
							slug: postSlug,
						},
						{
							$addToSet: { views: userID },
						}
					);
				} catch (err) {
					res.status(500).json({ error: err });
					client.connection.close();
					return;
				}
			} else {
				try {
					await Post.updateOne(
						{
							slug: postSlug,
						},
						{
							$addToSet: upvote
								? { upvotes: userID }
								: { downvotes: userID },
							$pull: upvote
								? { downvotes: userID }
								: { upvotes: userID },
						}
					);
				} catch (err) {
					res.status(500).json({ error: err });
					client.connection.close();
					return;
				}
			}

			res.status(202).json({ message: `Successfully updated` });
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
