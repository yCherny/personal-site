import React from 'react';
import Canvas from '../threejs/canvas';

function ThreeJSViewport() {
	return (
		<div className='fixed left-0 bottom-0 right-0 top-0 h-screen w-screen bg-[#1C173A]'>
			<Canvas />
		</div>
	);
}

export default ThreeJSViewport;
