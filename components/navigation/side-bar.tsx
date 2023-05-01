import { Button, Title } from '@tremor/react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { PlusCircleIcon } from '@heroicons/react/24/outline';
import FilterOption from '../filter/filter-option';

type Props = {
	onClick: any;
	filterOptions: string[];
	newPath: string;
};

export default function SideBar({ onClick, filterOptions, newPath }: Props) {
	const router = useRouter();
	const [selected, setSelected] = useState<number | null>(null);

	function handleOptionSelect(option: string, index: number) {
		setSelected(selected === index ? null : index);
		onClick(option);
	}

	return (
		<div className='flex flex-col gap-4 mb-5 md:mb-0'>
			<Title className='font-bold text-2xl dark:text-white'>
				Filters
			</Title>
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

			<Title className='font-bold text-2xl dark:text-white'>
				Actions
			</Title>
			<Button
				size='lg'
				icon={PlusCircleIcon}
				onClick={() => router.push(newPath)}
				className='bg-black border-none'
			>
				Create New
			</Button>
		</div>
	);
}
