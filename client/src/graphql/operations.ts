import { gql } from "@apollo/client";

export const GEOCODE_QUERY = gql`
  query GeocodeQuery($address: String!) {
    geocode(address: $address) {
      latitude
      longitude
    }
  }
`;

export const JOB_MUTATION = gql`
  mutation JobMutation($pickUp: String!, $dropOff: String!) {
    job(pickup: $pickUp, dropoff: $dropOff) {
      pickup {
        address
        latitude
        longitude
      }
      dropoff {
        address
        latitude
        longitude
      }
    }
  }
`;
