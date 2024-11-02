import { Resolvers } from './types';
import { getBlogsResolver } from './graphql/getBlogsResolver';
import { createBlogResolver } from './graphql/createBlogResolver';
import { getBlogResolver } from './graphql/getBlogResovler';
import { userOneResolver } from './graphql/userOneResolver';
import { deleteBlogResovler } from './graphql/deleteBlogResovler';

export const resolvers: Resolvers = {
	Query: {
		getBlogs: getBlogsResolver,
		getBlog: getBlogResolver,
		userOne: userOneResolver,
	},
	Mutation: {
		createBlog: createBlogResolver,
		deleteBlog: deleteBlogResovler,
	},
};
