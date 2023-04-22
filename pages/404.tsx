function Page404() {
	return (
		<div className='flex items-center justify-center w-full text-black dark:text-white'>
			<div className='w-4/5 text-center flex flex-col gap-10'>
				<h1 className='text-6xl font-bold'>404</h1>
				<h3 className='text-3xl font-bold'>
					{"You've reached the end of the universe."}
				</h3>
				<h4 className='text-xl text-gray-400 dark:text-gray-500'>
					{'Turn back friend, there is nothing else here for you.'}
				</h4>
			</div>
		</div>
	);
}

export default Page404;
