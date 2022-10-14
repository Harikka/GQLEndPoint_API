import { ApolloServer } from 'apollo-server';
import { resolvers } from './resolvers';
import typeDefs from './schema';

// load the type definitions and resolvers of the graphql
const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`?  Server ready at ${url}graphql`);
});
