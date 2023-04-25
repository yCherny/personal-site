function FixedOverlay(props: any) {
	return (
		<div className='fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-50 w-3/4 md:w-1/3'>
			<div className='flex flex-col gap-5 bg-white p-10 rounded-lg'>
				{props.children}
			</div>
		</div>
	);
}

export default FixedOverlay;
