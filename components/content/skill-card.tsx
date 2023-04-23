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
			<Card key={skill.name}>
				<Flex>
					<Image
						src={skill.icon}
						height={40}
						width={40}
						alt={'Skill Icon'}
						className='mr-4'
					/>
					<Flex flexDirection='col' alignItems='start'>
						<Title className='font-bold'>{skill.name}</Title>
						<Subtitle>{skill.type}</Subtitle>
					</Flex>
					<Title className='font-bold'>{skill.value}</Title>
				</Flex>
			</Card>
		</Link>
	);
}

export default SkillCard;
