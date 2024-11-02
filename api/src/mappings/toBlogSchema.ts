import { Blog } from '@prisma/client';
import { Blog as gqlBlog } from '../types';
import { prisma } from '../prisma';

//TODO: Find out how to write mappers for gql types
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
