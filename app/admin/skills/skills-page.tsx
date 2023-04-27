'use client';

import Head from 'next/head';
import { Fragment, useState } from 'react';

import Navbar from '@/components/navigation/nav-bar';
import SideBar from '@/components/navigation/side-bar';
import SkillContent from '@/interfaces/skill';

import type { Session } from 'next-auth';
import SkillCard from '@/components/content/skill-card';

type Props = {
	allSkills: SkillContent[];
	allSkillFilters: string[];
	session: Session | null;
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
			<div className='p-4 md:p-10 mx-auto max-w-7xl bg-white rounded-lg'>
				<Navbar user={'Yegor'} />
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
			</div>
		</Fragment>
	);
}

export default Skills;
