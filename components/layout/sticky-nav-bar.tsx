function StickyNavBar(props: any) {
	return (
		<header className='flex w-full sticky top-5 z-50'>
			{props.children}
		</header>
	);
}

export default StickyNavBar;
