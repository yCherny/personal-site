import { useRouter } from 'next/router';
import ErrorPage from 'next/error';
import Head from 'next/head';
import Content from '@/interfaces/content';
import DetailContent from '@/components/content/detail-content';
import { useEffect } from 'react';
import { updateViewCount } from '@/lib/cookie-helpers';

type Props = {
	project: Content;
};

export default function ProjectDetail({ project }: Props) {
	useEffect(() => {
		if (project.type && project.slug) {
			updateViewCount(project.type, project.slug);
			// console.log(`Hello`);
		}
	}, [project]);

	const router = useRouter();
	if (!router.isFallback && !project?.slug) {
		return <ErrorPage statusCode={404} />;
	}

	return <DetailContent data={project} type={'project'} />;
}

type Params = {
	params: {
		projectId: string;
	};
};

export async function getServerSideProps(context: Params) {
	const res = await fetch(
		`http://localhost:3000/api/portfolio/${context.params.projectId}`
	);

	const data = await res.json();
	const project: Content = data.project;

	if (!data) {
		return {
			props: {},
		};
	}

	return {
		props: {
			project: project,
		},
	};
}
