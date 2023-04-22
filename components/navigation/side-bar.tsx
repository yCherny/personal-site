import { PlusCircleIcon } from '@heroicons/react/24/outline';
import { Button, Title } from '@tremor/react';
import { useRouter } from 'next/router';
import { useState } from 'react';

type Props = {
	onClick: any;
};

export default function SideBar({ onClick }: Props) {
	const router = useRouter();
	const [selected, setSelected] = useState<number | null>(null);

	function filterContent(type: string) {
		if (type === 'blog') {
			setSelected(selected === 0 ? null : 0);
		} else {
			setSelected(selected === 1 ? null : 1);
		}

		onClick(type);
	}

	return (
		<div className='flex flex-col gap-4'>
			<Button
				size='lg'
				onClick={() => filterContent('blog')}
				className={`${selected === 0 ? 'bg-black' : 'bg-blue-500'}`}
			>
				Blog
			</Button>

			<Button
				size='lg'
				onClick={() => filterContent('project')}
				className={`${selected === 1 ? 'bg-black' : 'bg-blue-500'}`}
			>
				Projects
			</Button>

			<Button onClick={() => router.push('/admin/uploads/edit')}>
				<div className='flex flex-row h-6 gap-2 items-center'>
					<PlusCircleIcon className='h-6 w-6' />
					Create New
				</div>
			</Button>
		</div>
	);
}
