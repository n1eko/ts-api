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
    }

    type Channel  @cacheControl(maxAge: 30, scope: PUBLIC){
        name: String!
        capacity: Int!
        isSecured: Boolean!
    }
`;

module.exports = typeDefs;

