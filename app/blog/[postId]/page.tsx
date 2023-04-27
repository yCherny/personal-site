import Content from '@/interfaces/content';
import DetailContent from '@/components/content/detail-content';

type Params = {
	params: {
		postId: string;
	};
};

async function getPost({ params }: Params) {
	const res = await fetch(`http://localhost:3000/api/blog/${params.postId}`);
	const data = await res.json();
	const post: Content = data.post;
	return post;
}

export default async function PostDetail(params: Params) {
	const post = await getPost(params);
	return <DetailContent data={post} type={'blog'} />;
}
