import { Button, Title } from '@tremor/react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import {
	CommandLineIcon,
	NewspaperIcon,
	PlusCircleIcon,
} from '@heroicons/react/24/outline';

type Props = {
	onClick: any;
	filterOptions: string[];
	newPath: string;
};

export default function SideBar({ onClick, filterOptions, newPath }: Props) {
	const router = useRouter();
	const [selected, setSelected] = useState<number | null>(null);

	return (
		<div className='flex flex-col gap-4 mb-5 md:mb-0'>
			{filterOptions.map((option, index) => {
				return (
					<Button
						key={index}
						size='lg'
						onClick={() => {
							setSelected(selected === index ? null : index);
							onClick(option);
						}}
						className={`${
							selected === 0
								? 'bg-blue-500'
								: 'bg-black border-none'
						}`}
					>
						{option}
					</Button>
				);
			})}

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
