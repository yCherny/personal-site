import { useTheme } from 'next-themes';
import React, { useEffect, useState } from 'react';
import CircularButton from './circular-button';

type Props = {
	disabledIcon: React.ReactNode;
	enabledIcon: React.ReactNode;
};

export default function ToggleButton({ disabledIcon, enabledIcon }: Props) {
	const [mounted, setMounted] = useState(false);
	const { theme, setTheme } = useTheme();

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return null;
	}

	function handleOnClick() {
		if (theme === 'light') {
			return setTheme('dark');
		}
		return setTheme('light');
	}

	return (
		<button
			className={`rounded-full w-10 h-10 p-2.5 flex flex-col items-center
		
		backdrop-blur-md transition duration-500 text-white
		
		bg-black/10 text-black 
		hover:bg-black hover:text-white 
		
		dark:bg-black/10  dark:hover:bg-white dark:hover:text-black
		`}
			onClick={handleOnClick}
			data-cy='themeToggle'
		>
			{theme === 'light' ? disabledIcon : enabledIcon}
		</button>
	);
}
