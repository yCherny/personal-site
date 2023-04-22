function ResumeView() {
	return (
		<div>
			<h1 className='font-bold text-2xl'>MS Computer Science</h1>
			<h1 className='font-bold text-2xl'>
				New York University, Tandon School of Engineering
			</h1>

			<h4>Coursework</h4>
			<hr />
			<ul>
				<li>JavaScript</li>
				<li>TypeScript</li>
				<li>NextJS</li>
				<li>React</li>
				<li>Redux</li>
				<li>Node</li>
			</ul>

			<h1 className='font-bold text-2xl'>BA Economics</h1>
			<h1 className='font-bold text-2xl'>MS Computer Science</h1>
			<h1 className='font-bold text-2xl'>
				Baruch College, Weissman School of Arts and Sciences
			</h1>

			<h3 className='font-bold text-lg'>
				Minors in Physics and Mathematics
			</h3>

			<h4>Coursework</h4>
			<hr />
			<ul>
				<li>JavaScript</li>
				<li>TypeScript</li>
				<li>NextJS</li>
				<li>React</li>
				<li>Redux</li>
				<li>Node</li>
			</ul>

			<button
				className='rounded-full bg-black px-3 py-2 text-white font-bold'
				onClick={() => console.log('SUp bby')}
			>
				Download Resume
			</button>
		</div>
	);
}

export default ResumeView;
