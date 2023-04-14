import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';

function Sphere(props) {
	// This reference will give us direct access to the mesh
	const mesh = useRef();
	// Set up state for the hovered and active state
	const [hovered, setHover] = useState(false);
	// Subscribe this component to the render-loop, rotate the mesh every frame
	useFrame((state, delta) => {
		mesh.current.rotation.y -= delta;
	});
	// Return view, these are regular three.js elements expressed in JSX
	return (
		<mesh
			{...props}
			ref={mesh}
			scale={0.5}
			onPointerOver={(event) => setHover(true)}
			onPointerOut={(event) => setHover(false)}
		>
			<sphereGeometry args={[5, 50, 50]} />
			<meshStandardMaterial color={0xff0000} wireframe={true} />
		</mesh>
	);
}

export default Sphere;
