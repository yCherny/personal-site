import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions: NextAuthOptions = {
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_ID as string,
			clientSecret: process.env.GOOGLE_SECRET as string,
			profile(profile) {
				return {
					id: profile.sub,
					email: profile.email,
					image: profile.picture,
					name: profile.name,
				};
			},
		}),
	],
	pages: {
		signIn: '/admin',
	},
	callbacks: {
		async jwt({ token }) {
			token.userRole = 'admin';
			console.log(`Token: ${JSON.stringify(token)}`);

			return token;
		},
		async session({ session, token }) {
			console.log(`Token: ${JSON.stringify(token)}`);

			console.log(`User: ${JSON.stringify(session)}`);

			return session;
		},
		signIn({ user, account, profile }) {
			console.log(JSON.stringify(user));
			console.log(JSON.stringify(account));
			console.log(JSON.stringify(profile));

			return Promise.resolve(true);
		},
	},
	session: {
		strategy: 'jwt',
	},
	secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
