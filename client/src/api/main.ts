// TODO: remove this file when it's not needed anymore

import {
  GeocodeAPIResponse,
  CreateJobAPIResponse,
} from "../interfaces/APIResponse";

import graphqlAPI from "../secrets/dev/graphqlAPI.json"; // TODO: handle error when url is 404 (Not Found)

async function graphqlRequest(query: string) {
  return await fetch(graphqlAPI.url, {
    method: "POST",
    body: JSON.stringify({ query }),
    headers: {
      "content-type": "application/json",
    },
  });
}

// TODO: use variables instead of inserting them on string template
export async function geocodeAddressRequest(
  address: string
): Promise<GeocodeAPIResponse> {
  const response = await graphqlRequest(
    `query GeocodeQuery{
        geocode(address: "${address}") {
          latitude,
          longitude
        }
      }`
  );

  return await response.json();
}

export async function createJobRequest(
  pickUp: string,
  dropOff: string
): Promise<CreateJobAPIResponse> {
  const response = await graphqlRequest(
    `mutation JobMutation{
      job(
        pickup: "${pickUp}",
        dropoff: "${dropOff}"
      ) {
        pickup {
          address,
          latitude,
          longitude,
        },
        dropoff {
          address,
          latitude,
          longitude,
        }
      }
    }`
  );

  return await response.json();
}
