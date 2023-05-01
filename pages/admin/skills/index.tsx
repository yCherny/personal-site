import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

import Head from 'next/head';
import { Fragment, useState } from 'react';

import AdminWrapper from '@/components/layout/admin-wrapper';
import SideBar from '@/components/navigation/side-bar';
import SkillContent from '@/interfaces/skill';
import SkillCard from '@/components/content/skill-card';

import { Skill } from '@/interfaces/skill';
import mongoose from 'mongoose';

import type { GetServerSidePropsContext } from 'next';
import type { Session } from 'next-auth';

type Props = {
	allSkills: SkillContent[];
	allSkillFilters: string[];
	session: Session;
};

function Skills({ allSkills, allSkillFilters, session }: Props) {
	const [filteredContent, setFilteredContent] =
		useState<SkillContent[]>(allSkills);
	const [filter, setFilter] = useState<string>('');

	function filterContent(type: string) {
		if (type === filter) {
			setFilter('');
		} else {
			const filteredContent = allSkills.filter(
				(data) => data.type === type
			);
			setFilter(type);
			setFilteredContent(filteredContent);
		}
	}

	return (
		<Fragment>
			<Head>
				<title>Yegor Chernyshev | Skills</title>
				<meta name='description' content='Skills by Yegor Chernyshev' />
			</Head>
			<AdminWrapper>
				<div className='grid grid-cols-1 md:grid-cols-3 md:gap-10 mt-5'>
					<SideBar
						onClick={filterContent}
						filterOptions={allSkillFilters}
						newPath={'/admin/skills/edit/new'}
					/>
					<div className='col-span-2'>
						<div className='flex flex-col gap-5'>
							{(filter === '' ? allSkills : filteredContent).map(
								(skill: SkillContent) => (
									<SkillCard
										skill={skill}
										path={'admin/skills/edit'}
										key={skill.name}
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
	let client = await mongoose.connect(process.env.MONGO_INSTANCE as string);

	// Get Skills
	const skills = await Skill.find();
	const jsonSkills = JSON.parse(JSON.stringify(skills));
	const skillTypes = skills.map((skill) => skill.type).flat();
	const skillFilters = Array.from(new Set(skillTypes));

	client.connection.close();

	return {
		props: {
			allSkills: jsonSkills,
			allSkillFilters: skillFilters,
			session: await getServerSession(
				context.req,
				context.res,
				authOptions
			),
		},
	};
}

export default Skills;
