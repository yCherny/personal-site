import React, { useState, useEffect } from 'react';
import CircularButton from './circular-button';
import { SpeakerWaveIcon, SpeakerXMarkIcon } from '@heroicons/react/24/outline';

const Player = ({ url }) => {
	const [audio, setAudio] = useState(null);
	const [playing, setPlaying] = useState(false);
	const toggle = () => setPlaying(!playing);

	useEffect(() => {
		setAudio(new Audio(url));
	}, []);

	useEffect(() => {
		if (audio) {
			playing ? audio.play() : audio.pause();
		}
	}, [playing]);

	return (
		<CircularButton
			icon={playing ? <SpeakerWaveIcon /> : <SpeakerXMarkIcon />}
			onClick={toggle}
		/>
	);
};

export default Player;
