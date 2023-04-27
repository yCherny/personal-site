import LoginPage from './login-page';
import { ClientSafeProvider, getProviders, signIn } from 'next-auth/react';

export default async function Page() {
	const providers = await getProviders();
	return <LoginPage providers={providers} />;
}
