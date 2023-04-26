import { useRouter } from 'next/router';
import ErrorPage from 'next/error';
import Content from '@/interfaces/content';
import DetailContent from '@/components/content/detail-content';

type Props = {
	project: Content;
};

export default function ProjectDetail({ project }: Props) {
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
