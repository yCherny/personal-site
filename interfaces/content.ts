import type Author from './author';
import type Tag from './tag';

type Content = {
	slug: string;
	startDate: string;

	// Optional For Projects
	endDate?: string;

	title: string;
	excerpt: string;
	tags: string[];

	// Optional
	color?: string;

	// External Links (Optional)
	externalLink?: string;
	githubLink?: string;

	// Main Image -> Might Have Optional Copyright Data
	coverImage: {
		url: string;
		copyrightLink?: string;
		copyrightOwner?: string;
	};

	authors: Author[];

	content: string;
};

export default Content;
