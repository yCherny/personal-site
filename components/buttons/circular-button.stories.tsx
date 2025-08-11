import type { Meta, StoryObj } from '@storybook/react';
import CircularButton from './circular-button';

const meta: Meta<typeof CircularButton> = {
	title: 'Circular Button',
	component: CircularButton,
};

export default meta;
type Story = StoryObj<typeof CircularButton>;

export const Default: Story = {
	args: {
		selected: false,
		color: '#FFF',
	},
};
