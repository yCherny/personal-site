import { useState } from 'react';
import Head from 'next/head';
import Instructions from '@/components/threejs/instructions';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import Landing from '@/components/sections/landing';
import ThreeJSViewport from '@/components/sections/three-js-viewport';
import FixedOverlay from '@/components/layout/fixed-overlay';

export default function Home() {
	const [showAttribution, setShowAttribution] = useState(false);

	function toggleAttribution() {
		setShowAttribution(!showAttribution);
	}

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

				{showAttribution && (
					<FixedOverlay>
						<h1 className='font-bold text-2xl'>Controls 🎮</h1>
						<h4 className='text-gray-500'>
							This page is still under development and full
							interactivity is coming. But in the meantime,{' '}
							<span className='font-bold'>
								you can use your fingers or mouse to pan around
								the room and zoom in
							</span>
							. Please check out the other pages on my site below.
						</h4>
						<hr />
						<h1 className='font-bold text-2xl'>Attribution ❤️</h1>
						<h4 className='text-gray-500'>
							I may wear many hats, but unfortunately my talents
							only go so far. Below are the attributions to
							several assets I used to top off this site.
						</h4>
						<ul className='flex flex-col gap-2'>
							<li>
								<a href='https://skfb.ly/ox8Xu'>
									<span className='font-bold underline'>
										Low-Poly Plant
									</span>
									- by Jackmcm is licensed under Creative
									Commons Attribution
								</a>
							</li>
							<li>
								<a href='https://skfb.ly/opS6n'>
									<span className='font-bold underline'>
										Potted Plant, Mediterranean
									</span>
									- by dudecon is licensed under Creative
									Commons Attribution
								</a>
							</li>
							<li>
								<a href='https://skfb.ly/ZUPM'>
									<span className='font-bold underline'>
										Office Chair
									</span>
									- by j.a.m is licensed under Creative
									Commons Attribution
								</a>
							</li>
							<li>
								<a href='https://skfb.ly/6CBCQ'>
									<span className='font-bold underline'>
										Asset Music Guitar
									</span>
									- by burunduk is licensed under Creative
									Commons Attribution
								</a>
							</li>
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
