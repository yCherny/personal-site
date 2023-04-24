import { useState } from 'react';
import {
	HandThumbUpIcon as UpvoteOutline,
	HandThumbDownIcon as DownvoteOutline,
} from '@heroicons/react/24/outline';

import {
	HandThumbUpIcon as UpvoteSolid,
	HandThumbDownIcon as DownvoteSolid,
} from '@heroicons/react/24/solid';

interface ButtonProps {
	onClick: any;
	selected?: boolean;
	upvote?: boolean;
}

function VotingButton({
	onClick,
	selected = false,
	upvote = false,
}: ButtonProps) {
	const [hovered, setHovered] = useState(false);

	function buttonClicked() {
		onClick(upvote);
	}

	const upvoteButton = (
		<div className='text-emerald-400'>
			{hovered || selected ? <UpvoteSolid /> : <UpvoteOutline />}
		</div>
	);

	const downvoteButton = (
		<div className='text-pink-500'>
			{hovered || selected ? <DownvoteSolid /> : <DownvoteOutline />}
		</div>
	);

	return (
		<button
			className={`${
				selected
					? 'bg-black dark:bg-white dark:text-black font-bold'
					: 'bg-black/10  dark:bg-black/10'
			} rounded-full w-11 p-2.5 backdrop-blur-md transition duration-500 hover:scale-110  hover:font-bold hover:bg-black hover:text-white hover:dark:bg-white hover:dark:text-black`}
			onClick={buttonClicked}
			onMouseEnter={() => setHovered(true)}
			onMouseLeave={() => setHovered(false)}
		>
			{upvote ? upvoteButton : downvoteButton}
		</button>
	);
}

export default VotingButton;
