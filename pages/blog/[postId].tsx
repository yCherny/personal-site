import { useRouter } from 'next/router';
import ErrorPage from 'next/error';
import Content from '@/interfaces/content';
import DetailContent from '@/components/content/detail-content';

type Props = {
	post: Content;
	preview?: boolean;
};

export default function PostDetail({ post }: Props) {
	const router = useRouter();
	if (!router.isFallback && !post?.slug) {
		return <ErrorPage statusCode={404} />;
	}

	return <DetailContent data={post} type={'blog'} />;
}

type Params = {
	params: {
		postId: string;
	};
};

export async function getServerSideProps(context: Params) {
	const res = await fetch(
		`http://192.168.1.169:3000/api/blog/${context.params.postId}`
	);
	const data = await res.json();
	const post: Content = data.post;

	if (!data) {
		return {
			props: {},
		};
	}

	return {
		props: {
			post: post,
		},
	};
}
