import { useRouter } from 'next/router';
import ErrorPage from 'next/error';
import Content from '@/interfaces/content';
import { getProjectBySlug, getAllProjects } from '@/lib/projectApi';
import Head from 'next/head';
import DetailContent from '@/components/content/detail-content';

type Props = {
	project: Content;
};

export default function ProjectDetail({ project }: Props) {
	const router = useRouter();
	if (!router.isFallback && !project?.slug) {
		return <ErrorPage statusCode={404} />;
	}

	return <DetailContent type={'projects'} data={project} />;
}

type Params = {
	params: {
		projectId: string;
	};
};

export async function getStaticProps({ params }: Params) {
	const project = getProjectBySlug(params.projectId, [
		'slug',
		'createdDate',
		'editedDate',
		'title',
		'excerpt',
		'tags',
		'color',
		'externalLink',
		'githubLink',
		'coverImage',
		'authors',
		'content',
	]);

	return {
		props: {
			project: {
				...project,
			},
		},
	};
}

export async function getStaticPaths() {
	const projects = getAllProjects(['slug']);

	return {
		paths: projects.map((project) => {
			return {
				params: {
					projectId: project.slug,
				},
			};
		}),
		fallback: false,
	};
}
