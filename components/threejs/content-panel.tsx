import CircularButton from '../buttons/circular-button';
import { ArrowSmallLeftIcon } from '@heroicons/react/24/outline';

type Props = {
	dismissClicked: any;
};

function ContentPanel({ dismissClicked }: Props) {
	function dismissButtonClicked() {
		dismissClicked();
	}

	return (
		<div className='fixed bg-white text-black dark:text-white dark:bg-[#251F42]  z-50 p-10 rounded-xl bottom-0 left-0 right-0 max-h-full mb-40 m-5 md:m-16 max-h-1/3 max-w-full md:mb-40 md:w-1/3 md:top-0 md:max-h-full md:left-auto'>
			<div className='flex items-center gap-4'>
				<div className='backdrop-blur-md bg-gray-400/30 dark:backdrop-blur-md dark:bg-white/20 rounded-full'>
					<CircularButton
						icon={<ArrowSmallLeftIcon />}
						onClick={dismissButtonClicked}
					/>
				</div>

				<div className='flex flex-col gap-8'>
					<h1 className='font-bold text-2xl'>Attribution ❤️</h1>
				</div>
			</div>

			<h4 className='text-gray-500'>Something creative hopefully</h4>
		</div>
	);
}

export default ContentPanel;
