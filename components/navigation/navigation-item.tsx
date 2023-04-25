import Link from 'next/link';
import CircularButton from '../buttons/circular-button';

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
	function handleClick() {
		onPress(title);
	}

	return (
		<Link href={path} about={`${title} Link`} className='flex'>
			<CircularButton
				icon={icon}
				onClick={handleClick}
				selected={selected}
			/>
		</Link>
	);
}

export default NavigationItem;
