import { prisma } from '../prisma';
import { QueryResolvers } from '../types';

export const getBlogsResolver: QueryResolvers['getBlogs'] = async (
	parent,
	args,
	context,
	info
) => {
	const blogs = await prisma.blog.findMany();

	return blogs.map((blog) => ({
		id: blog.id,
		title: blog.title,
		description: blog.description,
		body: blog.body,
		topic: blog.topic,
		createdAt: blog.createdAt.toISOString(),
		author: {
			name: 'Test',
			email: 'Test@test.com',
			password: '123',
		},
	}));
};
