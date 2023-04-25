import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useTheme } from 'next-themes';

interface ButtonProps {
	icon: React.ReactNode;
	onClick: any;
	selected?: boolean;
	color?: string;
}

function CircularButton({ icon, onClick, selected = false }: ButtonProps) {
	const router = useRouter();
	const [loading, setLoading] = useState(false);
	const { theme } = useTheme();

	function buttonClicked() {
		onClick();
		setLoading(true);
	}

	useEffect(() => {
		router.events.on('routeChangeComplete', () => {
			setLoading(false);
		});
	}, [router]);

	return (
		<button
			className={
				`rounded-full w-10 h-10 p-2.5 flex flex-col items-center
			
			backdrop-blur-md transition duration-500 text-white
			
			bg-black/10 text-black 
			hover:bg-black hover:text-white 
			
			dark:bg-black/10  dark:hover:bg-white dark:hover:text-black
			` + (selected && 'bg-black/100 text-white dark:bg-white dark:text-black')
			}
			onClick={buttonClicked}
		>
			{!loading ? (
				icon
			) : (
				<Image
					src={
						theme === 'dark'
							? '/assets/tail-spin-dark.svg'
							: '/assets/tail-spin.svg'
					}
					alt='loading indicator'
					height={20}
					width={20}
				/>
			)}
		</button>
	);
}

export default CircularButton;
