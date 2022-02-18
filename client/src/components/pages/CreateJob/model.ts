import { GeocodeStatus } from "../../../enums/GeocodeStatus";

/* export const getGeocodeCallbacks = (setState: Function) => ({
  // Using these callbacks, we can avoid using useEffect for updating the state after API requests

  onCompleted: (data: any) => {  // TODO: add correct type
    console.log("onCompleted", { data });

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
    }
  },
  onError: (error: any) => {
    console.log("onError", { error });

    setState({
      status: GeocodeStatus.Error,
    });
  },
}); */

export const manageGeocodeState = (
  result: any /* TODO: add correct type */,
  setState: Function
) => {
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
