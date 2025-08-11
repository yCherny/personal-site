import type { Meta, StoryObj } from '@storybook/react';
import AboutCard from './about-card';

const meta: Meta<typeof AboutCard> = {
	title: 'About Card',
	component: AboutCard,
};

export default meta;
type Story = StoryObj<typeof AboutCard>;

export const Default: Story = {
	args: {
		section: {
			page: 'portfolio',
			title: 'Hello',
			content: 'A card explaining something about me',
		},
		path: 'blog',
	},
};
