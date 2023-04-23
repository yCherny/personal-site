import { useRouter } from 'next/router';
import ErrorPage from 'next/error';
import Head from 'next/head';
import Content from '@/interfaces/content';
import DetailContent from '@/components/content/detail-content';
import { useEffect } from 'react';
import { updateViewCount } from '@/lib/cookie-helpers';

type Props = {
	post: Content;
	preview?: boolean;
};

export default function PostDetail({ post }: Props) {
	useEffect(() => {
		updateViewCount(post.type, post.slug);
	}, []);

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
		`http://localhost:3000/api/blog/${context.params.postId}`
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
