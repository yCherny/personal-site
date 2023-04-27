import EditPane from './edit-about';

import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import type { GetServerSidePropsContext } from 'next';

type Params = {
	params: {
		title: string;
	};
};

async function getContent({ params }: Params) {
	let section;
	try {
		const res = await fetch(
			`http://localhost:3000/api/about/${params.title}`
		);
		const data = await res.json();
		section = data.section;
	} catch (err) {
		console.log(`Error: ${err}`);
	}
	return section;
}

export default async function getServerSideProps(
	params: Params,
	context: GetServerSidePropsContext
) {
	const content = await getContent(params);
	const session = await getServerSession(authOptions);

	return <EditPane content={content} session={session} />;
}
