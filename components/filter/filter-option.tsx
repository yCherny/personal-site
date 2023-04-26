import { Button } from '@tremor/react';
interface Props {
	text: string;
	selected: boolean;
	onPress: any;
}

function FilterOption({ text, selected, onPress }: Props) {
	return (
		<Button
			size='lg'
			onClick={() => {
				onPress(text);
			}}
			className={`${
				selected
					? 'bg-black dark:bg-white dark:text-black font-bold'
					: 'bg-gray-400 dark:bg-[#A59DB9] border-none'
			} py-2 px-3 rounded-full hover:font-bold hover:bg-black hover:text-white hover:dark:bg-white hover:dark:text-black`}
		>
			{text}
		</Button>
	);
}

export default FilterOption;
