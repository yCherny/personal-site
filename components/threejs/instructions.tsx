import KeyboardKey from '@/components/buttons/keyboard-key';

function Instructions(props: any) {
	return (
		<div className='fixed left-1/2 z-50 -translate-x-1/2 w-4/5  text-center bottom-20 md:bottom-28'>
			<p className='text-gray-400 dark:text-gray-400 md:text-lg leading-loose'>
				Use your fingers or mouse to move around the room and select
				items of interest.
				{/* <KeyboardKey letter='W' />
				<KeyboardKey letter='A' />
				<KeyboardKey letter='S' />
				<KeyboardKey letter='D' /> */}
			</p>
		</div>
	);
}

export default Instructions;
