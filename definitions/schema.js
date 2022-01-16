const {gql} = require('apollo-server');


const typeDefs = gql`

    enum CacheControlScope {
        PUBLIC
        PRIVATE
    }

    directive @cacheControl(
        maxAge: Int
        scope: CacheControlScope
        inheritMaxAge: Boolean
    ) on FIELD_DEFINITION | OBJECT | INTERFACE | UNION

    type Client {
        id: ID!
        name: String!
        channel: Channel!
        platform: String!
        isMuted: Boolean!
        country: String!
    }

    type Query {
        clients: [Client]!
        channels: [Channel]!
        server: Server!
    }

    type Channel{
        name: String!
        capacity: Int!
        isSecured: Boolean!
    }

    type Server{
        id: ID!
        name: String!
        status: String!
        platform: String!
        version: String!
        maxClients: Int!
        clientsOnline: Int!
        uptime: Int!
        averagePing: Float!
        totalClientConnections: Int!
        totalBytesSent: Float!
        totalBytesReceived: Float!
    }
`;

module.exports = typeDefs;

