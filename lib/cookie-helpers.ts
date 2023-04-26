import Content from '@/interfaces/content';
import { getCookie, setCookie } from 'cookies-next';
import { v4 as uuidv4 } from 'uuid';
import { Vote } from '@/components/content/detail-content';

export async function updateViewCount(type: string, slug: string) {
	if (!getCookie('visitor_uid')) {
		const uuid = uuidv4();
		setCookie('visitor_uid', uuid, { maxAge: 60 * 6 * 24 });
	}

	const userCookie = getCookie('visitor_uid')?.valueOf() as string;
	const viewDoc = { view: true, cookie: userCookie };
	const viewJSON = JSON.stringify(viewDoc);

	console.log(`Doc: ${viewJSON} | Type: ${type} | Slug: ${slug}`);

	try {
		let res = await fetch(`http://localhost:3000/api/${type}/${slug}`, {
			method: 'POST',
			body: viewJSON,
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		});
		res = await res.json();
		console.log(res);
	} catch (err) {
		console.log(`Error: ${err}`);
	}
}

export async function updateVoteCount(vote: Vote, type: string, slug: string) {
	if (!getCookie('visitor_uid')) {
		const uuid = uuidv4();
		setCookie('visitor_uid', uuid, { maxAge: 60 * 6 * 24 });
	}

	const userCookie = getCookie('visitor_uid');
	const voteDoc = { upvote: vote === Vote.Upvote, cookie: userCookie };
	const voteJSON = JSON.stringify(voteDoc);

	console.log(`Doc: ${voteJSON} | Type: ${type} | Slug: ${slug}`);

	try {
		let res = await fetch(`http://localhost:3000/api/${type}/${slug}`, {
			method: 'POST',
			body: voteJSON,
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		});
		res = await res.json();
		console.log(res);
	} catch (err) {
		console.log(`Error: ${err}`);
	}
}

export function checkUsersVote(post: Content) {
	if (!getCookie('visitor_uid')) {
		return Vote.None;
	}

	const userCookie = getCookie('visitor_uid')?.valueOf() as string;
	if (post.upvotes?.includes(userCookie)) {
		return Vote.Upvote;
	} else if (post.downvotes?.includes(userCookie)) {
		return Vote.Downvote;
	} else {
		return Vote.None;
	}
}
