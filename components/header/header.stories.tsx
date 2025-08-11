import type { Meta, StoryObj } from '@storybook/react';
import Header from './header';

const meta: Meta<typeof Header> = {
	title: 'Header',
	component: Header,
};

export default meta;
type Story = StoryObj<typeof Header>;

// Stories
export const Default: Story = {
	args: {
		titlePrimary: 'Page',
		titleSecondary: 'Name',
		subtitle: 'Subtitle',
		subheader: false,
	},
};
