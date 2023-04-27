import EditPane from './edit-uploads';

import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import type { GetServerSidePropsContext } from 'next';

type Params = {
	params: {
		slug: string;
	};
};

async function getContent({ params }: Params) {
	let post;
	try {
		const res = await fetch(
			`http://localhost:3000/api/blog/${params.slug}`
		);
		const data = await res.json();
		post = data.post;
	} catch (err) {
		console.log(`Error: ${err}`);
	}
	return post;
}

export default async function getServerSideProps(
	params: Params,
	context: GetServerSidePropsContext
) {
	const content = await getContent(params);
	const session = await getServerSession(authOptions);

	return <EditPane content={content} session={session} />;
}
