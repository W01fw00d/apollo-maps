import { GeocodeStatus } from "../../../enums/GeocodeStatus";

export const manageGeocodeState = (
  result: any /* TODO: add correct type */,
  setState: Function
) => {
  console.log({ result }); // TODO: remove
  const { loading, data, error } = result;

  if (!loading && data) {
    const geocode = data.geocode;
    if (geocode) {
      const { latitude, longitude } = geocode;
      setState({
        status: GeocodeStatus.Present,
        geocode: {
          lat: latitude,
          lng: longitude,
        },
      });
    } else if (error) {
      setState({
        status: GeocodeStatus.Error,
      });
    }
  }
};
