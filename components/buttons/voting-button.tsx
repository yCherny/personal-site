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
			{hovered ? <UpvoteSolid /> : <UpvoteOutline />}
		</div>
	);

	const downvoteButton = (
		<div className='text-pink-500'>
			{hovered ? <DownvoteSolid /> : <DownvoteOutline />}
		</div>
	);

	return (
		<button
			className={`rounded-full w-11 p-2.5 backdrop-blur-md transition duration-500 bg-black/10  dark:bg-black/10 hover:scale-110 hover:bg-black hover:dark:bg-white`}
			onClick={buttonClicked}
			onMouseEnter={() => setHovered(true)}
			onMouseLeave={() => setHovered(false)}
		>
			{upvote ? upvoteButton : downvoteButton}
		</button>
	);
}

export default VotingButton;
