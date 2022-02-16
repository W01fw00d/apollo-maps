import {
  GeocodeAPIResponse,
  CreateJobAPIResponse,
} from "../interfaces/APIResponse";

// import graphqlAPI from "../secrets/graphqlAPI.json";
import graphqlAPI from "../secrets/graphqlAPIExample.json"; // TODO: handle error when url is 404 (Not Found)

async function graphqlRequest(query: string) {
  return await fetch(graphqlAPI.url, {
    method: "POST",
    body: JSON.stringify({ query }),
    headers: {
      "content-type": "application/json",
    },
  });
}

export async function geocodeAddressRequest(
  address: string
): Promise<GeocodeAPIResponse> {
  const response = await graphqlRequest(
    `query {
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
    `mutation {
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
