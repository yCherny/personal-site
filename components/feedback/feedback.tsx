import { useState } from 'react';
import { EyeIcon } from '@heroicons/react/24/outline';
import VotingButton from '@/components/buttons/voting-button';
import { updateVoteCount } from '@/lib/cookie-helpers';

type Props = {
	views: number;
	type?: string;
	slug?: string;
};

function FeedbackPanel({ views, type, slug }: Props) {
	const handleOnClick = async (upvote: boolean) => {
		console.log(`Adding ${upvote ? 'upvote' : 'downvote'}`);
		if (type && slug) {
			updateVoteCount(upvote, type, slug);
		}
	};

	return (
		<div className='flex flex-row items-center justify-between gap-4'>
			<div className='flex items-center dark:text-white'>
				<div className='w-10 p-2'>
					<EyeIcon />
				</div>
				<h3 className='font-bold'>{views}</h3>
			</div>
			<div className='drop-shadow-lg rounded-full flex flex-row gap-3 backdrop-blur-md bg-gray-400/30 dark:backdrop-blur-md dark:bg-white/20'>
				<VotingButton onClick={handleOnClick} upvote />
				<VotingButton onClick={handleOnClick} />
			</div>
		</div>
	);
}

export default FeedbackPanel;
