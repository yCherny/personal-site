import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

import { Fragment, useState } from "react";

import SideBar from "@/components/navigation/side-bar";
import DataFlow from "@/components/layout/data-flow";
import Content from "@/interfaces/content";

import type { GetServerSidePropsContext } from "next";
import type { Session } from "next-auth";

import { dbConnect } from "@/lib/db-connect";
import { Post } from "@/interfaces/content";

import AdminWrapper from "@/components/layout/admin-wrapper";

type Props = {
  allContent: Content[];
  allContentFilters: string[];
  session: Session;
};

function Uploads({ allContent, allContentFilters, session }: Props) {
  const [filteredContent, setFilteredContent] = useState<Content[]>(allContent);
  const [filter, setFilter] = useState<string>("");

  function filterContent(filterType: string) {
    if (filterType === filter) {
      setFilter("");
      setFilteredContent(allContent);
    } else {
      let filtered: Content[] = [];
      
      // Handle type-based filters (blog, portfolio)
      if (filterType === "blog" || filterType === "portfolio") {
        filtered = allContent.filter((data) => data.type === filterType);
      }
      // Handle status-based filters (drafts)
      else if (filterType === "blog-drafts") {
        filtered = allContent.filter((data) => data.type === "blog" && data.status === "draft");
      }
      else if (filterType === "portfolio-drafts") {
        filtered = allContent.filter((data) => data.type === "portfolio" && data.status === "draft");
      }
      else if (filterType === "all-drafts") {
        filtered = allContent.filter((data) => data.status === "draft");
      }
      
      setFilter(filterType);
      setFilteredContent(filtered);
    }
  }

  return (
    <Fragment>
      <AdminWrapper>
        <div className="grid grid-cols-1 md:grid-cols-3 md:gap-10 mt-5">
          <SideBar
            onClick={filterContent}
            filterOptions={allContentFilters}
            newPath={"/admin/uploads/edit/new"}
          />
          <div className="col-span-2">
            <DataFlow content={filter === "" ? allContent : filteredContent} />
          </div>
        </div>
      </AdminWrapper>
    </Fragment>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  await dbConnect();

  try {
    // Get Portfolio Content
    const projectQuery = Post.where({ type: "portfolio" });
    const projects = await projectQuery.find();
    const jsonProjects = JSON.parse(JSON.stringify(projects));

    // Get Post Content
    const postQuery = Post.where({ type: "blog" });
    const posts = await postQuery.find();
    const jsonPosts = JSON.parse(JSON.stringify(posts));

    const allContent = jsonProjects.concat(jsonPosts);

    return {
      props: {
        allContent: allContent,
        allContentFilters: ["blog", "portfolio", "blog-drafts", "portfolio-drafts", "all-drafts"],
        // session: await getServerSession(
        // 	context.req,
        // 	context.res,
        // 	authOptions
        // ),
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      notFound: true,
    };
  }
}

export default Uploads;
