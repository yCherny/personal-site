// eslint-disable-next-line
// @ts-nocheck
import React, { useEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import {
	ContactShadows,
	Environment,
	Sky,
	SpotLight,
	Sparkles,
	useDepthBuffer,
} from '@react-three/drei';
import { easing } from 'maath';
import { useTheme } from 'next-themes';

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

			{/* Mobile Phone Light */}

			{/* Desktop Case Power Button Light */}
			<pointLight
				position={[-0.66, 1.92, -1.01]}
				color={'#FFF'}
				intensity={0.1}
			/>
		</group>
	);
}

type Props = {
	enabled: boolean;
};

function SceneLighting({ enabled = true }: Props) {
	const { theme, setTheme } = useTheme();

	if (enabled) {
		return (
			<>
				{theme === 'light' && (
					<>
						<ambientLight intensity={1} color={'#6959BB'} />
					</>
				)}

				<ContactShadows
					resolution={512}
					position={[0, -0.8, 0]}
					opacity={1}
					scale={10}
					blur={2}
					far={0.8}
				/>
				<Light />
				{/* Table Lamp */}
				<rectAreaLight
					// castShadow
					width={0.08}
					height={0.08}
					intensity={1.5}
					color={'#FFF'}
					position={[-0.41, 2.24, -0.05]}
					rotation={[-Math.PI / 2, 0, 0]}
				/>

				{theme === 'dark' && (
					<>
						{/* Standing Lamp */}
						<SpotLight
							castShadow
							position={[2.85, 2.51, -0.72]}
							color={'#FDFD96'}
							penumbra={1}
							angle={0.5}
							distance={5}
							attenuation={3}
							intensity={2}
							anglePower={5}
							onUpdate={(self) => {
								self.target.position.set(4.12, 0.35, 0.909);
								self.target.updateMatrixWorld();
							}}
						/>

						<SpotLight
							castShadow
							position={[2.98, 2.05, -0.78]}
							color={'#FDFD96'}
							penumbra={1}
							angle={0.5}
							distance={5}
							attenuation={3}
							intensity={2}
							anglePower={5} // Diffuse-cone anglePower (default: 5)
							onUpdate={(self) => {
								self.target.position.set(3.8, 1.5, -0.4);
								self.target.updateMatrixWorld();
							}}
						/>

						<Sparkles
							position={[4.2, 1.4, 0.3]}
							scale={1.6}
							opacity={0.25}
							speed={0.5}
						/>
					</>
				)}
			</>
		);
	} else {
		return null;
	}
}

export default SceneLighting;
