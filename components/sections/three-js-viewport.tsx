import React, { useMemo, useRef, useState } from 'react';
import Scene from '@/components/threejs/scene';
import ContentPanel from '../threejs/content-panel';

export enum ContentType {
	Projects = 'Software Development',
	Resume = 'Academics and Resume',
}

function ThreeJSViewport() {
	const [content, setContent] = useState<ContentType>();
	const [showContent, setShowContent] = useState(false);
	function meshWasClickedInScene(content: ContentType) {
		setContent(content);
		setShowContent(true);
	}

	function dismissContentPane() {
		setShowContent(false);
	}

	return (
		<div className='fixed left-0 bottom-0 right-0 top-0 h-screen w-screen bg-[#1C173A]'>
			{showContent && (
				<ContentPanel
					content={content}
					dismissClicked={dismissContentPane}
				/>
			)}
			<Scene meshWasClicked={meshWasClickedInScene} />
		</div>
	);
}

export default ThreeJSViewport;
