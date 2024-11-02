import { MutationResolvers } from '../types';
import { prisma } from '../prisma';

//TODO: create a Lazy wrapper that fetches only requested field
//TODO: create toBlogSchema mapper
export const createBlogResolver: MutationResolvers['createBlog'] = async (
	_,
	{ input }
) => {
	const blog = await prisma.blog.create({
		data: {
			body: input.body,
			title: input.title,
			description: input.description,
			topic: input.topic,
			authorId: 'f9dda0c1-5370-485a-8875-2ce0e1d0977e',
		},
	});

	const author = await prisma.user.findUniqueOrThrow({
		where: {
			id: 'f9dda0c1-5370-485a-8875-2ce0e1d0977e',
		},
	});

	return {
		id: blog.id,
		body: blog.body,
		title: blog.title,
		description: blog.description,
		topic: blog.topic,
		createdAt: blog.createdAt.toISOString(),
		author: {
			id: author.id,
			email: author.email,
			name: author.name,
		},
	};
};
