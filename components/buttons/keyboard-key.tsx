interface ButtonProps {
	letter: string;
}

function KeyboardKey({ letter }: ButtonProps) {
	return (
		<span className='rounded-lg mx-1 px-3 py-2 text-white border-2 border-white text-center items-center font-mono'>
			{letter}
		</span>
	);
}

export default KeyboardKey;
