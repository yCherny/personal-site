import { useRouter } from 'next/router';
import ErrorPage from 'next/error';
import { getPostBySlug, getAllPosts } from '../../lib/api';
import Head from 'next/head';
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

export async function getStaticProps({ params }: Params) {
	const post = getPostBySlug(params.postId, [
		'slug',
		'startDate',
		'endDate',
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
			post: {
				...post,
			},
		},
	};
}

export async function getStaticPaths() {
	const posts = getAllPosts(['slug']);

	return {
		paths: posts.map((post) => {
			return {
				params: {
					postId: post.slug,
				},
			};
		}),
		fallback: false,
	};
}
