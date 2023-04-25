import Image from 'next/image';
import { MapPinIcon } from '@heroicons/react/24/outline';

function Landing() {
	return (
		<div className='fixed -translate-y-1/2 -translate-x-1/2 left-1/2 md:left-20 flex flex-col gap-2 text-white dark:text-white z-50 items-center w-4/5 md:-translate-x-0 md:w-1/3 md:items-start top-28 md:top-1/2 md:gap-5'>
			<Image
				src={'/assets/logo.png'}
				alt={'Blog post image'}
				width={80}
				height={80}
				className='h-14 w-14 md:h-20 md:w-20'
			/>
			<h1 className='text-xl text-center font-bold md:text-6xl md:text-left'>
				Software Engineer
			</h1>
			<p className='text-sm text-center text-gray-400 dark:text-gray-500 md:text-lg md:text-left'>
				Night-owl. Enjoyer of precious things. Has a million thoughts
				running through his head.
				<span className='font-bold text-white dark:text-gray-400'>
					{' '}
					Essentially if gollum found a computer.
				</span>
			</p>
			<div className='flex flex-row gap-2 items-center hidden md:flex'>
				<MapPinIcon className='h-7' />
				<p className='text-lg md:text-2xl'>Brooklyn, NY</p>
			</div>
		</div>
	);
}

export default Landing;
