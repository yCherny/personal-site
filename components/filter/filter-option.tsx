interface Props {
	text: string;
	onPress: any;
}

function FilterOption({ text, onPress }: Props) {
	function handleTagSelect() {
		onPress(text.toLowerCase());
	}
	return (
		<button
			className={`rounded-full h-full shadow-lg px-5 py-1 transition duration-500 text-sm md:text-lg font-bold text-white 
			bg-gray-400
			dark:bg-[#A59DB9]

			hover:bg-black hover:text-white
			hover:dark:bg-white hover:dark:text-black
			
			`}
			onClick={handleTagSelect}
		>
			{text}
		</button>
	);
}

export default FilterOption;
