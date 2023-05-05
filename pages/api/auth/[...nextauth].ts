import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions: NextAuthOptions = {
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID as string,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
		}),
	],
	callbacks: {
		session({ session, token, user }) {
			return session;
		},
		async jwt({ token }) {
			token.userRole = 'admin';
			return token;
		},
	},
	secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
