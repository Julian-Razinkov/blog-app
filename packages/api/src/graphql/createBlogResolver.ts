import { MutationResolvers } from '../types';
import { prisma } from '../prisma';
import { InvocationContext } from '../context';

//TODO: create a Lazy wrapper that fetches only requested field
//TODO: create toBlogSchema mapper
export const createBlogResolver: MutationResolvers['createBlog'] = async (
	_,
	{ input },
	{ user }: InvocationContext
) => {
	if (!user) throw new Error('Auth failed');

	const blog = await prisma.blog.create({
		data: {
			body: input.body,
			title: input.title,
			description: input.description,
			topic: input.topic,
			authorId: user.id,
		},
	});

	const author = await prisma.user.findUniqueOrThrow({
		where: {
			id: user.id,
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
