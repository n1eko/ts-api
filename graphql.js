const { ApolloServer } = require('apollo-server');
const typeDefs = require('./definitions/schema');
const resolvers = require('./definitions/resolvers');

const  startServer = async () => {
    const gqlServer = new ApolloServer({
        typeDefs,
        resolvers
      });
        
      gqlServer.listen().then(({ url }) => {
          console.log(`🚀 Server ready at ${url}`);
      });
    }

module.exports = startServer;
