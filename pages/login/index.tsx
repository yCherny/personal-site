import { getProviders, useSession, signIn } from 'next-auth/react';
import { Button } from '@tremor/react';

function LoginPage({ providers }) {
	return (
		<main className='flex flex-col p-4 md:p-10 mx-auto max-w-7xl items-center gap-5 dark:text-white'>
			<h1>Admin Panel</h1>
			{Object.values(providers).map((provider) => (
				<div key={provider.name}>
					<Button
						onClick={() =>
							signIn(provider.id, {
								callbackUrl: `${window.location.origin}/admin`,
							})
						}
					>
						Sign In
					</Button>
				</div>
			))}
		</main>
	);
}

export async function getServerSideProps(context) {
	return { props: { providers: await getProviders() } };
}

export default LoginPage;
