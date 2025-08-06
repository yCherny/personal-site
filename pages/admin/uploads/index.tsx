import {getServerSession} from "next-auth";
import {authOptions} from "@/pages/api/auth/[...nextauth]";

import {Fragment, useState} from "react";

import SideBar from "@/components/navigation/side-bar";
import DataFlow from "@/components/layout/data-flow";
import Content from "@/interfaces/content";

import type {GetServerSidePropsContext} from "next";
import type {Session} from "next-auth";

import mongoose from "mongoose";
import {Post} from "@/interfaces/content";

import AdminWrapper from "@/components/layout/admin-wrapper";

type Props = {
  allContent: Content[];
  allContentFilters: string[];
  session: Session;
};

function Uploads({allContent, allContentFilters, session}: Props) {
  const [filteredContent, setFilteredContent] = useState<Content[]>(allContent);
  const [filter, setFilter] = useState<string>("");

  function filterContent(type: string) {
    if (type === filter) {
      setFilter("");
    } else {
      const filteredContent = allContent.filter((data) => data.type === type);
      setFilter(type);
      setFilteredContent(filteredContent);
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
  let client = await mongoose.connect(process.env.MONGO_INSTANCE as string);

  // Get Portfolio Content
  const projectQuery = Post.where({type: "portfolio"});
  const projects = await projectQuery.find();
  const jsonProjects = JSON.parse(JSON.stringify(projects));

  // Get Post Content
  const postQuery = Post.where({type: "blog"});
  const posts = await postQuery.find();
  const jsonPosts = JSON.parse(JSON.stringify(posts));

  client.connection.close();

  const allContent = jsonProjects.concat(jsonPosts);

  if (!projects && !posts) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      allContent: allContent,
      allContentFilters: ["blog", "portfolio"],
      // session: await getServerSession(
      // 	context.req,
      // 	context.res,
      // 	authOptions
      // ),
    },
  };
}

export default Uploads;
