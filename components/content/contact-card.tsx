import ContactContent from '@/interfaces/contact';
import { Card, Subtitle, Title, Flex, Text } from '@tremor/react';
import Link from 'next/link';

type Props = {
	contact: ContactContent;
	path: string;
};

function ContactCard({ contact, path }: Props) {
	return (
		<Link href={`/${path}/${contact.name}`} className='drop-shadow-2xl'>
			<Card key={contact.name}>
				<Flex flexDirection='col' alignItems='start'>
					<Subtitle>{contact.type}</Subtitle>
					<Title className='font-bold'>{contact.name}</Title>
					<Title className='font-bold'>{contact.contactInfo}</Title>
					<Text className='font-bold'>{contact.message}</Text>
				</Flex>
			</Card>
		</Link>
	);
}

export default ContactCard;
