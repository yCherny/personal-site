import { Fragment, useState } from "react";
import Head from "next/head";
import MasonryGrid, { DataType } from "@/components/layout/masonry-grid";
import FilterPanel from "@/components/filter/filter-panel";
import Header from "../../components/header/header";
import Content, { Post } from "@/interfaces/content";
import StickyNavBar from "@/components/layout/sticky-nav-bar";
import { dbConnect } from "@/lib/db-connect";

type Props = {
  allPosts: Content[];
  uniqueTags: string[];
};

function BlogPage({ allPosts, uniqueTags }: Props) {
  const [filteredContent, setFilteredContent] = useState<Content[]>(allPosts);
  const [filter, setFilter] = useState<string>("");

  function filterContent(type: string) {
    if (type === filter) {
      setFilter("");
    } else {
      const filteredContent = allPosts.filter((data) =>
        data.tags.includes(type)
      );
      setFilter(type);
      setFilteredContent(filteredContent);
    }
  }

  return (
    <Fragment>
      <Head>
        <title>Yegor Chernyshev | Blog</title>
        <meta
          name="description"
          content="Various blog posts by Yegor Chernyshev"
          key={"desc"}
        />
        <meta property="og:title" content="Yegor Chernyshev | Blog" />
        <meta
          property="og:description"
          content="Various blog posts by Yegor Chernyshev"
        />
        <meta property="og:url" content="https://yegor.codes/blog" />
      </Head>
      <div className="max-w-6xl mx-auto">
        <Header
          titlePrimary={"B"}
          titleSecondary={"log(n)"}
          subtitle={"the ramblings of a madman"}
        />
        <StickyNavBar>
          <FilterPanel
            onClick={filterContent}
            filterOptions={uniqueTags}
            path={"blog"}
          />
        </StickyNavBar>
        <MasonryGrid
          type={DataType.Post}
          data={filter === "" ? allPosts : filteredContent}
        />
      </div>
    </Fragment>
  );
}

export async function getStaticProps() {
  await dbConnect();

  try {
    const query = Post.where({ type: "blog", status: "published" }).sort({ createdAt: -1 });
    const posts = await query.find();

    const jsonPosts = JSON.parse(JSON.stringify(posts));
    const tags = posts.map((post) => post.tags).flat();
    const uniqueTags = Array.from(new Set(tags));

    return {
      props: {
        allPosts: jsonPosts,
        uniqueTags: uniqueTags,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      notFound: true,
    };
  }
}

export default BlogPage;
