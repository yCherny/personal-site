import EditPane from './edit-skills';

import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import type { GetServerSidePropsContext } from 'next';

type Params = {
	params: {
		name: string;
	};
};

async function getContent({ params }: Params) {
	let skill;
	try {
		const res = await fetch(
			`http://localhost:3000/api/skill/${params.name}`
		);
		const data = await res.json();
		skill = data.skill;
	} catch (err) {
		console.log(`Error: ${err}`);
	}
	return skill;
}

export default async function getServerSideProps(
	params: Params,
	context: GetServerSidePropsContext
) {
	const content = await getContent(params);
	const session = await getServerSession(authOptions);

	return <EditPane skill={content} session={session} />;
}
