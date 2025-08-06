import ContentCard from '@/components/content/content-card';

import Content from '@/interfaces/content';
const data: Content = {
	createdAt: new Date(),
	updatedAt: new Date(),
	type: 'blog',
	slug: 'component-test',
	title: 'Hello World',
	excerpt: 'Cypress component test',
	tags: ['Test'],
	content: 'Hello world from a test!',
	authors: [{ name: 'Bot', url: '', picture: '' }],
	coverImage: {
		url: '',
		copyrightLink: '',
		copyrightOwner: '',
	},
};

describe('ContentCard', () => {
	it('should mount component', () => {
		cy.mount(<ContentCard data={data} path='blog' />);
	});

  it('renders post content', () => {
    cy.findAllByTestId()
  })
});
