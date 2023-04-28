import LoginPage from './login-page';
import {
	ClientSafeProvider,
	getProviders,
	LiteralUnion,
} from 'next-auth/react';
import { BuiltInProviderType } from 'next-auth/providers';

export default async function Page() {
	const providers: Record<
		LiteralUnion<BuiltInProviderType, string>,
		ClientSafeProvider
	> | null = await getProviders();
	return <LoginPage providers={providers} />;
}
