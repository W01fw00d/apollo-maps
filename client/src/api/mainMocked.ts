// TODO: delete this file, move the logic to the server API mocks

import {
  Geocode,
  GeocodeAPIResponse,
  CreateJobAPIResponse,
} from "../interfaces/APIResponse";

// Mocked functions for testing during development process, avoiding real API requests

interface Positions {
  [key: string]: Geocode;
}

const POSITIONS: Positions = {
  pick: {
    latitude: 48.86985,
    longitude: 2.33457,
  },
  drop: {
    latitude: 48.85908,
    longitude: 2.31804,
  },
};

export async function geocodeAddressRequest(
  address: string
): Promise<GeocodeAPIResponse> {
  const position = POSITIONS[address];

  const result = position
    ? {
        data: { geocode: { ...position } },
      }
    : {
        data: { geocode: null },
        errors: [
          {
            message: `"${address}" cannot be geocoded.`,
            locations: [
              {
                line: 1,
                column: 1,
              },
            ],
            path: ["geocode"],
            extensions: {
              code: "GEOCODE_ERROR",
            },
          },
        ],
      };

  return await result;
}

export async function createJobRequest(
  pickUp: string,
  dropOff: string
): Promise<CreateJobAPIResponse> {
  const result =
    POSITIONS[pickUp] && POSITIONS[dropOff]
      ? {
          data: {
            job: {
              pickup: {
                ...POSITIONS[pickUp],
                address: pickUp,
              },
              dropoff: {
                ...POSITIONS[dropOff],
                address: dropOff,
              },
            },
          },
        }
      : {
          data: {
            job: null,
          },
          errors: [
            {
              message: '"pickup" and "dropoff" are required',
              locations: [
                {
                  line: 1,
                  column: 1,
                },
              ],
              path: ["job"],
              extensions: {
                code: "JOB_ERROR",
              },
            },
          ],
        };

  return await result;
}
