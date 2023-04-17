import { useEffect, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { Inter } from 'next/font/google';
import { InformationCircleIcon, MapPinIcon } from '@heroicons/react/24/outline';
import Landing from '@/components/sections/landing';
import Instructions from '@/components/threejs/instructions';
import ThreeJSViewport from '@/components/sections/three-js-viewport';
import FixedOverlay from '@/components/layout/fixed-overlay';

const inter = Inter({ subsets: ['latin'] });

enum Orientation {
	Portrait,
	Landscape,
}

export default function Home() {
	const [showOrientationMessage, setShowOrientationMessage] = useState(true);
	const [showAttribution, setShowAttribution] = useState(false);

	const [orientation, setOrientation] = useState<Orientation>(
		Orientation.Portrait
	);

	function dismissOrientationMessage() {
		setShowOrientationMessage(false);
	}

	function toggleAttribution() {
		setShowAttribution(!showAttribution);
	}

	useEffect(() => {
		window
			.matchMedia('(orientation: portrait)')
			.addEventListener('change', (e) => {
				const portrait = e.matches;

				if (portrait) {
					setOrientation(Orientation.Portrait);
					setShowOrientationMessage(true);
				} else {
					setOrientation(Orientation.Landscape);
					setShowOrientationMessage(false);
				}
			});
	}, []);

	return (
		<>
			<Head>
				<title>Yegor Chernyshev</title>
				<meta
					name='description'
					content="Yegor Chernyshev's Personal Site"
				/>
				<meta
					name='viewport'
					content='width=device-width, initial-scale=1.0, viewport-fit=cover'
				/>
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<main>
				<button
					onClick={toggleAttribution}
					className='fixed top-5 right-5 h-8 w-8 text-gray-600 z-50'
				>
					<InformationCircleIcon />
				</button>
				<Landing />
				<Instructions />
				<ThreeJSViewport />
				{showOrientationMessage && (
					<FixedOverlay>
						<h1 className='font-bold text-2xl'>Welcome! 👋</h1>
						<h4 className='text-gray-500'>
							For the best experience, please rotate your device
							to landscape mode.
						</h4>
						<button
							className='rounded-full bg-black px-3 py-2 text-white font-bold'
							onClick={dismissOrientationMessage}
						>
							Dismiss
						</button>
					</FixedOverlay>
				)}

				{showAttribution && (
					<FixedOverlay>
						<h1 className='font-bold text-2xl'>Attribution ❤️</h1>
						<h4 className='text-gray-500'>
							I may wear many hats, but unfortunately my talents
							only go so far. Below are the attributions to
							several assets I used to top off this site.
						</h4>
						<ul>
							<a href='https://pixabay.com/music/upbeat-chill-ambient-11322/'>
								<span className='font-bold underline'>
									Chill Ambient
								</span>{' '}
								- Song by Coma-Media
							</a>
							<a href='https://www.pexels.com/photo/photo-of-graffiti-wall-3053859/'>
								<span className='font-bold underline'>
									Wall Art Over the Bed
								</span>
								- Photo by Nextvoyage
							</a>
						</ul>
						<button
							className='rounded-full bg-black px-3 py-2 text-white font-bold'
							onClick={toggleAttribution}
						>
							Dismiss
						</button>
					</FixedOverlay>
				)}
			</main>
		</>
	);
}
