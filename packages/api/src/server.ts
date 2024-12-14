import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from './schema';
import { resolvers } from './graphql';
import { getUserByToken } from './helpers/auth';
import { config } from 'dotenv';

const startServer = async () => {
	config();

	const server = new ApolloServer({
		typeDefs,
		resolvers,
	});

	const { url } = await startStandaloneServer(server, {
		// The context that is passed here should be created and connected in the codegenConfig and also should be created
		context: async ({ req, res }) => {
			res.setHeader('Access-Control-Allow-Origin', '*');
			res.setHeader(
				'Access-Control-Allow-Methods',
				'GET, POST, PUT, DELETE, OPTIONS'
			);
			res.setHeader(
				'Access-Control-Allow-Headers',
				'Content-Type, Authorization'
			);
			const token = req.headers.authorization || '';
			let user = null;
			try {
				user = await getUserByToken(token);
			} catch (error) {}

			return {
				user,
			};
		},
	});

	console.log(`Server is listening on ${url}`);
};

startServer();
