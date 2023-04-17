import fs from 'fs';
import { join } from 'path';
import matter from 'gray-matter';

const aboutDirectory = join(process.cwd(), '_about');

export function getAboutMeData(fields: string[] = []) {
	const fullPath = join(aboutDirectory, `about.md`);
	const fileContents = fs.readFileSync(fullPath, 'utf8');
	const { data, content } = matter(fileContents);

	type Items = {
		[key: string]: string;
	};

	const items: Items = {};

	fields.forEach((field) => {
		if (field === 'content') {
			items[field] = content;
		}

		if (typeof data[field] !== 'undefined') {
			items[field] = data[field];
		}
	});

	return items;
}
