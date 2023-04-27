import CircularButton from '@/components/buttons/circular-button';
import { ArrowSmallLeftIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/router';

interface HeaderData {
	title: React.ReactNode;
	subtitle?: string;
	subheader?: boolean;
	children?: string | JSX.Element | JSX.Element[];
}

function Header({
	title,
	subtitle = undefined,
	subheader = false,
	children,
}: HeaderData) {
	const router = useRouter();
	function handleOnClick() {
		router.back();
	}

	return (
		<div className='flex flex-col w-full gap-4 mb-5 z-50 md:items-start'>
			<div className='flex w-full items-center justify-between'>
				<div className='flex items-center gap-4'>
					{subheader && (
						<div className='backdrop-blur-md bg-gray-400/30 dark:backdrop-blur-md dark:bg-white/20 rounded-full'>
							<CircularButton
								icon={<ArrowSmallLeftIcon />}
								onClick={handleOnClick}
							/>
						</div>
					)}
					<div className='flex flex-col gap-8'>
						<div className='flex flex-col gap-4'>
							<h1
								className={`font-bold ${
									subheader
										? 'text-xl md:text-4xl'
										: 'text-4xl md:text-6xl'
								} dark:text-white`}
							>
								{title}
							</h1>

							{subtitle && (
								<h4 className='text-gray-500 text-lg'>
									{subtitle}
								</h4>
							)}
						</div>
					</div>
				</div>
				{children}
			</div>
		</div>
	);
}

export default Header;
