import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
	return (
		<Html lang='en' className='dark'>
			<Head>
				<link
					href='https://fonts.googleapis.com/css2?family=Poppins:wght@300&display=swap'
					rel='stylesheet'
				/>
				<script src='./tracker.js' async />
			</Head>
			<body className='dark:bg-[#251F42]'>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
