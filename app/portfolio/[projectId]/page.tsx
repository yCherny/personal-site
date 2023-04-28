import Content from '@/interfaces/content';
import DetailContent from '@/components/content/detail-content';

type Params = {
	params: {
		projectId: string;
	};
};

export async function getProject(projectId?: string) {
	const res = await fetch(`http://localhost:3000/api/portfolio/${projectId}`);

	const data = await res.json();
	const project: Content = data.project;
	return project;
}

export default async function ProjectDetail({ params }: Params) {
	const project = await getProject(params.projectId);
	return <DetailContent data={project} type={'project'} />;
}
