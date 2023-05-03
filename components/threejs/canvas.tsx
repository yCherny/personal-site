import React, { Suspense, useState, useEffect } from 'react';
import { Canvas as FiberCanvas, useThree } from '@react-three/fiber';
import { PerformanceMonitor } from '@react-three/drei';
import Loading from '../navigation/loading';
import Scene from './scene';

/*
TrueISOCam Properties Taken from Reiner Prokein's Work:
http://wiki.blender.org/index.php/Extensions:2.6/Py/Scripts/Add_Mesh/Create_IsoCam
*/

function AdaptivePixelRatio() {
	const current = useThree((state) => state.performance.current);
	const setPixelRatio = useThree((state) => state.setPixelRatio);
	useEffect(() => {
		setPixelRatio(window.devicePixelRatio * current);
	}, [current]);
	return null;
}

function Canvas() {
	const [dpr, setDpr] = useState(1.5);

	return (
		<Suspense fallback={<Loading />}>
			<FiberCanvas
				shadows
				frameloop='demand'
				dpr={dpr}
				performance={{ min: 0.5 }}
				gl={{ antialias: false }}
			>
				<PerformanceMonitor
					onChange={({ factor }) =>
						setDpr(Math.round(0.5 + 1.5 * factor))
					}
				>
					<Scene />
				</PerformanceMonitor>
			</FiberCanvas>
		</Suspense>
	);
}

export default Canvas;
