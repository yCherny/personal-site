import React from 'react';
import Scene from '@/components/threejs/scene';

function ThreeJSViewport() {
	return (
		<div className='fixed left-0 bottom-0 right-0 top-0 h-screen w-screen bg-[#1C173A]'>
			<Scene/>
		</div>
	);
}

export default ThreeJSViewport;
