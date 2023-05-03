import React, { Suspense } from 'react';
import { OrthographicCamera, OrbitControls, Preload } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';

// Local Components
import SceneLighting from './scene-lighting';
import { Model } from './room-alpha';

function Scene() {
	const myCamera = React.useRef();
	return (
		<>
			<OrthographicCamera
				makeDefault
				zoom={1500}
				rotation={[0.955324, 0, 0.785398]}
				scale={14.123}
				near={1}
				far={10}
				position={[30.60861, 30.60861, 30.60861]}
				ref={myCamera}
			/>

			<OrbitControls
				// 0, 2*PI -> + Z
				// PI -> -Z
				// Pi / 2 -> -X
				// (3*PI) / 2 -> + X
				minZoom={1400}
				maxZoom={6000}
				minAzimuthAngle={0 + Math.PI / 36}
				maxAzimuthAngle={Math.PI / 3}
				minPolarAngle={Math.PI / 6}
				maxPolarAngle={Math.PI / 2.25}
			/>

			<Suspense fallback={null}>
				<SceneLighting enabled={true} />
				<EffectComposer>
					<Bloom
						luminanceThreshold={0}
						luminanceSmoothing={0.9}
						height={300}
					/>
					<Vignette eskil={false} offset={0.1} darkness={1.1} />
				</EffectComposer>
			</Suspense>

			<Model />
			<Preload all />
		</>
	);
}

export default Scene;
