function NavigationGroup(props: any) {
	return (
		<ul
			className='inline-flex gap-3 rounded-full items-center 
		backdrop-blur-md bg-gray-400/30
		dark:backdrop-blur-md dark:bg-white/20'
		>
			{props.children}
		</ul>
	);
}

export default NavigationGroup;
