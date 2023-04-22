import type Tag from './tag';
import mongoose, { Schema, model, models, connect } from 'mongoose';
import type Author from '@/interfaces/author';
const uri = process.env.MONGO_INSTANCE as string;

export interface IPost {
	// Main Content
	type: string;
	slug: string;
	title: string;
	excerpt: string;
	tags: string[];
	content: string;
	authors: Author[];
	coverImage: { url: string; copyrightLink: string; copyrightOwner: string };

	// Optionals
	color: string;
	externalLink: string;
	githubLink: string;

	// Metadata
	downvotes: number;
	upvotes: number;
	views: number;
}

export const postSchema = new Schema<IPost>(
	{
		type: { type: String, required: true },
		slug: { type: String, required: true },
		title: { type: String, required: true },
		excerpt: { type: String, required: true },
		tags: { type: [String], required: true },
		content: { type: String, required: true },
		authors: {
			type: [{ name: String, picture: String, url: String }],
		},
		coverImage: {
			type: {
				url: String,
				copyrightLink: String,
				copyrightOwner: String,
			},
		},

		// Optionals
		color: { type: String },
		externalLink: { type: String },
		githubLink: { type: String },

		// Metadata
		downvotes: { type: Number, required: false, default: 0 },
		upvotes: { type: Number, required: false, default: 0 },
		views: { type: Number, required: false, default: 0 },
	},
	{ timestamps: true }
);

export const Post = models.Post || model<IPost>('Post', postSchema);

type Content = {
	createdAt: Date;
	updatedAt: Date;

	type: string;
	slug: string;
	title: string;
	excerpt: string;
	tags: string[];
	content: string;
	authors: Author[];
	coverImage: {
		url: string;
		copyrightLink?: string;
		copyrightOwner?: string;
	};

	color?: string;
	externalLink?: string;
	githubLink?: string;
	downvotes?: number;
	upvotes?: number;
	views?: number;
};

export default Content;
