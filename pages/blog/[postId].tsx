import { useRouter } from "next/router";
import ErrorPage from "next/error";
import Content, { Post } from "@/interfaces/content";
import DetailContent from "@/components/content/detail-content";
import { dbConnect } from "@/lib/db-connect";

type Props = {
  post: Content;
  preview?: boolean;
};

export default function PostDetail({ post }: Props) {
  const router = useRouter();
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }

  return <DetailContent data={post} type={"blog"} />;
}

type Params = {
  params: {
    postId: string;
  };
};

export async function getServerSideProps(context: Params) {
  await dbConnect();

  try {
    // Get Post Content
    const query = Post.where({ slug: context.params.postId, status: "published" });
    const post = await query.findOne();
    const jsonPost = JSON.parse(JSON.stringify(post));

    return {
      props: {
        post: jsonPost,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      notFound: true,
    };
  }
}
