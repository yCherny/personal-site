import Link from 'next/link';

function DevelopmentView() {
	return (
		<div>
			<h4 className='text-gray-500'>
				I've been a programmer every since I was a kid messing around
				with the game files on the original Doom floppy disk. Since
				then, I've built websites, mobile apps, messed around with
				machine learning models and even pursued a Master's degree in
				Computer Science.
			</h4>

			<h1 className='font-bold text-2xl'>My Tech Stack 🛠️</h1>
			<h4 className='text-gray-500 text-lg'>
				I currently work primarily with JavaScript and various libraries
				and frameworks that build upon it.
			</h4>
			<ul>
				<li>JavaScript</li>
				<li>TypeScript</li>
				<li>NextJS</li>
				<li>React</li>
				<li>Redux</li>
				<li>Node</li>
			</ul>

			<h4 className='text-gray-500'>
				Outside of that, I continue to dabble in Python, especially when
				it comes to machine learning and the larger scope of artificial
				intelligence. And some C++ when I'm feeling particularly
				ambitious to work on something close to the hardware.
			</h4>

			<h1>
				For more info about me, check out the{' '}
				<Link href={'/about'} className='underline font-bold'>
					About
				</Link>{' '}
				page.
			</h1>
			<h1>
				For more info on my projects, check out the{' '}
				<Link href={'/portfolio'} className='underline font-bold'>
					Portfolio
				</Link>{' '}
				page.
			</h1>
		</div>
	);
}

export default DevelopmentView;
