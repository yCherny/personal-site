import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

import Head from 'next/head';
import { Fragment, useEffect, useState } from 'react';

import Navbar from '@/components/navigation/nav-bar';
import SideBar from '@/components/navigation/side-bar';
import ContactCard from '@/components/content/contact-card';
import type { GetServerSidePropsContext } from 'next';
import type { Session } from 'next-auth';
import ContactContent from '@/interfaces/contact';

type Props = {
	session: Session;
};

function About({ session }: Props) {
	const [allContacts, setAllContacts] = useState<ContactContent[] | null>();
	const [filteredContent, setFilteredContent] = useState<
		ContactContent[] | null
	>();
	const [allContactFilters, setAllContactFilters] = useState<
		string[] | null
	>();
	const [loading, setLoading] = useState(true);
	async function getContactData() {
		const res = await fetch('http://192.168.1.169:3000/api/contact');
		const data = await res.json();

		const contacts: ContactContent[] = data.contacts;
		const contactTypes = contacts.map((contact) => contact.type).flat();
		const filterOptions = Array.from(new Set(contactTypes));

		setAllContacts(contacts);
		setFilteredContent(contacts);
		setAllContactFilters(filterOptions);
		setLoading(false);
	}

	useEffect(() => {
		getContactData();
	}, []);

	const [filter, setFilter] = useState<string>('');

	function filterContent(type: string) {
		if (type === filter) {
			setFilter('');
		} else {
			const filteredContent = allContacts?.filter(
				(data) => data.type === type
			);
			setFilter(type);
			setFilteredContent(filteredContent);
		}
	}

	if (loading) {
		return <h1>Loading...</h1>;
	}

	return (
		<Fragment>
			<Head>
				<title>Yegor Chernyshev | Skills</title>
				<meta name='description' content='Skills by Yegor Chernyshev' />
			</Head>
			<div className='p-4 md:p-10 mx-auto max-w-7xl bg-white rounded-lg'>
				<Navbar user={'Yegor'} />
				<div className='grid grid-cols-1 md:grid-cols-3 md:gap-10 mt-5'>
					<SideBar
						onClick={filterContent}
						filterOptions={allContactFilters!}
						newPath={'/dashboard'}
					/>
					<div className='col-span-2'>
						<div className='flex flex-col gap-5'>
							{filteredContent
								? filteredContent.map(
										(contact: ContactContent) => (
											<ContactCard
												contact={contact}
												path={'admin/contact/edit'}
												key={contact.name}
											/>
										)
								  )
								: null}
						</div>
					</div>
				</div>
			</div>
		</Fragment>
	);
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
	return {
		props: {
			session: await getServerSession(
				context.req,
				context.res,
				authOptions
			),
		},
	};
}

export default About;
