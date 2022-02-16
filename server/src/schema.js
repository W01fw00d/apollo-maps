const { gql } = require("apollo-server");

const typeDefs = gql`
  type Query {
    "Query to get location coordinates from an address"
    geocode(address: String!): Coordinates
  }

  type Mutation {
    "Mutation to create a job with the given pickup and dropoff addresses"
    job(pickup: String!, dropoff: String!): Journey!
  }

  "Journey data with pickup and dropoff locations"
  type Journey {
    pickup: Location!
    dropoff: Location!
  }

  "Location data with adress and coordinates"
  type Location {
    address: String!
    latitude: Float!
    longitude: Float!
  }

  "Location coordinates"
  type Coordinates {
    latitude: Float!
    longitude: Float!
  }
`;

module.exports = typeDefs;
