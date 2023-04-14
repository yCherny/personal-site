import Link from 'next/link';
import CircularButton from '../buttons/circular-button';
import { useState } from 'react';

interface NavigationData {
	path: string;
	title: string;
	icon: React.ReactNode;
	onPress?: any;
	selected?: boolean;
}

function NavigationItem({
	path,
	title,
	icon,
	onPress,
	selected = false,
}: NavigationData) {
	const [isShown, setIsShown] = useState(false);

	function handleClick() {
		onPress(title);
	}

	return (
		<Link
			href={path}
			about={`${title} Link`}
			className='flex'
			onMouseEnter={() => setIsShown(true)}
			onMouseLeave={() => setIsShown(false)}
		>
			<CircularButton
				icon={icon}
				onClick={handleClick}
				selected={selected}
			/>
			{/* {isShown ? (
        <div className='text-center flex flex-row items-center bg-slate-600 rounded-full gap-2 pr-4'>
          <CircularButton icon={icon} onClick={handleClick} />
          <h1 className='text-white font-medium'>
            {title}
          </h1>
        </div>
      ) : (<CircularButton icon={icon} onClick={handleClick} />)} */}
		</Link>
	);
}

export default NavigationItem;
