import { gql } from 'apollo-server';

const typeDefs = gql`
  type ShortestPath {
    id: ID!
    name: String!
    distance: Int
    country: String!
    latitude: String!
    longitude: String!
  }

  type ReadCountryData {
    id: ID!
    name: String!
    country: String!
  }

  type Query {
    readShortestPath(id: String!): [ShortestPath!]!
    readCountryInfo: [ReadCountryData]!
  }
`;

export default typeDefs;
