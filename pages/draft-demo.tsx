import { Fragment, useState } from "react";
import Head from "next/head";
import { Text, Button } from "@tremor/react";
import { PlusCircleIcon } from "@heroicons/react/24/outline";

// Mock content with draft statuses
const mockContent = [
  {
    type: "blog",
    slug: "published-blog-post",
    title: "Published Blog Post",
    excerpt: "This is a published blog post",
    tags: ["published", "blog"],
    content: "# Published Blog Post Content",
    status: "published",
    authors: [],
    coverImage: { url: "", copyrightLink: "", copyrightOwner: "" },
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    type: "blog",
    slug: "draft-blog-post",
    title: "Draft Blog Post",
    excerpt: "This is a draft blog post",
    tags: ["draft", "blog"],
    content: "# Draft Blog Post Content",
    status: "draft",
    authors: [],
    coverImage: { url: "", copyrightLink: "", copyrightOwner: "" },
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    type: "portfolio",
    slug: "published-portfolio",
    title: "Published Portfolio Project",
    excerpt: "This is a published portfolio project",
    tags: ["published", "portfolio"],
    content: "# Published Portfolio Content",
    status: "published",
    authors: [],
    coverImage: { url: "", copyrightLink: "", copyrightOwner: "" },
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    type: "portfolio",
    slug: "draft-portfolio",
    title: "Draft Portfolio Project",
    excerpt: "This is a draft portfolio project",
    tags: ["draft", "portfolio"],
    content: "# Draft Portfolio Content",
    status: "draft",
    authors: [],
    coverImage: { url: "", copyrightLink: "", copyrightOwner: "" },
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

type Content = typeof mockContent[0];

function FilterOption({ text, selected, onPress }: { text: string; selected: boolean; onPress: any }) {
  return (
    <Button
      size="lg"
      onClick={() => {
        onPress(text);
      }}
      className={`${
        selected
          ? "bg-black dark:bg-[#8143FC] dark:text-white border-none font-black"
          : "bg-gray-400 dark:bg-[#2C206A] border-none font-bold"
      } py-2 px-3 rounded-full hover:font-bold hover:bg-black hover:text-white hover:dark:bg-white hover:dark:text-black`}
    >
      {text}
    </Button>
  );
}

function ContentCard({ item }: { item: Content }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md border border-gray-200 dark:border-gray-700">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">{item.title}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 capitalize">{item.type}</p>
        </div>
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            item.status === "published"
              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
              : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
          }`}
        >
          {item.status}
        </span>
      </div>
      <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{item.excerpt}</p>
      <div className="flex flex-wrap gap-2">
        {item.tags.map((tag, index) => (
          <span
            key={index}
            className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

function DraftDemo() {
  const [filteredContent, setFilteredContent] = useState<Content[]>(mockContent);
  const [filter, setFilter] = useState<string>("");
  const [selected, setSelected] = useState<number | null>(null);

  const filterOptions = ["blog", "portfolio", "blog-drafts", "portfolio-drafts", "all-drafts"];

  function getFilterLabel(option: string): string {
    switch (option) {
      case "blog":
        return "Blog Posts";
      case "portfolio":
        return "Portfolio";
      case "blog-drafts":
        return "Blog Drafts";
      case "portfolio-drafts":
        return "Portfolio Drafts";
      case "all-drafts":
        return "All Drafts";
      default:
        return option;
    }
  }

  function handleOptionSelect(option: string, index: number) {
    setSelected(selected === index ? null : index);
    filterContent(option);
  }

  function filterContent(filterType: string) {
    if (filterType === filter) {
      setFilter("");
      setFilteredContent(mockContent);
    } else {
      let filtered: Content[] = [];

      // Handle type-based filters (blog, portfolio)
      if (filterType === "blog" || filterType === "portfolio") {
        filtered = mockContent.filter((data) => data.type === filterType);
      }
      // Handle status-based filters (drafts)
      else if (filterType === "blog-drafts") {
        filtered = mockContent.filter((data) => data.type === "blog" && data.status === "draft");
      } else if (filterType === "portfolio-drafts") {
        filtered = mockContent.filter((data) => data.type === "portfolio" && data.status === "draft");
      } else if (filterType === "all-drafts") {
        filtered = mockContent.filter((data) => data.status === "draft");
      }

      setFilter(filterType);
      setFilteredContent(filtered);
    }
  }

  return (
    <Fragment>
      <Head>
        <title>Draft Feature Demo</title>
        <meta name="description" content="Demo of the new draft functionality" />
      </Head>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Draft Feature Demo
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              This demonstrates the new draft functionality for blog posts and portfolio projects.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Sidebar with filters */}
            <div className="space-y-6">
              <div>
                <Text className="text-xl font-bold dark:text-white mb-4">Filters</Text>
                <div className="space-y-3">
                  {filterOptions.map((option, index) => (
                    <FilterOption
                      key={index}
                      text={getFilterLabel(option)}
                      selected={selected === index}
                      onPress={() => handleOptionSelect(option, index)}
                    />
                  ))}
                </div>
              </div>

              <div>
                <Text className="text-xl font-bold dark:text-white mb-4">Actions</Text>
                <Button
                  size="lg"
                  icon={PlusCircleIcon}
                  className="bg-black border-none w-full"
                >
                  Create New
                </Button>
              </div>
            </div>

            {/* Content grid */}
            <div className="md:col-span-3">
              <div className="mb-4">
                <Text className="text-lg font-semibold text-gray-900 dark:text-white">
                  {filter === "" ? "All Content" : `Filtered: ${getFilterLabel(filter)}`} ({filteredContent.length} items)
                </Text>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredContent.map((item, index) => (
                  <ContentCard key={index} item={item} />
                ))}
              </div>
              {filteredContent.length === 0 && (
                <div className="text-center py-12">
                  <Text className="text-gray-500 dark:text-gray-400">No content found for this filter.</Text>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default DraftDemo;