import SkillContent from '@/interfaces/skill';
import { Card, Subtitle, Title, Flex } from '@tremor/react';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
	skill: SkillContent;
	path: string;
};

function SkillCard({ skill, path }: Props) {
	return (
		<Link href={`/${path}/${skill.name}`} className='drop-shadow-2xl'>
			<Card key={skill.name} className='dark:bg-[#A59DB9]'>
				<Flex>
					<Image
						src={skill.icon}
						height={40}
						width={40}
						alt={'Skill Icon'}
						className='mr-4'
					/>
					<Flex flexDirection='col' alignItems='start'>
						<Title className='font-bold dark:text-white'>
							{skill.name}
						</Title>
						<Subtitle className='dark:text-slate-300'>{skill.type}</Subtitle>
					</Flex>
					<Title className='font-bold dark:text-white'>
						{skill.value}
					</Title>
				</Flex>
			</Card>
		</Link>
	);
}

export default SkillCard;
