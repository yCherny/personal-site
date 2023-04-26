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
	const projectSlug = req.query.projectId as string;

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
				const query = Post.where({ slug: projectSlug });
				const project = await query.findOne();
				res.status(200).json({ project: project });
			} catch (err) {
				res.status(500).json({ error: err });
			}
			break;
		case 'POST':
			const data = req.body;
			const view = data.view as boolean;
			const upvote = data.upvote as boolean;
			const userID = data.cookie as string;

			if (view) {
				const query = await Post.findOne({ slug: projectSlug });
				try {
					const updatedProject = await Post.updateOne(
						{ slug: projectSlug },
						{ $addToSet: { views: userID } }
					);
					res.status(202).json({ message: `Successfully updated` });
				} catch (err) {
					res.status(500).json({ error: err });
				}
			} else {
				try {
					const match = upvote
						? { slug: projectSlug, upvotes: userID }
						: { slug: projectSlug, downvotes: userID };
					const voteExists = await Post.findOne(match);

					if (voteExists) {
						await Post.updateOne(
							{ slug: projectSlug },
							{
								$pull: upvote
									? { upvotes: userID }
									: { downvotes: userID },
							}
						);
					} else {
						await Post.updateOne(
							{ slug: projectSlug },
							{
								$addToSet: upvote
									? { upvotes: userID }
									: { downvotes: userID },
								$pull: upvote
									? { downvotes: userID }
									: { upvotes: userID },
							}
						);
					}

					res.status(202).json({ message: `Successfully updated` });
				} catch (err) {
					res.status(500).json({ error: err });
				}
			}
			break;
		case 'DELETE':
			if (session) {
				await Post.deleteOne({ slug: projectSlug });
				res.status(202).json({ deleted: `/portolio/${projectSlug}` });
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
