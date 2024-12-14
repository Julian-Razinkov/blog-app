import { MutationResolvers } from '../types';
import { prisma } from '../prisma';

export const deleteBlogResovler: MutationResolvers['deleteBlog'] = async (
	_,
	{ id }
) => {
	const blog = await prisma.blog.delete({
		where: {
			id,
		},
		include: {
			author: true,
		},
	});

	return { ...blog, createdAt: blog.createdAt.toISOString() };
};
