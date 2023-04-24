import { AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline';
import FilterOption from './filter-option';
import { useState } from 'react';

type Props = {
	onClick: any;
	filterOptions: string[];
	path: string;
};

function FilterPanel({ onClick, filterOptions, path }: Props) {
	const [selected, setSelected] = useState<number | null>(null);

	function handleOptionSelect(option: string, index: number) {
		setSelected(selected === index ? null : index);
		onClick(option);
	}

	return (
		<header
			className='flex h-full z-50 flex-wrap drop-shadow-lg gap-2 p-3 pr-5 rounded-lg items-center
			bg-white dark:bg-[#433660] dark:text-white w-full md:w-auto
		'
		>
			<div className='w-10 p-2'>
				<AdjustmentsHorizontalIcon />
			</div>

			{filterOptions.map((option, index) => {
				return (
					<FilterOption
						text={option}
						key={index}
						selected={selected === index}
						onPress={(option: string) =>
							handleOptionSelect(option, index)
						}
					/>
				);
			})}
		</header>
	);
}

export default FilterPanel;
