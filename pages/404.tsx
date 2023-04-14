function Page404() {
	return (
		<div className='fixed flex items-center justify-center h-screen w-screen bg-[#000] text-white'>
			<div className='w-1/2 text-center flex flex-col gap-10'>
				<h1 className='text-6xl font-bold'>404</h1>
				<h1 className='text-3xl font-bold text-blue-500 dark:text-red-500'>
					Turn back friend, there is nothing else here for you, you've
					reached the end of the universe.
				</h1>
			</div>
		</div>
	);
}

export default Page404;
