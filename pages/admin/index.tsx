import {getServerSession} from "next-auth";
import {authOptions} from "../api/auth/[...nextauth]";

import type {GetServerSidePropsContext} from "next";
import {useSession} from "next-auth/react";

import {Fragment, useEffect, useState} from "react";
import {Card, Metric, Text, Flex, Title} from "@tremor/react";
import AdminWrapper from "@/components/layout/admin-wrapper";
import Content from "@/interfaces/content";

import mongoose from "mongoose";
import {Post} from "@/interfaces/content";
import {Skill} from "@/interfaces/skill";
import {Section} from "@/interfaces/about";
import SectionContent from "@/interfaces/about";
import SkillContent from "@/interfaces/skill";
import ContactContent from "@/interfaces/contact";

type Props = {
  allContent: Content[];
  allSections: SectionContent[];
  allSkills: SkillContent[];
};

export default function Dashboard({allContent, allSections, allSkills}: Props) {
  const [blogCount, setBlogCount] = useState<number>(0);
  const [projectCount, setProjectCount] = useState<number>(0);
  const [viewCount, setViewCount] = useState<number>(0);
  const [upvoteCount, setUpvoteCount] = useState<number>(0);
  const [downvoteCount, setDownvoteCount] = useState<number>(0);
  const [allContacts, setAllContacts] = useState<ContactContent[]>();

  async function getContactData() {
    const res = await fetch("http://localhost:3000/api/contact");
    const data = await res.json();
    const contacts: ContactContent[] = data.contacts;
    setAllContacts(contacts);
  }

  useEffect(() => {
    let blogCount = 0;
    let projectCount = 0;
    let upvoteCount = 0;
    let downvoteCount = 0;
    let viewCount = 0;

    for (let post of allContent) {
      if (post.type === "blog") {
        blogCount += 1;
      } else {
        projectCount += 1;
      }

      upvoteCount += post.upvotes?.length ?? 0;
      downvoteCount += post.downvotes?.length ?? 0;
      viewCount += post.views?.length ?? 0;
    }

    setBlogCount(blogCount);
    setProjectCount(projectCount);
    setUpvoteCount(upvoteCount);
    setDownvoteCount(downvoteCount);
    setViewCount(viewCount);
    getContactData();
  }, []);

  return (
    <Fragment>
      <AdminWrapper>
        <div className="flex flex-col gap-5 mt-5">
          <Title className="font-black text-4xl dark:text-white">
            Dashboard
          </Title>
          <div className="flex flex-col gap-5">
            <div className="flex flex-col border border-gray-400 dark:border-[#413D57] rounded-lg p-5 gap-3">
              <Title className="font-black dark:text-white">Content</Title>
              <div className="flex flex-row gap-5">
                <Card>
                  <Flex alignItems="start">
                    <Text>Blog Posts</Text>
                  </Flex>
                  <Flex
                    className="space-x-3 truncate"
                    justifyContent="start"
                    alignItems="baseline"
                  >
                    <Metric>{blogCount}</Metric>
                  </Flex>
                </Card>
                <Card>
                  <Flex alignItems="start">
                    <Text>Projects</Text>
                  </Flex>
                  <Flex
                    className="space-x-3 truncate"
                    justifyContent="start"
                    alignItems="baseline"
                  >
                    <Metric>{projectCount}</Metric>
                  </Flex>
                </Card>
              </div>
            </div>

            <div className="flex flex-col border border-gray-400 dark:border-[#413D57] rounded-lg p-5 gap-3">
              <Title className="font-black dark:text-white">Metrics</Title>
              <div className="flex flex-row gap-5">
                <Card decoration="top" decorationColor="gray">
                  <Flex alignItems="start">
                    <Text>Views</Text>
                  </Flex>
                  <Flex
                    className="space-x-3 truncate"
                    justifyContent="start"
                    alignItems="baseline"
                  >
                    <Metric>{viewCount}</Metric>
                  </Flex>
                </Card>
                <Card decoration="top" decorationColor="green">
                  <Flex alignItems="start">
                    <Text>Upvotes</Text>
                  </Flex>
                  <Flex
                    className="space-x-3 truncate"
                    justifyContent="start"
                    alignItems="baseline"
                  >
                    <Metric>{upvoteCount}</Metric>
                  </Flex>
                </Card>
                <Card decoration="top" decorationColor="red">
                  <Flex alignItems="start">
                    <Text>Downvotes</Text>
                  </Flex>
                  <Flex
                    className="space-x-3 truncate"
                    justifyContent="start"
                    alignItems="baseline"
                  >
                    <Metric>{downvoteCount}</Metric>
                  </Flex>
                </Card>
              </div>
            </div>

            <div className="flex flex-col border border-gray-400 dark:border-[#413D57] rounded-lg p-5 gap-3">
              <Title className="font-black dark:text-white">About</Title>
              <div className="flex flex-row gap-5">
                <Card>
                  <Flex alignItems="start">
                    <Text>Sections</Text>
                  </Flex>
                  <Flex
                    className="space-x-3 truncate"
                    justifyContent="start"
                    alignItems="baseline"
                  >
                    <Metric>{allSections.length}</Metric>
                  </Flex>
                </Card>
                <Card>
                  <Flex alignItems="start">
                    <Text>Skills</Text>
                  </Flex>
                  <Flex
                    className="space-x-3 truncate"
                    justifyContent="start"
                    alignItems="baseline"
                  >
                    <Metric>{allSkills.length}</Metric>
                  </Flex>
                </Card>
              </div>
            </div>

            <div className="flex flex-col border border-gray-400 dark:border-[#413D57] rounded-lg p-5 gap-3">
              <Title className="font-black dark:text-white">Contact</Title>
              <div className="flex flex-row gap-5">
                <Card>
                  <Flex alignItems="start">
                    <Text>Inquiries</Text>
                  </Flex>
                  <Flex
                    className="space-x-3 truncate"
                    justifyContent="start"
                    alignItems="baseline"
                  >
                    <Metric>{allContacts?.length}</Metric>
                  </Flex>
                </Card>
              </div>
            </div>
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

  // Get Skills
  const skills = await Skill.find();
  const jsonSkills = JSON.parse(JSON.stringify(skills));

  // Get Sections
  const sections = await Section.find();
  const jsonSections = JSON.parse(JSON.stringify(sections));

  client.connection.close();

  const allContent = jsonProjects.concat(jsonPosts);
  const session = await getServerSession(context.req, context.res, authOptions);

  // console.log(`Session: ${session?.user?.image}`);

  return {
    props: {
      allContent: allContent,
      allSections: jsonSections,
      allSkills: jsonSkills,
    },
  };
}
