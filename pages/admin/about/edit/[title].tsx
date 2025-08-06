import {getServerSession} from "next-auth";
import {authOptions} from "@/pages/api/auth/[...nextauth]";

import {Text, Button} from "@tremor/react";
import {useState, useEffect} from "react";
import CircularButton from "../../../../components/buttons/circular-button";
import {ArrowSmallLeftIcon, PlusCircleIcon} from "@heroicons/react/24/outline";
import Markdown from "@/components/sections/markdown";
import {useRouter} from "next/router";

// Forms
import {Formik, Field, Form, ErrorMessage, useField} from "formik";
import * as Yup from "yup";
import FormikRadioGroup from "@/components/content/formik-radio-group";

import type {GetServerSidePropsContext} from "next";
import type {Session} from "next-auth";
import SectionContent from "@/interfaces/about";

import mongoose from "mongoose";
import {Section} from "@/interfaces/about";

type Props = {
  content?: SectionContent;
  session: Session;
};

export default function EditPane({content = undefined, session}: Props) {
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  const [contentMarkdown, setContentMarkdown] = useState<string>(
    content?.content ?? ""
  );

  useEffect(() => {}, [contentMarkdown]);

  const initialValues = {
    type: content?.page ?? "about",
    title: content?.title ?? "",
    content: content?.content ?? "",
  };

  const uploadData = async (jsonData: string) => {
    setIsSubmitting(true);
    console.log(`Passed In Data: ${jsonData}`);

    try {
      let res = await fetch("http://localhost:3000/api/about", {
        method: "POST",
        body: jsonData,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      res = await res.json();
      setIsSubmitting(false);
      router.back();
    } catch (err) {
      console.log(`Error: ${err}`);
      setIsSubmitting(false);
    }
  };

  const deleteData = async (slug: string) => {
    setIsDeleting(true);
    console.log(`Delete: ${slug}`);
    const slugJSON = JSON.stringify(slug);

    try {
      let res = await fetch(`http://localhost:3000/api/about/${slug}`, {
        method: "DELETE",
        body: slugJSON,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      res = await res.json();
      setIsDeleting(false);
      router.back();
    } catch (err) {
      console.log(`Error: ${err}`);
      setIsDeleting(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 bg-gray-100 dark:bg-black p-10 rounded-lg">
      <CircularButton
        icon={<ArrowSmallLeftIcon />}
        onClick={() => router.back()}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Formik
          initialValues={initialValues}
          validationSchema={Yup.object({
            type: Yup.string().required("Required"),
            title: Yup.string().required("Required"),
            content: Yup.string().required("Required"),
          })}
          onSubmit={(values) => {
            uploadData(JSON.stringify(values));
          }}
        >
          <Form>
            <div className="flex flex-col gap-5">
              <Text className="text-2xl font-bold">Main Information</Text>

              <div className="flex flex-col w-full gap-5">
                <div className="w-full px-3 mb-6 md:mb-0">
                  <label
                    htmlFor="type"
                    className="block uppercase tracking-wide text-gray-700 dark:text-gray-300 text-xs font-bold mb-2"
                  >
                    Page
                  </label>
                  <div className="w-full">
                    <FormikRadioGroup
                      name="page"
                      label="Hello World"
                      options={[
                        {
                          label: "About",
                          value: "about",
                        },
                        {
                          label: "Portfolio",
                          value: "portfolio",
                        },
                      ]}
                    />
                    <div className="text-red-500 font-bold text-sm">
                      <ErrorMessage name="page" />
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
                    id="grid-first-name"
                    name="title"
                    type="text"
                    placeholder="Title"
                  />
                  <div className="text-red-500 font-bold text-sm">
                    <ErrorMessage name="title" />
                  </div>
                </div>
                <Text className="text-2xl font-bold">Content</Text>
                <div className="w-full px-3 mb-6 md:mb-0">
                  <label
                    htmlFor={"content"}
                    className="block uppercase tracking-wide text-gray-700 dark:text-gray-300 text-xs font-bold mb-2"
                  >
                    Section
                  </label>
                  <Field
                    as="textarea"
                    id="content"
                    rows={5}
                    className="appearance-none block w-full bg-gray-200 text-gray-700 dark:text-white dark:bg-gray-900 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:dark:bg-gray-700"
                    placeholder="Section content..."
                    name={"content"}
                    type="text"
                    onKeyUp={(e: any) => setContentMarkdown(e.target.value)}
                  />
                  <div className="text-red-500 font-bold text-sm">
                    <ErrorMessage name={"content"} />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col w-full gap-5">
              <div className="w-full px-3 mb-6 md:mb-0">
                <div className="text-red-500 font-bold text-sm">
                  <ErrorMessage name="content" />
                </div>
              </div>

              <div className="flex flex-ror gap-4">
                <Button
                  type="submit"
                  className="border-none"
                  loading={isSubmitting}
                  disabled={isSubmitting || isDeleting}
                >
                  Upload
                </Button>

                {content?.title && (
                  <Button
                    type="button"
                    className="bg-red-500 border-none"
                    loading={isDeleting}
                    disabled={isSubmitting || isDeleting}
                    onClick={() => deleteData(content.title)}
                  >
                    Delete
                  </Button>
                )}
              </div>
            </div>
          </Form>
        </Formik>

        <div className="h-full">
          <Text className="text-2xl font-bold">Markdown Preview</Text>
          <div className="mb-16">
            {contentMarkdown && <Markdown content={contentMarkdown} />}
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    let client = await mongoose.connect(process.env.MONGO_INSTANCE as string);

    const query = Section.where({title: context.query.title});
    const section = await query.findOne();
    const jsonSection = JSON.parse(JSON.stringify(section));

    client.connection.close();

    return {
      props: {
        content: jsonSection,
        // session: await getServerSession(
        // 	context.req,
        // 	context.res,
        // 	authOptions
        // ),
      },
    };
  } catch (err) {
    console.log(`Error: ${err}`);
  }
}
