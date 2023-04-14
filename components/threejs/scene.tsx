import React, { useMemo, useRef, useState } from 'react';
import { Vector3 } from 'three';
import { useControls } from 'leva';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { OrthographicCamera } from '@react-three/drei';
import { Center, OrbitControls, useGLTF, Float } from '@react-three/drei';

// Local Components
import SceneLighting from './scene-lighting';
import Performance from './performance-debug';
import { Model } from './room';
import { Player } from './player';

//  Controls
import { usePersonControls } from './player-control';
import {
	Debug,
	Physics,
	useBox,
	usePlane,
	useSphere,
	useTrimesh,
	useCylinder,
	useConvexPolyhedron,
} from '@react-three/cannon';

/*
TrueISOCam Properties Taken from Reiner Prokein's Work:
http://wiki.blender.org/index.php/Extensions:2.6/Py/Scripts/Add_Mesh/Create_IsoCam
*/

function Scene() {
	// Scene Variables Control
	const [bad, set] = useState(false);
	// const options = useControls('Performance', {
	// 	debug: true,
	// 	lighting: true,
	// 	size: { value: 35, min: 0, max: 100, step: 0.1 },
	// 	focus: { value: 0.5, min: 0, max: 2, step: 0.1 },
	// 	samples: { value: 16, min: 1, max: 40, step: 1 },
	// });

	const { forward, backward, left, right, jump } = usePersonControls();

	// const [mesh, api] = useSphere(() => ({
	// 	mass: 10,
	// 	position: [0, 1, 0],
	// 	type: 'Dynamic',
	// }));

	// useFrame(() => {
	// 	// Calculating front/side movement ...
	// 	let frontVector = new Vector3(0, 0, 0);
	// 	let sideVector = new Vector3(0, 0, 0);
	// 	let direction = new Vector3(0, 0, 0);

	// 	frontVector.set(0, 0, Number(forward) - Number(backward));
	// 	sideVector.set(Number(right) - Number(left), 0, 0);
	// 	direction
	// 		.subVectors(frontVector, sideVector)
	// 		.normalize()
	// 		.multiplyScalar(3);

	// 	api.velocity.set(direction.x, 0, direction.z);
	// });

	// const gravity = useControls('Gravity', {
	// 	x: { value: 0, min: -10, max: 10, step: 0.1 },
	// 	y: { value: -9.8, min: -10, max: 10, step: 0.1 },
	// 	z: { value: 0, min: -10, max: 10, step: 0.1 },
	// });

	// Setting person model position to sphere body position ...
	// useFrame(() => {
	// 	mesh.current.getWorldPosition(playerModelReference.current.position);
	// });

	return (
		<Canvas shadows>
			<OrthographicCamera
				makeDefault
				zoom={1500}
				rotation={[0.955324, 0, 0.785398]}
				scale={14.123}
				near={1}
				far={50000}
				position={[30.60861, 30.60861, 30.60861]}
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

			{/* <Performance enabled={options.debug} /> */}
			<SceneLighting enabled={true} />
			{/* <Physics gravity={[gravity.x, gravity.y, gravity.z]}> */}
			<Model />
			<Player />
			{/* </Physics> */}
		</Canvas>
	);
}

export default Scene;
