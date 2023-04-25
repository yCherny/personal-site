import SectionContent from '@/interfaces/about';
import { Card, Subtitle, Title, Flex } from '@tremor/react';
import Link from 'next/link';

type Props = {
	section: SectionContent;
	path: string;
};

function AboutCard({ section, path }: Props) {
	return (
		<Link href={`/${path}/${section.title}`} className='drop-shadow-2xl'>
			<Card key={section.title}>
				<Flex flexDirection='col' alignItems='start'>
					<Subtitle>{section.page}</Subtitle>
					<Title className='font-bold'>{section.title}</Title>
				</Flex>
			</Card>
		</Link>
	);
}

export default AboutCard;
