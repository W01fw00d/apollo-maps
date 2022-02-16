import { GeocodeStatus } from "./../enums/GeocodeStatus";

interface Geocode {
  lat: string;
  lng: string;
}

export interface PositionState {
  status: GeocodeStatus;
  geocode?: Geocode;
}
