import { useState } from 'react';
import NavigationItem from './navigation-item';
import NavigationGroup from './navigation-group';
import Toggle from '../buttons/toggle-button';
import {
	HomeIcon,
	CubeTransparentIcon,
	NewspaperIcon,
	MoonIcon,
	SunIcon,
	SpeakerWaveIcon,
	SpeakerXMarkIcon,
} from '@heroicons/react/24/outline';
import Player from '../buttons/player';

function NavigationBar() {
	const [darkModeEnabled, setDarkModeEnabled] = useState(false);
	const [musicEnabled, setMusicEnabled] = useState(false);
	const [selectedTab, setSelectedTab] = useState(0);

	function handleThemeChange() {
		setDarkModeEnabled(!darkModeEnabled);
	}

	function tabSelected(title: string) {
		switch (title) {
			case 'Portfolio':
				setSelectedTab(1);
				break;
			case 'Blog':
				setSelectedTab(2);
				break;
			default:
				setSelectedTab(0);
				break;
		}
	}

	return (
		<div className='fixed left-1/2 -translate-x-1/2 bottom-5 flex flex-row gap-5'>
			<NavigationGroup>
				<Toggle disabledIcon={<MoonIcon />} enabledIcon={<SunIcon />} />
			</NavigationGroup>

			<NavigationGroup>
				<NavigationItem
					path={'/'}
					title={'Home'}
					icon={<HomeIcon />}
					onPress={tabSelected}
					selected={selectedTab === 0}
				/>
				<NavigationItem
					path={'/portfolio'}
					title={'Portfolio'}
					icon={<CubeTransparentIcon />}
					onPress={tabSelected}
					selected={selectedTab === 1}
				/>
				<NavigationItem
					path={'/blog'}
					title={'Blog'}
					icon={<NewspaperIcon />}
					onPress={tabSelected}
					selected={selectedTab === 2}
				/>
			</NavigationGroup>
			<NavigationGroup>
				<Player url={'/assets/chill-ambient-coma-media.mp3'} />
			</NavigationGroup>
		</div>
	);
}

export default NavigationBar;
