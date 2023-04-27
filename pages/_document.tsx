import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
	return (
		<Html lang='en' className='dark'>
			<Head>
				<link
					href='https://fonts.googleapis.com/css2?family=Poppins:wght@300&display=swap'
					rel='stylesheet'
				/>
				<link
					rel='stylesheet'
					href='https://cdn.jsdelivr.net/gh/devicons/devicon@v2.15.1/devicon.min.css'
				/>
			</Head>
			<body className='dark:bg-[#130F29]'>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
