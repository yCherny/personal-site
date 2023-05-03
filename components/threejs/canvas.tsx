import React, { Suspense, useState } from 'react';
import { Canvas as FiberCanvas } from '@react-three/fiber';
import {
	PerformanceMonitor,
	AdaptiveDpr,
	AdaptiveEvents,
} from '@react-three/drei';
import Loading from '../navigation/loading';
import Scene from './scene';

/*
TrueISOCam Properties Taken from Reiner Prokein's Work:
http://wiki.blender.org/index.php/Extensions:2.6/Py/Scripts/Add_Mesh/Create_IsoCam
*/

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
				<AdaptiveDpr pixelated />
				<AdaptiveEvents />
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
