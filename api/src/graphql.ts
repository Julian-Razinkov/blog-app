import { Resolvers } from './types';
import { getBlogsResolver } from './graphql/getBlogsResolver';
import { createBlogResolver } from './graphql/createBlogResolver';
import { getBlogResolver } from './graphql/getBlogResovler';
import { userOneResolver } from './graphql/userOneResolver';
import { deleteBlogResovler } from './graphql/deleteBlogResovler';
import { createUserResolver } from './graphql/createUserResolver';
import { loginUserResolver } from './graphql/loginUserResolver';

export const resolvers: Resolvers = {
	Query: {
		getBlogs: getBlogsResolver,
		getBlog: getBlogResolver,
		userOne: userOneResolver,
	},
	Mutation: {
		createBlog: createBlogResolver,
		deleteBlog: deleteBlogResovler,
		createUser: createUserResolver,
		loginUser: loginUserResolver,
	},
};
