import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from './schema';
import { resolvers } from './graphql';
import { FakeApi } from './datasources/fakeApi';
import { DataSourceContext } from './context';

const startServer = async () => {
	const server = new ApolloServer({
		typeDefs,
		resolvers,
	});

	const { url } = await startStandaloneServer(server, {
		// The context that is passed here should be created and connected in the codegenConfig and also should be created
		context: async ({ req, res }) => {
			const { cache } = server;

			res.setHeader('Access-Control-Allow-Origin', '*'); // Allow all origins
			res.setHeader(
				'Access-Control-Allow-Methods',
				'GET, POST, PUT, DELETE, OPTIONS'
			); // Allow methods
			res.setHeader(
				'Access-Control-Allow-Headers',
				'Content-Type, Authorization'
			); // Allow headers

			return {
				dataSources: {
					userID: 'test',
				},
			};
		},
	});

	console.log(`Server is listening on ${url}`);
};

startServer();
