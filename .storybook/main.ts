import type { StorybookConfig } from '@storybook/nextjs';
const config: StorybookConfig = {
	stories: [
		'../components/**/*.mdx',
		'../components/**/*.stories.@(js|jsx|ts|tsx)',
	],
	addons: [
		'@storybook/addon-links',
		'@storybook/addon-essentials',
		'@storybook/addon-interactions',
		'@storybook/addon-controls',
	],
	framework: {
		name: '@storybook/nextjs',
		options: {},
	},
	docs: {
		autodocs: 'tag',
	},
	webpackFinal: async (config, options) => {
		config.module?.rules?.push({
			test: /\.scss$/,
			use: [
				'style-loader',
				'css-loader',
				'postcss-loader',
				'sass-loader',
			],
		});

		return config;
	},
};
export default config;
