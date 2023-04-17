import React, { useMemo, useRef, useState } from 'react';
import Scene from '@/components/threejs/scene';
import ContentPanel from '../threejs/content-panel';

function ThreeJSViewport() {
	const [showContent, setShowContent] = useState(false);
	function meshWasClickedInScene(bool: boolean) {
		setShowContent(true);
	}

	function dismissContentPane() {
		setShowContent(false);
	}

	return (
		<div className='fixed left-0 bottom-0 right-0 top-0 h-screen w-screen bg-[#1C173A]'>
			{showContent && (
				<ContentPanel dismissClicked={dismissContentPane} />
			)}
			<Scene meshWasClicked={meshWasClickedInScene} />
		</div>
	);
}

export default ThreeJSViewport;
