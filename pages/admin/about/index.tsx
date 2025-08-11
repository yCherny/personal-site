import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

import { Fragment, useState } from "react";

import AdminWrapper from "@/components/layout/admin-wrapper";
import SideBar from "@/components/navigation/side-bar";
import SectionContent from "@/interfaces/about";
import AboutCard from "@/components/content/about-card";
import type { GetServerSidePropsContext } from "next";
import type { Session } from "next-auth";

import { Section } from "@/interfaces/about";
import { dbConnect } from "@/lib/db-connect";

type Props = {
  allSections: SectionContent[];
  allSectionFilters: string[];
  session: Session;
};

function About({ allSections, allSectionFilters, session }: Props) {
  const [filteredContent, setFilteredContent] =
    useState<SectionContent[]>(allSections);
  const [filter, setFilter] = useState<string>("");

  function filterContent(type: string) {
    if (type === filter) {
      setFilter("");
    } else {
      const filteredContent = allSections.filter((data) => data.page === type);
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
            filterOptions={allSectionFilters}
            newPath={"/admin/about/edit/new"}
          />
          <div className="col-span-2">
            <div className="flex flex-col gap-5">
              {(filter === "" ? allSections : filteredContent).map(
                (section: SectionContent) => (
                  <AboutCard
                    section={section}
                    path={"admin/about/edit"}
                    key={section.title}
                  />
                )
              )}
            </div>
          </div>
        </div>
      </AdminWrapper>
    </Fragment>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  await dbConnect();

  try {
    // Get Sections
    const sections = await Section.find();
    const jsonSections = JSON.parse(JSON.stringify(sections));
    const pageTypes = sections.map((section) => section.page).flat();
    const filterOptions = Array.from(new Set(pageTypes));
    const session = await getServerSession(
      context.req,
      context.res,
      authOptions
    );

    return {
      props: {
        allSections: jsonSections,
        allSectionFilters: filterOptions,
        // session: session,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      notFound: true,
    };
  }
}

export default About;
