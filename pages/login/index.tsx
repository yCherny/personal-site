import { useSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { Button } from '@tremor/react';

function LoginPage() {
	const { data } = useSession();
	const router = useRouter();

	if (data) {
		router.push('/admin');
	}

	return (
		<div className='fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-50 w-2/5 bg-white rounded-lg p-5 drop-shadow-md'>
			<div className='flex flex-col gap-5 items-center'>
				<h1 className='font-bold text-black text-2xl'>
					Shoo, Pepping Toms
				</h1>
				<Button onClick={() => signIn()}>Sign In</Button>
			</div>
		</div>
	);
}

export default LoginPage;
