import { withAuth } from 'next-auth/middleware';

export default withAuth({
	callbacks: {
		authorized({ req, token }) {
			if (req.nextUrl.pathname === '/admin') {
				return token?.userRole === 'admin';
			}

			return !!token;
		},
	},
	pages: {
		signIn: '/admin',
	},
});

export const config = {
	matcher: [
		'/admin',
		'/admin/about',
		'/admin/uploads',
		'/admin/skills',
		'/admin/uploads/edit',
		'/admin/uploads/edit/:slug*',
	],
};
