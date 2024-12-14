import { Blog } from '@prisma/client';

//TODO: Rewrite
export const toBlogSchema = (blog: Blog) => {
	return {
		__typename: 'Blog' as const,
		id: blog.id,
		title: blog.title,
		description: blog.description,
		body: blog.body,
		topic: blog.topic,
		author: async () => {
			return {
				__typename: 'User' as const,
				email: 'Test',
				name: 'Test',
				password: 'test',
			};
		},
	};
};
