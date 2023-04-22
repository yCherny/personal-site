import CircularButton from '../buttons/circular-button';
import { ArrowSmallLeftIcon } from '@heroicons/react/24/outline';
import { ContentType } from '../sections/three-js-viewport';

// Content
import ResumeView from '../content/resume-view';
import DevelopmentView from '../content/development-view';

type Props = {
	content: ContentType;
	dismissClicked: any;
};

function ContentPanel({ content, dismissClicked }: Props) {
	function dismissButtonClicked() {
		dismissClicked();
	}

	return (
		<div className='fixed bg-white text-black dark:text-white dark:bg-[#251F42]  z-50 p-10 rounded-xl bottom-0 left-0 right-0 mb-40 m-5 md:m-16 max-h-80 max-w-full md:mb-40 md:w-1/3 md:top-0 md:max-h-full md:left-auto overflow-y-scroll overflow-hidden'>
			<div className='flex items-center gap-4 sticky top-0'>
				<div className='backdrop-blur-md bg-gray-400/30 dark:backdrop-blur-md dark:bg-white/20 rounded-full'>
					<CircularButton
						icon={<ArrowSmallLeftIcon />}
						onClick={dismissButtonClicked}
					/>
				</div>

				<div className='flex flex-col gap-8'>
					<h1 className='font-bold text-2xl'>{content.toString()}</h1>
				</div>
			</div>
			{content === ContentType.Resume ? (
				<ResumeView />
			) : (
				<DevelopmentView />
			)}
		</div>
	);
}

export default ContentPanel;
