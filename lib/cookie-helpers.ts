import { getCookie, setCookie } from 'cookies-next';
import { v4 as uuidv4 } from 'uuid';

export async function updateViewCount(type: string, slug: string) {
	if (!getCookie('visitor_uid')) {
		const uuid = uuidv4();
		setCookie('visitor_uid', uuid, { maxAge: 60 * 6 * 24 });
	}

	const userCookie = getCookie('visitor_uid');
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

export async function updateVoteCount(
	upvote: boolean,
	type: string,
	slug: string
) {
	if (!getCookie('visitor_uid')) {
		const uuid = uuidv4();
		setCookie('visitor_uid', uuid, { maxAge: 60 * 6 * 24 });
	}

	const userCookie = getCookie('visitor_uid');
	const voteDoc = { upvote: upvote, cookie: userCookie };
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
