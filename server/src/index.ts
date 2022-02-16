const { ApolloServer } = require("apollo-server");
const typeDefs = require("./schema");

const mocks = {
  Query: () => ({
    geocode: () => ({
      latitude: 48.86985,
      longitude: 2.33457,
    }),
  }),

  Mutation: () => ({
    job: () => ({
      pickup: {
        address: "Fake Address",
        latitude: 48.86985,
        longitude: 2.33457,
      },
      dropoff: {
        address: "Fake Address",
        latitude: 48.86985,
        longitude: 2.33457,
      },
    }),
  }),
};

const server = new ApolloServer({
  typeDefs,
  mocks,
});

server.listen().then(() => {
  console.log(`
    🚀  Server is running!
    🔉  Listening on port 4000
    📭  Query at https://studio.apollographql.com/dev
`);
});
