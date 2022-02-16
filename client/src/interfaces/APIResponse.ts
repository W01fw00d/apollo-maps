// TODO: currently, these interfaces are being used by both client and server
// When we addopt Apollo Client instead of `fetch`, maybe we can move them to the server only

interface ErrorLocation {
  line: number;
  column: number;
}

interface ErrorExtension {
  code: string;
}

interface Error {
  message: string;
  locations: ErrorLocation[];
  path: string[];
  extensions: ErrorExtension;
}

export interface Geocode {
  latitude: number;
  longitude: number;
}

interface GeocodeData {
  geocode: Geocode | null;
}

export interface GeocodeAPIResponse {
  data: GeocodeData;
  errors?: Error[];
}

interface Job {
  address: string;
  latitude: number;
  longitude: number;
}

export interface JobData {
  pickup: Job;
  dropoff: Job;
}

interface CreateJobData {
  job: JobData | null;
}

export interface CreateJobAPIResponse {
  data: CreateJobData;
  errors?: Error[];
}
