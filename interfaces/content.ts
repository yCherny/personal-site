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

	// Status
	status: string; // 'draft' or 'published'

	// Optionals
	color: string;
	externalLink: string;
	githubLink: string;

	// Metadata
	downvotes: [string];
	upvotes: [string];
	views: [string];
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

		// Status
		status: { type: String, enum: ['draft', 'published'], default: 'published' },

		// Optionals
		color: { type: String },
		externalLink: { type: String },
		githubLink: { type: String },

		// Metadata
		downvotes: { type: [String], required: false, default: [] },
		upvotes: { type: [String], required: false, default: [] },
		views: { type: [String], required: false, default: [] },
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

	status?: string; // 'draft' or 'published'
	color?: string;
	externalLink?: string;
	githubLink?: string;
	downvotes?: string[];
	upvotes?: string[];
	views?: string[];
};

export default Content;
