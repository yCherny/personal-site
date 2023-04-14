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
		<CircularButton
			icon={theme === 'light' ? disabledIcon : enabledIcon}
			onClick={handleOnClick}
		/>
	);
}
