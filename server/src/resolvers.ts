const {
  geocodeAddressRequest,
  createJobRequest,
} = require("./mockedDatasource");

module.exports = {
  Query: {
    geocode: (_: any, { address }: any, __: any) => {
      // TODO: search and use apollo ts types instead of any
      return geocodeAddressRequest(address);
    },
  },

  Mutation: {
    job: (_: any, { pickup, dropoff }: any, __: any) => {
      return createJobRequest(pickup, dropoff);
    },
  },
};
