export { default } from 'next-auth/middleware';
export const config = { matcher: ['/admin', '/admin/about', '/admin/uploads', '/admin/skills', '/admin/uploads/edit', '/admin/uploads/edit/:slug*'] }