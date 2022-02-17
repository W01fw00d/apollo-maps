import { gql } from "@apollo/client";

export const GEOCODE_QUERY = gql`
  query GeocodeQuery($address: String!) {
    geocode(address: $address) {
      latitude
      longitude
    }
  }
`;
