import gql from 'graphql-tag';

export const typeDefs = gql`
	type Query {
		getBlogs: [Blog!]!
		getBlog(id: ID!): Blog!
		userOne: User!
	}

	type Mutation {
		createBlog(input: BlogCreateInput!): Blog!
		deleteBlog(id: ID!): Blog!
		createUser(input: CreateUserInput!): CreateUserOutput!
		loginUser(input: LoginUserInput!): LoginUserOutput!
	}

	input BlogCreateInput {
		title: String!
		description: String
		body: String!
		topic: String!
		authorId: ID!
	}

	input CreateUserInput {
		name: String!
		email: String!
		password: String!
	}

	input LoginUserInput {
		email: String!
		password: String!
	}

	type CreateUserOutput {
		token: String!
		user: User!
	}
	type LoginUserOutput {
		token: String!
		user: User!
	}

	type Blog {
		id: String!
		title: String!
		description: String
		body: String!
		author: User!
		topic: String!
		createdAt: String!
	}

	type User {
		name: String!
		email: String!
		password: String!
	}
`;
