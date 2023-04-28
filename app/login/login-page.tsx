'use client';

import { ClientSafeProvider, signIn, LiteralUnion } from 'next-auth/react';
import { Button } from '@tremor/react';
import { BuiltInProviderType } from 'next-auth/providers';

type Props = {
	providers: Record<
		LiteralUnion<BuiltInProviderType, string>,
		ClientSafeProvider
	> | null;
};

function LoginPage({ providers }: Props) {
	return (
		<div className='fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-50 w-2/5 bg-white rounded-lg p-5 drop-shadow-md'>
			<div className='flex flex-col gap-5 items-center'>
				<h1 className='font-bold text-black text-2xl'>
					Shoo, Pepping Toms
				</h1>
				{providers &&
					Object.values(providers).map((provider) => (
						<div key={provider.name}>
							<Button
								className='bg-black border-none'
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
			</div>
		</div>
	);
}

export default LoginPage;
