import ContactContent from '@/interfaces/contact';

export async function loadContactSections() {
	const res = await fetch(process.env.API_URL + '/api/contact');
	const data = await res.json();

	const contacts: ContactContent[] = data.contacts;
	const contactTypes = contacts.map((contact) => contact.type).flat();
	const filterOptions = Array.from(new Set(contactTypes));

	return { contacts, filterOptions };
}
