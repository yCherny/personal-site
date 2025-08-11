function FixedOverlay(props: any) {
	return (
		<div className='fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-50 w-3/4 max-h-96 md:w-1/3 overflow-y-auto rounded-lg p-10 bg-white dark:bg-[#2C206A]'>
			<div className='flex flex-col gap-5'>{props.children}</div>
		</div>
	);
}

export default FixedOverlay;
