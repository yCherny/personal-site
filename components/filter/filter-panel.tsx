import { AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline';
import FilterOption from './filter-option';
import { useRouter } from 'next/router';

type Props = {
	onClick: any;
	filterOptions: string[];
	path: string;
};

function FilterPanel({ onClick, filterOptions, path }: Props) {
	const router = useRouter();
	function findContentHandler(tag: string) {
		const fullPath = `/${path}/${tag}`;
		router.push(fullPath);
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
						onPress={() => onClick(option)}
					/>
				);
			})}
		</header>
	);
}

export default FilterPanel;
