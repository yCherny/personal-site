import { useState } from 'react';
import { EyeIcon } from '@heroicons/react/24/outline';
import VotingButton from '@/components/buttons/voting-button';

function FeedbackPanel() {
	function handleOnClick() {}

	return (
		<div className='flex flex-row items-center justify-between gap-4'>
			<div className='flex items-center dark:text-white'>
				<div className='w-10 p-2'>
					<EyeIcon />
				</div>
				<h3 className='font-bold'>1.2k</h3>
			</div>
			<div className='drop-shadow-lg rounded-full flex flex-row gap-3 backdrop-blur-md bg-gray-400/30 dark:backdrop-blur-md dark:bg-white/20'>
				<VotingButton onClick={handleOnClick} upvote />
				<VotingButton onClick={handleOnClick} />
			</div>
		</div>
	);
}

export default FeedbackPanel;
