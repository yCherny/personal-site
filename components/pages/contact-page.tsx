'use client';

import { Fragment, useState } from 'react';
import Head from 'next/head';
import Header from '../header/header';
import { Text, Button, Callout, Flex } from '@tremor/react';
// Forms
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import FormikRadioGroup from '@/components/content/formik-radio-group';
import {
	ExclamationTriangleIcon,
	CheckCircleIcon,
	QuestionMarkCircleIcon,
} from '@heroicons/react/24/solid';

function ContactPage() {
	const [error, setError] = useState<boolean>(false);
	const [submitted, setSubmitted] = useState<boolean>(false);
	const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
	const initialValues = {
		type: '',
		name: '',
		contactInfo: '',
		message: '',
	};

	const uploadData = async (jsonData: string, resetForm: any) => {
		setIsSubmitting(true);
		console.log(`Passed In Data: ${jsonData}`);

		try {
			let res = await fetch('http://localhost:3000/api/contact', {
				method: 'POST',
				body: jsonData,
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
			});
			res = await res.json();
			setIsSubmitting(false);
			setSubmitted(true);
			resetForm({
				values: { type: '', name: '', contactInfo: '', message: '' },
			});
		} catch (err) {
			console.log(`Error: ${err}`);
			setIsSubmitting(false);
			setError(true);
		}
	};

	return (
		<Fragment>
			<Head>
				<title>Yegor Chernyshev | Portfolio</title>
				<meta name='description' content='Contact Yegor Chernyshev' />
			</Head>
			<div className='max-w-7xl mx-auto min-h-screen mb-20'>
				<Header
					titlePrimary={'Cont'}
					titleSecondary={'act'}
					subtitle={'ground control to major Tom'}
				/>
				{(submitted || error) && (
					<Callout
						className='h-auto mt-4'
						title={
							submitted
								? 'Successfully Submitted!'
								: error
								? 'Oh no, please try again.'
								: 'Unknown Error'
						}
						icon={
							submitted
								? ExclamationTriangleIcon
								: error
								? CheckCircleIcon
								: QuestionMarkCircleIcon
						}
						color={submitted ? 'green' : error ? 'rose' : 'yellow'}
					>
						<Flex>
							{submitted
								? 'I will read this as soon as possible and get back to you.'
								: 'Please try resubmitting the form.'}
							<button
								className='rounded-full bg-black px-3 py-2 text-white font-bold'
								onClick={() => {
									setSubmitted(false);
									setError(false);
								}}
							>
								Dismiss
							</button>
						</Flex>
					</Callout>
				)}

				<div className='grid grid-cols-1 md:grid-cols-2'>
					<Formik
						initialValues={initialValues}
						validationSchema={Yup.object({
							type: Yup.string().required('Required'),
							name: Yup.string().optional(),
							contactInfo: Yup.string().optional(),
							message: Yup.string().required('Required'),
						})}
						onSubmit={(values, { resetForm }) => {
							uploadData(JSON.stringify(values), resetForm);
						}}
					>
						<Form>
							<div className='flex flex-col gap-5'>
								<div className='flex flex-col w-full gap-5 p-5 rounded-md drop-shadow-md bg-gray-200 dark:bg-[#2F2050]'>
									<div className='flex flex-col gap-1 border border-gray-400 dark:border-[#413D57] p-3 rounded-md'>
										<label
											htmlFor='type'
											className='block uppercase tracking-wide text-gray-700 dark:text-gray-300 text-md font-bold mb-2'
										>
											I want to talk to you about
											<span className='text-pink-400'>
												*
											</span>
										</label>
										<FormikRadioGroup
											name='type'
											label='Hello World'
											options={[
												{
													label: 'Hiring You',
													value: 'hire',
												},
												{
													label: 'Site Feedback',
													value: 'feedback',
												},
												{
													label: 'Just Chat',
													value: 'chat',
												},
												{
													label: 'Something Else',
													value: 'other',
												},
											]}
										/>
										<div className='text-red-500 font-bold text-sm'>
											<ErrorMessage name='type' />
										</div>
									</div>
									<div className='flex flex-col gap-1 border border-gray-400 dark:border-[#413D57] p-3 rounded-md'>
										<label
											htmlFor='name'
											className='block uppercase tracking-wide text-gray-700 dark:text-gray-300 text-md font-bold mb-2'
										>
											You can refer to me as
										</label>
										<Field
											className='appearance-none block w-full bg-gray-200 text-gray-700 dark:text-white dark:bg-gray-900 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:dark:bg-gray-700'
											id='grid-first-name'
											name='name'
											type='text'
											placeholder='Sir Lancelot'
										/>
										<div className='text-red-500 font-bold text-sm'>
											<ErrorMessage name='name' />
										</div>
									</div>
									<div className='flex flex-col gap-1 border border-gray-400 dark:border-[#413D57] p-3 rounded-md'>
										<label
											htmlFor='contactInfo'
											className='block uppercase tracking-wide text-gray-700 dark:text-gray-300 text-md font-bold mb-2'
										>
											You can reach me back at
										</label>
										<label className='block uppercase tracking-wide text-gray-700 dark:text-gray-300 text-xs font-bold mb-2'>
											You can provide a phone number,
											email address, social media handle,
											pigeonmail address, etc. Honestly
											any method you prefer, simply enter
											it below.
										</label>
										<Field
											className='appearance-none block w-full bg-gray-200 text-gray-700 dark:text-white dark:bg-gray-900 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:dark:bg-gray-700'
											id='grid-first-name'
											name='contactInfo'
											type='text'
											placeholder='+1 (000) 000-0000  hello@myshop.com'
										/>
										<div className='text-red-500 font-bold text-sm'>
											<ErrorMessage name='contactInfo' />
										</div>
									</div>
									<div className='flex flex-col gap-1 border border-gray-400 dark:border-[#413D57] p-3 rounded-md'>
										<label
											htmlFor={'message'}
											className='block uppercase tracking-wide text-gray-700 dark:text-gray-300 text-md font-bold mb-2'
										>
											Message
											<span className='text-pink-400'>
												*
											</span>
										</label>
										<Field
											as='textarea'
											id='message'
											rows={5}
											className='appearance-none block w-full bg-gray-100 text-gray-700 dark:text-white dark:bg-gray-900 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:dark:bg-gray-700'
											placeholder='Section content...'
											name={'message'}
											type='text'
										/>
										<div className='text-red-500 font-bold text-sm'>
											<ErrorMessage name={'message'} />
										</div>
									</div>
									<div className='flex flex-ror gap-4'>
										<Button
											type='submit'
											className='border-none bg-black text-white dark:bg-white dark:text-black hover:bg-black hover:dark:bg-white hover:scale-105'
											loading={isSubmitting}
											disabled={isSubmitting}
										>
											Reach Out
										</Button>
									</div>
								</div>
							</div>
						</Form>
					</Formik>
				</div>
			</div>
		</Fragment>
	);
}

export default ContactPage;
