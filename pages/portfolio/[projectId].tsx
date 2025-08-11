import { useRouter } from "next/router";
import ErrorPage from "next/error";
import Content, { Post } from "@/interfaces/content";
import DetailContent from "@/components/content/detail-content";
import { dbConnect } from "@/lib/db-connect";

type Props = {
  project: Content;
};

export default function ProjectDetail({ project }: Props) {
  const router = useRouter();
  if (!router.isFallback && !project?.slug) {
    return <ErrorPage statusCode={404} />;
  }

  return <DetailContent data={project} type={"project"} />;
}

type Params = {
  params: {
    projectId: string;
  };
};

export async function getServerSideProps(context: Params) {
  await dbConnect();

  try {
    // Get Portfolio Content
    const query = Post.where({ slug: context.params.projectId });
    const project = await query.findOne();
    const jsonProject = JSON.parse(JSON.stringify(project));

    return {
      props: {
        project: jsonProject,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      notFound: true,
    };
  }
}
