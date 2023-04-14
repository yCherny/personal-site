import React, { useMemo, useRef, useState } from 'react';
import { Vector3 } from 'three';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import {
	Center,
	AccumulativeShadows,
	RandomizedLight,
	Environment,
	useGLTF,
	useDepthBuffer,
	SpotLight,
	SoftShadows,
	Float,
	ContactShadows,
	Sky,
} from '@react-three/drei';
// import { PointLightShadow } from 'three';
// import { Pathtracer } from '@react-three/gpu-pathtracer';

import { easing } from 'maath';

function Light() {
	const ref = useRef();
	useFrame((state, delta) => {
		easing.dampE(
			ref.current.rotation,
			[
				(state.pointer.y * Math.PI) / 50,
				(state.pointer.x * Math.PI) / 20,
				0,
			],
			0.2,
			delta
		);
	});
	return (
		<group ref={ref}>
			{/* Area Scene Light Large */}
			<directionalLight
				position={[-4, 3, -6]}
				color={'#FFF'}
				castShadow
				intensity={0.2}
				shadow-mapSize={2048}
				shadow-bias={-0.001}
			>
				<orthographicCamera
					attach='shadow-camera'
					args={[-8.5, 8.5, 8.5, -8.5, 0.1, 20]}
				/>
			</directionalLight>

			{/* Area Scene Light Medium */}
			<directionalLight
				position={[13, 7, -6]}
				color={'#FF95EC'}
				castShadow
				intensity={0.15}
				shadow-mapSize={2048}
				shadow-bias={-0.001}
			>
				<orthographicCamera
					attach='shadow-camera'
					args={[-8.5, 8.5, 8.5, -8.5, 0.1, 20]}
				/>
			</directionalLight>

			{/* Point Scene Light */}
			<pointLight
				position={[-1, 2, -0.82]}
				color={'#FFB8FD'}
				intensity={0.15}
			/>

			{/* <directionalLight
				position={[-1, 1, -1]}
				color={'#FFB8FD'}
				castShadow
				intensity={0.3}
				shadow-mapSize={2048}
				shadow-bias={-0.001}
			>
				<orthographicCamera
					attach='shadow-camera'
					args={[-8.5, 8.5, 8.5, -8.5, 0.1, 20]}
				/>
			</directionalLight> */}
		</group>
	);
}

function Spot({ vec = new Vector3(), ...props }) {
	const light = useRef();
	const viewport = useThree((state) => state.viewport);
	useFrame((state) => {
		light.current.target.position.lerp(
			vec.set(
				(state.mouse.x * viewport.width) / 2,
				(state.mouse.y * viewport.height) / 2,
				0
			),
			0.1
		);
		light.current.target.updateMatrixWorld();
	});
	return (
		<SpotLight
			castShadow
			ref={light}
			penumbra={1} //  Percent of the spotlight cone that is attenuated due to penumbra. Takes values between zero and 1. Default is zero.
			distance={6} //Maximum range of the light. Default is 0 (no limit).
			angle={0.35} // Width of Beam
			attenuation={5}
			anglePower={4}
			intensity={2}
			decay={0} // The amount the light dims along the distance of the light.
			{...props}
		/>
	);
}

type Props = {
	enabled: boolean;
};

function SceneLighting({ enabled = true }: Props) {
	const depthBuffer = useDepthBuffer({ frames: 1 });

	if (enabled) {
		return (
			<>
				{/* {enabled && (
				<SoftShadows
					{...config}
					samples={bad ? Math.min(6, samples) : samples}
				/>
			)} */}
				<ambientLight intensity={1} color={'#6959BB'} />
				<ContactShadows
					resolution={512}
					position={[0, -0.8, 0]}
					opacity={1}
					scale={10}
					blur={2}
					far={0.8}
				/>

				<Light />

				<Spot
					depthBuffer={depthBuffer}
					color='#0c8cbf'
					position={[3, 2.05, -0.79]}
				/>
				<Spot
					depthBuffer={depthBuffer}
					color='#b00c3f'
					position={[1, 3, 0]}
				/>
			</>
		);
	} else {
		return null;
	}
}

export default SceneLighting;
