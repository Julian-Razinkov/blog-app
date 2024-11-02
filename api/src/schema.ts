import gql from 'graphql-tag';

export const typeDefs = gql`
	type Query {
		getBlogs: [Blog!]!
		getBlog(id: ID!): Blog!
		userOne(id: ID!): User!
	}

	type Mutation {
		createBlog(input: BlogCreateInput!): Blog!
		deleteBlog(id: ID!): Blog!
	}

	input BlogCreateInput {
		title: String!
		description: String
		body: String!
		topic: String!
		authorId: ID!
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
