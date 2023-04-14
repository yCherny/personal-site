import {
	HandThumbUpIcon,
	HandThumbDownIcon,
} from '@heroicons/react/24/outline';

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
	function buttonClicked() {
		onClick();
	}

	return (
		<button
			className={
				`rounded-full w-11 p-2.5 backdrop-blur-md transition duration-500 ${
					upvote ? 'text-emerald-400' : 'text-pink-500'
				} bg-black/10 hover:bg-black hover:text-white dark:bg-black/10  dark:hover:bg-white dark:hover:text-black` +
				(selected &&
					'bg-black text-white dark:bg-white dark:text-black')
			}
			onClick={buttonClicked}
		>
			{upvote ? <HandThumbUpIcon /> : <HandThumbDownIcon />}
		</button>
	);
}

export default VotingButton;
