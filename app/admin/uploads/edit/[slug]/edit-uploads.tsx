'use client';
import { Text, Button } from '@tremor/react';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Content from '@/interfaces/content';
import CircularButton from '../../../../../components/buttons/circular-button';
import {
	ArrowSmallLeftIcon,
	PlusCircleIcon,
} from '@heroicons/react/24/outline';
import Markdown from '@/components/sections/markdown';
import { useRouter } from 'next/navigation';

// Forms
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import FormikRadioGroup from '@/components/content/formik-radio-group';

import type { Session } from 'next-auth';

type Props = {
	content?: Content;
	session: Session | null;
};

export default function EditPane({ content = undefined, session }: Props) {
	const router = useRouter();

	const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
	const [isDeleting, setIsDeleting] = useState<boolean>(false);

	const [contentMarkdown, setContentMarkdown] = useState<string>(
		content?.content ?? ''
	);

	const [tagCount, setTagCount] = useState<number>(content?.tags.length ?? 1);

	const [contentColor, setContentColor] = useState<string>(
		content?.color ?? '#000000'
	);

	const [imageURL, setImageURL] = useState<string>(
		content?.coverImage.url ?? ''
	);

	useEffect(() => {
		console.log(`New Image: ${imageURL}`);
	}, [imageURL, contentMarkdown]);

	const initialValues = {
		type: content?.type ?? 'blog',
		slug: content?.slug ?? '',
		title: content?.title ?? '',
		excerpt: content?.excerpt ?? '',
		tags: content?.tags ?? [''],
		content: content?.content ?? '',
		authors: content?.authors ?? [
			{
				name: 'Yegor Chernyshev',
				picture:
					'https://www.dropbox.com/s/h3q3r022pfu3qru/me.jpg?dl=1',
				url: '',
			},
		],
		coverImage: {
			url: content?.coverImage.url ?? '',
			copyrightLink: content?.coverImage.copyrightLink ?? '',
			copyrightOwner: content?.coverImage.copyrightOwner ?? '',
		},

		color: content?.color ?? '#000000',
		externalLink: content?.externalLink ?? '',
		githubLink: content?.githubLink ?? '',
	};

	const uploadData = async (jsonData: string) => {
		setIsSubmitting(true);
		console.log(`Passed In Data: ${jsonData}`);

		try {
			await fetch('http://localhost:3000/api/blog', {
				method: 'POST',
				body: jsonData,
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
			});
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
			await fetch(`http://localhost:3000/api/blog/${slug}`, {
				method: 'DELETE',
				body: slugJSON,
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
			});
			setIsDeleting(false);
			router.back();
		} catch (err) {
			console.log(`Error: ${err}`);
			setIsDeleting(false);
		}
	};

	return (
		<div className='flex flex-col gap-4 bg-gray-100 dark:bg-black p-10 rounded-lg'>
			<CircularButton
				icon={<ArrowSmallLeftIcon />}
				onClick={() => router.back()}
			/>

			<div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
				<Formik
					initialValues={initialValues}
					validationSchema={Yup.object({
						type: Yup.string().required('Required'),
						slug: Yup.string(),
						title: Yup.string()
							.max(40, 'Must be 40 characters or less.')
							.required('Required'),
						excerpt: Yup.string()
							.max(150, 'Must be 150 characters or less.')
							.required('Required'),
						tags: Yup.array().required('Required'),
						content: Yup.string().required('Required'),
						authors: Yup.array().required('Required'),
						// coverImage: Yup.string().required('Required'),
						copyrightLink: Yup.string(),
						copyrightOwner: Yup.string(),
						color: Yup.string().max(
							7,
							'Must be 7 characters or less'
						),
						externalLink: Yup.string(),
						githubLink: Yup.string(),
					})}
					onSubmit={(values) => {
						values['slug'] = values.title
							.split(' ')
							.join('-')
							.toLowerCase();
						uploadData(JSON.stringify(values));
					}}
				>
					<Form>
						<div className='flex flex-col gap-5'>
							<Text className='text-2xl font-bold'>
								Main Information
							</Text>

							<div className='flex flex-col w-full gap-5'>
								<div className='w-full px-3 mb-6 md:mb-0'>
									<label
										htmlFor='type'
										className='block uppercase tracking-wide text-gray-700 dark:text-gray-300 text-xs font-bold mb-2'
									>
										Type
									</label>
									<div className='w-full'>
										<FormikRadioGroup
											name='type'
											label='Hello World'
											options={[
												{
													label: 'Blog',
													value: 'blog',
												},
												{
													label: 'Portfolio',
													value: 'portfolio',
												},
											]}
										/>
										<div className='text-red-500 font-bold text-sm'>
											<ErrorMessage name='type' />
										</div>
									</div>
								</div>
								<div className='w-full px-3 mb-6 md:mb-0'>
									<label
										htmlFor='title'
										className='block uppercase tracking-wide text-gray-700 dark:text-gray-300 text-xs font-bold mb-2'
									>
										Title
									</label>
									<Field
										className='appearance-none block w-full bg-gray-200 text-gray-700 dark:text-white dark:bg-gray-900 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:dark:bg-gray-700'
										id='grid-first-name'
										name='title'
										type='text'
										placeholder='Title'
									/>
									<div className='text-red-500 font-bold text-sm'>
										<ErrorMessage name='title' />
									</div>
								</div>
								<div className='w-full px-3 mb-6 md:mb-0'>
									<label
										htmlFor='excerpt'
										className='block uppercase tracking-wide text-gray-700 dark:text-gray-300 text-xs font-bold mb-2'
									>
										Excerpt
									</label>
									<Field
										className='appearance-none block w-full bg-gray-200 text-gray-700 dark:text-white dark:bg-gray-900 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:dark:bg-gray-700'
										id='grid-first-name'
										type='text'
										placeholder='Excerpt'
										name='excerpt'
									/>
									<div className='text-red-500 font-bold text-sm'>
										<ErrorMessage name='excerpt' />
									</div>
								</div>
							</div>
							<Text className='text-2xl font-bold'>
								Collaborators
							</Text>
							<div className='w-full flex flex-row gap-4 px-3 mb-6 md:mb-0 items-center'>
								{initialValues.authors
									? initialValues.authors.map(
											(author, index) => (
												<a
													href={author.url}
													key={index}
												>
													<div className='flex flex-row items-center gap-2 rounded-full pl-2 py-2 pr-4 bg-gray-200 dark:bg-gray-900'>
														<Image
															src={author.picture}
															alt={
																'Author Profile Image'
															}
															width={30}
															height={30}
															className='rounded-full aspect-square'
														/>
														<h4 className='font-bold dark:text-white text-sm md:text-md'>
															{author.name}
														</h4>
													</div>
												</a>
											)
									  )
									: null}

								<button
									type='button'
									className={`rounded-full w-9 h-9 p-1.5 backdrop-blur-md transition duration-500 text-black dark:text-white bg-black/10 text-black hover:bg-black hover:text-white dark:bg-black/10  dark:hover:bg-white dark:hover:text-black`}
									onClick={() => setTagCount(tagCount + 1)}
								>
									{<PlusCircleIcon />}
								</button>
							</div>
							<Text className='text-2xl font-bold'>Tags</Text>
							<div className='flex flex-col w-full gap-5'>
								<div className='w-full px-3 mb-6 md:mb-0'>
									<label
										htmlFor='color'
										className='block uppercase tracking-wide text-gray-700 dark:text-gray-300 text-xs font-bold mb-2'
									>
										Color
									</label>
									<Field
										className='appearance-none block w-full bg-gray-200 text-white dark:bg-gray-900 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:dark:bg-gray-700'
										id='grid-first-name'
										type='text'
										name='color'
										placeholder='Color'
										onKeyUp={(e: any) =>
											setContentColor(e.target.value)
										}
										style={{
											backgroundColor:
												contentColor ?? 'black',
										}}
									/>
									<div className='text-red-500 font-bold text-sm'>
										<ErrorMessage name='color' />
									</div>
								</div>

								<div className='w-full px-3 mb-6 md:mb-0'>
									{Array.from({ length: tagCount }).map(
										(_item, index) => (
											<div key={index}>
												<label
													htmlFor={`tags[${index}]`}
													className='block uppercase tracking-wide text-gray-700 dark:text-gray-300 text-xs font-bold mb-2'
												>
													Tag {index + 1}
												</label>
												<Field
													className='appearance-none block w-full bg-gray-200 text-gray-700 dark:text-white dark:bg-gray-900 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:dark:bg-gray-700'
													id='grid-first-name'
													type='text'
													name={`tags[${index}]`}
													placeholder='Tag'
												/>
											</div>
										)
									)}
									<div className='text-red-500 font-bold text-sm'>
										<ErrorMessage name='tags' />
									</div>
									<button
										type='button'
										className={`rounded-full w-9 h-9 p-1.5 backdrop-blur-md transition duration-500 text-black dark:text-white bg-black/10 text-black hover:bg-black hover:text-white dark:bg-black/10  dark:hover:bg-white dark:hover:text-black`}
										onClick={() =>
											setTagCount(tagCount + 1)
										}
									>
										{<PlusCircleIcon />}
									</button>
								</div>
							</div>
							<Text className='text-2xl font-bold'>
								External Links
							</Text>

							<div className='flex flex-col w-full gap-5'>
								<div className='w-full px-3 mb-6 md:mb-0'>
									<label
										htmlFor='externalLink'
										className='block uppercase tracking-wide text-gray-700 dark:text-gray-300 text-xs font-bold mb-2'
									>
										External Link
									</label>
									<Field
										className='appearance-none block w-full bg-gray-200 text-gray-700 dark:text-white dark:bg-gray-900 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:dark:bg-gray-700'
										id='grid-first-name'
										type='text'
										name='externalLink'
										placeholder='External Link'
									/>
									<div className='text-red-500 font-bold text-sm'>
										<ErrorMessage name='externalLink' />
									</div>
								</div>
								<div className='w-full px-3 mb-6 md:mb-0'>
									<label
										htmlFor='githubLink'
										className='block uppercase tracking-wide text-gray-700 dark:text-gray-300 text-xs font-bold mb-2'
									>
										Github Link
									</label>
									<Field
										className='appearance-none block w-full bg-gray-200 text-gray-700 dark:text-white dark:bg-gray-900 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:dark:bg-gray-700'
										id='grid-first-name'
										type='text'
										name='githubLink'
										placeholder='Github Link'
									/>
									<div className='text-red-500 font-bold text-sm'>
										<ErrorMessage name='githubLink' />
									</div>
								</div>
							</div>
							<Text className='text-2xl font-bold'>
								Cover Image
							</Text>
							{imageURL && (
								<Image
									alt='Image being uploaded'
									src={imageURL}
									height={250}
									width={500}
									className='w-full rounded-lg'
								/>
							)}
							<div className='flex flex-col w-full gap-5'>
								<div className='w-full px-3 mb-6 md:mb-0'>
									<label
										htmlFor='coverImage.url'
										className='block uppercase tracking-wide text-gray-700 dark:text-gray-300 text-xs font-bold mb-2'
									>
										Cover Image
									</label>
									<Field
										className='appearance-none block w-full bg-gray-200 text-gray-700 dark:text-white dark:bg-gray-900 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:dark:bg-gray-700'
										id='grid-first-name'
										type='text'
										name='coverImage.url'
										placeholder='Cover Image URL'
										onKeyUp={(e: any) =>
											setImageURL(e.target.value)
										}
									/>
									<div className='text-red-500 font-bold text-sm'>
										<ErrorMessage name='coverImage.url' />
									</div>
								</div>
								<div className='w-full px-3 mb-6 md:mb-0'>
									<label
										htmlFor='coverImage.copyrightOwner'
										className='block uppercase tracking-wide text-gray-700 dark:text-gray-300 text-xs font-bold mb-2'
									>
										Copyright Owner
									</label>
									<Field
										className='appearance-none block w-full bg-gray-200 text-gray-700 dark:text-white dark:bg-gray-900 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:dark:bg-gray-700'
										id='grid-first-name'
										type='text'
										name='coverImage.copyrightOwner'
										placeholder='Copyright Holder'
									/>
									<div className='text-red-500 font-bold text-sm'>
										<ErrorMessage name='coverImage.copyrightOwner' />
									</div>
								</div>
								<div className='w-full px-3 mb-6 md:mb-0'>
									<label
										htmlFor='coverImage.copyrightLink'
										className='block uppercase tracking-wide text-gray-700 dark:text-gray-300 text-xs font-bold mb-2'
									>
										Copyright URL
									</label>
									<Field
										className='appearance-none block w-full bg-gray-200 text-gray-700 dark:text-white dark:bg-gray-900 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:dark:bg-gray-700'
										id='grid-first-name'
										type='text'
										name='coverImage.copyrightLink'
										placeholder='Copyright URL'
										value={
											content?.coverImage.copyrightLink
										}
									/>
									<div className='text-red-500 font-bold text-sm'>
										<ErrorMessage name='coverImage.copyrightLink' />
									</div>
								</div>
							</div>
							<Text className='text-2xl font-bold'>Content</Text>
							<div className='flex flex-col w-full gap-5'>
								<div className='w-full px-3 mb-6 md:mb-0'>
									<Field
										as='textarea'
										id='content'
										rows={20}
										className='appearance-none block w-full bg-gray-200 text-gray-700 dark:text-white dark:bg-gray-900 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:dark:bg-gray-700'
										placeholder='Mardown content...'
										name='content'
										type='text'
										onKeyUp={(e: any) =>
											setContentMarkdown(e.target.value)
										}
									/>
									<div className='text-red-500 font-bold text-sm'>
										<ErrorMessage name='content' />
									</div>
								</div>

								<div className='flex flex-ror gap-4'>
									<Button
										type='submit'
										className='border-none'
										loading={isSubmitting}
										disabled={isSubmitting || isDeleting}
									>
										Upload
									</Button>

									{content?.slug && (
										<Button
											type='button'
											className='bg-red-500 border-none'
											loading={isDeleting}
											disabled={
												isSubmitting || isDeleting
											}
											onClick={() =>
												deleteData(content.slug)
											}
										>
											Delete
										</Button>
									)}
								</div>
							</div>
						</div>
					</Form>
				</Formik>

				<div className='h-full'>
					<Text className='text-2xl font-bold'>Markdown Preview</Text>
					<div className='mb-16'>
						{contentMarkdown && (
							<Markdown content={contentMarkdown} />
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
