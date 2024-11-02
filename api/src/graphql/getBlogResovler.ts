import { QueryResolvers } from '../types';
import { prisma } from '../prisma';

export const getBlogResolver: QueryResolvers['getBlog'] = async (_, { id }) => {
	const blog = await prisma.blog.findUniqueOrThrow({
		where: {
			id,
		},
		include: {
			author: true,
		},
	});

	return { ...blog, createdAt: blog.createdAt.toISOString() };
};
