import { useRouter } from "next/router";
import ErrorPage from "next/error";
import Content from "@/interfaces/content";
import DetailContent from "@/components/content/detail-content";
import mongoose from "mongoose";
import { Post } from "@/interfaces/content";

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
  let client;

  try {
    client = await mongoose.connect(process.env.MONGO_INSTANCE as string);

    // Get Post Content
    const query = Post.where({ slug: context.params.postId });
    const post = await query.findOne();
    const jsonPost = JSON.parse(JSON.stringify(post));

    if (!post) {
      return {
        props: {},
      };
    }

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
  } finally {
    if (client && client.connection) {
      await client.connection.close();
    }
  }
}
