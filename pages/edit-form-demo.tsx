import { Fragment, useState } from "react";
import Head from "next/head";
import { Text, Button } from "@tremor/react";
import { ArrowSmallLeftIcon } from "@heroicons/react/24/outline";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

// Mock content data
const mockContent = {
  type: "blog",
  slug: "test-draft-post",
  title: "Test Draft Post",
  excerpt: "This is a test post to demonstrate the draft functionality",
  tags: ["test", "draft", "demo"],
  content: "# This is a test draft post\n\nThis post demonstrates the new draft functionality.",
  status: "draft",
  authors: [
    {
      name: "Yegor Chernyshev",
      picture: "https://firebasestorage.googleapis.com/v0/b/yegor-codes.appspot.com/o/uploads%2Fme.jpg?alt=media&token=7d0cbba0-d197-405a-be8b-ad45f3bfb913",
      url: "",
    },
  ],
  coverImage: {
    url: "",
    copyrightLink: "",
    copyrightOwner: "",
  },
  color: "#FF6B6B",
  externalLink: "",
  githubLink: "",
};

function FormikRadioGroup({ name, options }: { name: string; options: any[] }) {
  return (
    <div className="flex space-x-4">
      {options.map((option) => (
        <label key={option.value} className="flex items-center">
          <Field type="radio" name={name} value={option.value} className="mr-2" />
          <span className="text-gray-700 dark:text-gray-300">{option.label}</span>
        </label>
      ))}
    </div>
  );
}

function EditFormDemo() {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [contentMarkdown, setContentMarkdown] = useState<string>(mockContent.content);
  const [lastAction, setLastAction] = useState<string>("");

  const initialValues = {
    type: mockContent.type,
    slug: mockContent.slug,
    title: mockContent.title,
    excerpt: mockContent.excerpt,
    tags: mockContent.tags,
    content: mockContent.content,
    status: mockContent.status,
    authors: mockContent.authors,
    coverImage: mockContent.coverImage,
    color: mockContent.color,
    externalLink: mockContent.externalLink,
    githubLink: mockContent.githubLink,
  };

  const saveAsDraft = async (values: any) => {
    setIsSubmitting(true);
    setLastAction("draft");
    values["slug"] = values.title.split(" ").join("-").toLowerCase();
    
    // Simulate API call
    setTimeout(() => {
      console.log("Saved as draft:", values);
      setIsSubmitting(false);
      alert("Content saved as draft!");
    }, 1500);
  };

  const publishContent = async (values: any) => {
    setIsSubmitting(true);
    setLastAction("publish");
    values["slug"] = values.title.split(" ").join("-").toLowerCase();
    
    // Simulate API call
    setTimeout(() => {
      console.log("Published content:", values);
      setIsSubmitting(false);
      alert("Content published!");
    }, 1500);
  };

  const deleteData = async () => {
    setIsDeleting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log("Deleted content");
      setIsDeleting(false);
      alert("Content deleted!");
    }, 1500);
  };

  return (
    <Fragment>
      <Head>
        <title>Edit Form Demo - Draft Feature</title>
        <meta name="description" content="Demo of the edit form with draft functionality" />
      </Head>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-100 dark:bg-[#2F2050] p-10 rounded-lg">
            <div className="flex items-center mb-6">
              <button
                className="flex items-center justify-center w-10 h-10 rounded-full bg-white dark:bg-gray-800 shadow-md mr-4"
                onClick={() => window.history.back()}
              >
                <ArrowSmallLeftIcon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              </button>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Edit Content - Draft Feature Demo
              </h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Formik
                initialValues={initialValues}
                validationSchema={Yup.object({
                  type: Yup.string().required("Required"),
                  title: Yup.string()
                    .max(40, "Must be 40 characters or less.")
                    .required("Required"),
                  excerpt: Yup.string()
                    .max(150, "Must be 150 characters or less.")
                    .required("Required"),
                  tags: Yup.array().required("Required"),
                  content: Yup.string().required("Required"),
                })}
                onSubmit={() => {
                  // This will be handled by individual buttons
                }}
              >
                {(formik) => (
                  <Form>
                    <div className="flex flex-col gap-5">
                      <Text className="text-2xl font-bold">Main Information</Text>
                      
                      <div className="flex flex-col w-full gap-5">
                        <div className="w-full px-3 mb-6 md:mb-0">
                          <label
                            htmlFor="type"
                            className="block uppercase tracking-wide text-gray-700 dark:text-gray-300 text-xs font-bold mb-2"
                          >
                            Type
                          </label>
                          <div className="w-full">
                            <FormikRadioGroup
                              name="type"
                              options={[
                                { label: "Blog", value: "blog" },
                                { label: "Portfolio", value: "portfolio" },
                              ]}
                            />
                            <div className="text-red-500 font-bold text-sm">
                              <ErrorMessage name="type" />
                            </div>
                          </div>
                        </div>

                        <div className="w-full px-3 mb-6 md:mb-0">
                          <label
                            htmlFor="title"
                            className="block uppercase tracking-wide text-gray-700 dark:text-gray-300 text-xs font-bold mb-2"
                          >
                            Title
                          </label>
                          <Field
                            className="appearance-none block w-full bg-gray-200 text-gray-700 dark:text-white dark:bg-gray-900 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:dark:bg-gray-700"
                            name="title"
                            type="text"
                            placeholder="Title"
                          />
                          <div className="text-red-500 font-bold text-sm">
                            <ErrorMessage name="title" />
                          </div>
                        </div>

                        <div className="w-full px-3 mb-6 md:mb-0">
                          <label
                            htmlFor="excerpt"
                            className="block uppercase tracking-wide text-gray-700 dark:text-gray-300 text-xs font-bold mb-2"
                          >
                            Excerpt
                          </label>
                          <Field
                            className="appearance-none block w-full bg-gray-200 text-gray-700 dark:text-white dark:bg-gray-900 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:dark:bg-gray-700"
                            type="text"
                            placeholder="Excerpt"
                            name="excerpt"
                          />
                          <div className="text-red-500 font-bold text-sm">
                            <ErrorMessage name="excerpt" />
                          </div>
                        </div>

                        <div className="w-full px-3 mb-6 md:mb-0">
                          <label
                            htmlFor="content"
                            className="block uppercase tracking-wide text-gray-700 dark:text-gray-300 text-xs font-bold mb-2"
                          >
                            Content (Markdown)
                          </label>
                          <Field
                            as="textarea"
                            rows={8}
                            className="appearance-none block w-full bg-gray-200 text-gray-700 dark:text-white dark:bg-gray-900 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:dark:bg-gray-700"
                            placeholder="Markdown content..."
                            name="content"
                            onKeyUp={(e: any) => setContentMarkdown(e.target.value)}
                          />
                          <div className="text-red-500 font-bold text-sm">
                            <ErrorMessage name="content" />
                          </div>
                        </div>
                      </div>

                      {/* Status Display */}
                      <div className="w-full px-3 mb-6">
                        <Text className="text-lg font-bold">Current Status</Text>
                        <div className="flex items-center gap-3 mt-2">
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-medium ${
                              mockContent.status === "published"
                                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                                : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                            }`}
                          >
                            {mockContent.status.toUpperCase()}
                          </span>
                          {lastAction && (
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                              Last action: {lastAction}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-row gap-4">
                        <Button
                          type="button"
                          className="border-none bg-gray-500"
                          loading={isSubmitting && lastAction === "draft"}
                          disabled={isSubmitting || isDeleting}
                          onClick={() => saveAsDraft(formik.values)}
                        >
                          Save as Draft
                        </Button>

                        <Button
                          type="button"
                          className="border-none"
                          loading={isSubmitting && lastAction === "publish"}
                          disabled={isSubmitting || isDeleting}
                          onClick={() => publishContent(formik.values)}
                        >
                          {mockContent.status === "draft" ? "Publish" : "Update"}
                        </Button>

                        <Button
                          type="button"
                          className="bg-red-500 border-none"
                          loading={isDeleting}
                          disabled={isSubmitting || isDeleting}
                          onClick={() => deleteData()}
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  </Form>
                )}
              </Formik>

              {/* Preview */}
              <div className="h-full">
                <Text className="text-2xl font-bold">Markdown Preview</Text>
                <div className="mt-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
                  <div className="prose dark:prose-invert max-w-none">
                    {contentMarkdown ? (
                      <pre className="whitespace-pre-wrap text-sm">{contentMarkdown}</pre>
                    ) : (
                      <p className="text-gray-500">Start typing to see preview...</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default EditFormDemo;