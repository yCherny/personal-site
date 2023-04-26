import ContactContent from '@/interfaces/contact';

export async function loadContactSections() {
	const res = await fetch('http://192.168.1.169:3000/api/contact');
	const data = await res.json();

	const contacts: ContactContent[] = data.contacts;
	const contactTypes = contacts.map((contact) => contact.type).flat();
	const filterOptions = Array.from(new Set(contactTypes));

	return { contacts, filterOptions };
}
