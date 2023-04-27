// eslint-disable-next-line
// @ts-nocheck
import FixedOverlay from '@/components/layout/fixed-overlay';
import { useRouter } from 'next/router';
import Image from 'next/image';

import React, { Fragment, Suspense, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';

function StarsLocal() {
	const stars = React.useRef();
	useFrame(({ clock }) => {
		stars.current.rotation.x = clock.getElapsedTime() / 50;
		stars.current.rotation.z = Math.sin(clock.getElapsedTime() / 50);
	});

	return (
		<Suspense fallback={null}>
			<EffectComposer>
				<Bloom
					luminanceThreshold={0}
					luminanceSmoothing={0.9}
					height={300}
				/>
				<Vignette eskil={false} offset={0.1} darkness={1.1} />
			</EffectComposer>
			<Stars ref={stars} />
		</Suspense>
	);
}

function Page404() {
	const router = useRouter();
	const [loading, setLoading] = useState(false);
	return (
		<Fragment>
			<div className='fixed bg-black h-screen w-screen left-0 right-0 top-0 bottom-0'>
				<Canvas shadows>
					<StarsLocal />
				</Canvas>
			</div>

			<FixedOverlay>
				<h1 className='text-6xl font-bold'>404</h1>
				<h3 className='text-3xl font-bold'>
					{"You've reached the end of the universe."}
				</h3>
				<h4 className='text-xl text-gray-400 dark:text-gray-500'>
					{'Turn back friend, there is nothing else here for you.'}
				</h4>
				<button
					className='rounded-full bg-black px-3 py-2 text-white font-bold transition duration-500 hover:scale-110 items-center flex flex-col'
					onClick={() => {
						setLoading(true);
						router.back();
					}}
				>
					{!loading ? (
						'Phone Home'
					) : (
						<Image
							src={'/assets/tail-spin.svg'}
							alt='loading indicator'
							height={20}
							width={20}
						/>
					)}
				</button>
			</FixedOverlay>
		</Fragment>
	);
}

export default Page404;
