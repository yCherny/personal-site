import { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';

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
				<Script
					id='google-tag'
					strategy='afterInteractive'
					dangerouslySetInnerHTML={{
						__html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-5LQPTXT');`,
					}}
				></Script>
			</Head>
			<body className='dark:bg-[#130F29]'>
				<noscript
					dangerouslySetInnerHTML={{
						__html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-5LQPTXT"
height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
					}}
				></noscript>

				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
