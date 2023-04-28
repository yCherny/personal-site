import { useRouter } from 'next/router';
import ErrorPage from 'next/error';
import Content from '@/interfaces/content';
import DetailContent from '@/components/content/detail-content';
import mongoose from 'mongoose';
import { Post } from '@/interfaces/content';

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
	let client = await mongoose.connect(process.env.MONGO_INSTANCE as string);

	// Get Portfolio Content
	const query = Post.where({ slug: context.params.projectId });
	const project = await query.findOne();
	const jsonProject = JSON.parse(JSON.stringify(project));
	client.connection.close();

	if (!project) {
		return {
			props: {},
		};
	}

	return {
		props: {
			project: jsonProject,
		},
	};
}
