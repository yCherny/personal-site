import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

import { Text, Button } from "@tremor/react";
import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import CircularButton from "../../../../components/buttons/circular-button";
import { ArrowSmallLeftIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import { dbConnect } from "@/lib/db-connect";

// Forms
import { Formik, Field, Form, ErrorMessage, useField } from "formik";
import * as Yup from "yup";
import FormikRadioGroup from "@/components/content/formik-radio-group";

import type { GetServerSidePropsContext } from "next";
import type { Session } from "next-auth";
import SkillContent from "@/interfaces/skill";

import mongoose from "mongoose";
import { Skill } from "@/interfaces/skill";

type Props = {
  skill?: SkillContent;
  session: Session;
};

export default function EditPane({ skill = undefined, session }: Props) {
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  const [imageURL, setImageURL] = useState<string>(skill?.icon ?? "");

  useEffect(() => {
    console.log(`New Image: ${imageURL}`);
  }, [imageURL]);

  const initialValues = {
    type: skill?.type ?? "language",
    name: skill?.name ?? "",
    value: skill?.value ?? 0,
    icon: skill?.icon ?? "",
  };

  const uploadData = async (jsonData: string) => {
    setIsSubmitting(true);
    console.log(`Passed In Data: ${jsonData}`);

    try {
      let res = await fetch("http://localhost:3000/api/skill", {
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

  const deleteData = async (name: string) => {
    setIsDeleting(true);
    console.log(`Delete: ${name}`);
    const nameJSON = JSON.stringify(name);

    try {
      let res = await fetch(`http://localhost:3000/api/skill/${name}`, {
        method: "DELETE",
        body: nameJSON,
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
            name: Yup.string()
              .max(40, "Must be 40 characters or less.")
              .required("Required"),
            value: Yup.number().max(1000).min(0).required("Required"),
            icon: Yup.string().required("Required"),
          })}
          onSubmit={(values) => {
            uploadData(JSON.stringify(values));
          }}
        >
          <Form>
            <div className="flex flex-col gap-5">
              <Text className="text-2xl font-bold">Skill Information</Text>

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
                      label="Skill Type Selection"
                      options={[
                        {
                          label: "Language",
                          value: "language",
                        },
                        {
                          label: "Framework",
                          value: "framework",
                        },
                        {
                          label: "Database",
                          value: "database",
                        },
                        {
                          label: "Tools",
                          value: "tool",
                        },
                      ]}
                    />
                    <div className="text-red-500 font-bold text-sm">
                      <ErrorMessage name="type" />
                    </div>
                  </div>
                </div>
                <div className="w-full px-3 mb-6 md:mb-0">
                  <label
                    htmlFor="name"
                    className="block uppercase tracking-wide text-gray-700 dark:text-gray-300 text-xs font-bold mb-2"
                  >
                    Language
                  </label>
                  <Field
                    className="appearance-none block w-full bg-gray-200 text-gray-700 dark:text-white dark:bg-gray-900 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:dark:bg-gray-700"
                    id="grid-first-name"
                    name="name"
                    type="text"
                    placeholder="Language"
                  />
                  <div className="text-red-500 font-bold text-sm">
                    <ErrorMessage name="name" />
                  </div>
                  <label
                    htmlFor="value"
                    className="block uppercase tracking-wide text-gray-700 dark:text-gray-300 text-xs font-bold mb-2"
                  >
                    Value (0-1000)
                  </label>
                  <Field
                    className="appearance-none block w-full bg-gray-200 text-gray-700 dark:text-white dark:bg-gray-900 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:dark:bg-gray-700"
                    id="grid-first-name"
                    name="value"
                    type="text"
                    placeholder="Value"
                  />
                  <div className="text-red-500 font-bold text-sm">
                    <ErrorMessage name="value" />
                  </div>
                  <label
                    htmlFor="icon"
                    className="block uppercase tracking-wide text-gray-700 dark:text-gray-300 text-xs font-bold mb-2"
                  >
                    Icon
                  </label>
                  <Field
                    className="appearance-none block w-full bg-gray-200 text-gray-700 dark:text-white dark:bg-gray-900 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:dark:bg-gray-700"
                    id="grid-first-name"
                    type="text"
                    name="icon"
                    placeholder="Icon Image URL"
                    onKeyUp={(e: any) => setImageURL(e.target.value)}
                  />
                  <div className="text-red-500 font-bold text-sm">
                    <ErrorMessage name="icon" />
                  </div>
                  {imageURL && (
                    <Image
                      alt="Image being uploaded"
                      src={imageURL}
                      height={250}
                      width={500}
                      className="w-full rounded-lg"
                    />
                  )}
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

                {skill?.name && (
                  <Button
                    type="button"
                    className="bg-red-500 border-none"
                    loading={isDeleting}
                    disabled={isSubmitting || isDeleting}
                    onClick={() => deleteData(skill.name)}
                  >
                    Delete
                  </Button>
                )}
              </div>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  await dbConnect();

  try {
    // Get Skills
    const query = Skill.where({ name: context.query.name });
    const skill = await query.findOne();
    const jsonSkill = JSON.parse(JSON.stringify(skill));

    return {
      props: {
        skill: jsonSkill,
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
