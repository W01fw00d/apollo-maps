import {
  Geocode,
  GeocodeAPIResponse,
  CreateJobAPIResponse,
} from "../../client/src/interfaces/APIResponse";

const { UserInputError } = require("apollo-server");

interface Positions {
  [key: string]: Geocode;
}

const POSITIONS: Positions = {
  // This map object contains the 2 current valid addresses
  pick: {
    // Real address: "29 Rue du 4 Septembre"
    latitude: 48.86985,
    longitude: 2.33457,
  },
  drop: {
    // Real address: "15 Rue de Bourgogne"
    latitude: 48.8590453,
    longitude: 2.3180404,
  },
};

function geocodeAddressRequest(address: string): any {
  const position = POSITIONS[address];

  if (!position) {
    throw new UserInputError(`"${address}" cannot be geocoded.`);
  }

  return position;
}

function createJobRequest(pickUp: string, dropOff: string): any {
  if (!POSITIONS[pickUp] || !POSITIONS[dropOff]) {
    throw new UserInputError('valids "pickup" and "dropoff" are required');
  }

  return {
    pickup: {
      ...POSITIONS[pickUp],
      address: pickUp,
    },
    dropoff: {
      ...POSITIONS[dropOff],
      address: dropOff,
    },
  };
}

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
