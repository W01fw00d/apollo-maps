import React, { useState, useEffect, useRef } from "react";

import FullScreenError from "../molecules/FullScreenError";

import { MapScriptStatus } from "../../enums/MapScriptStatus";
import { PositionState } from "../../interfaces/PositionState";

import github from "../../secrets/prod/github.json";
// import googleMapsAPI from "../../secrets/googleMapsAPI.json";
import googleMapsAPI from "../../secrets/dev/googleMapsAPI.json";

interface Props {
  positionsState: { [key: string]: PositionState };
}

function Map({ positionsState }: Props) {
  const mapElement = useRef<any>();
  const markerElements = useRef<any>({
    pickUp: null,
    dropOff: null,
  });

  const [mapScriptStatus, setMapScriptStatus] = useState(
    MapScriptStatus.Unloaded
  );

  window.gm_authFailure = () => {
    // This is executed when Google Maps API throws a Authentication error
    // We presume here that the error is caused by missing a valid "key" param
    setMapScriptStatus(MapScriptStatus.Error);
  };

  window.mapScriptCallback = () => {
    setMapScriptStatus(MapScriptStatus.Loaded);
  };

  useEffect(() => {
    const createGoogleMapsScript = () => {
      const script = document.createElement("script");
      script.src = `${googleMapsAPI.url}?key=${googleMapsAPI.key}&callback=mapScriptCallback`;
      script.defer = true;

      document.head.appendChild(script);
    };

    createGoogleMapsScript();
  }, []);

  useEffect(() => {
    const CENTER_POSITION = {
      address: "Place De La Concorde",
      lat: 48.865551,
      lng: 2.32079,
    };

    if (mapScriptStatus === MapScriptStatus.Loaded) {
      mapElement.current = new window.google.maps.Map(
        document.getElementById("map"),
        {
          center: { lat: CENTER_POSITION.lat, lng: CENTER_POSITION.lng },
          zoom: 15,
          disableDefaultUI: true,
        }
      );
    }
  }, [mapScriptStatus]);

  useEffect(() => {
    const removeMarker = (marker: any) => marker.setMap(null);

    const updateMarker = (marker: string) => {
      const geocode = positionsState[marker].geocode;

      if (geocode) {
        if (!markerElements.current[marker]) {
          markerElements.current = {
            ...markerElements.current,
            [marker]: new google.maps.Marker({
              position: {
                lat: geocode.lat,
                lng: geocode.lng,
              },
              // TODO: replace the .svg markers by open source ones
              icon: `src/assets/${[marker]}Marker.svg`,
              map: mapElement.current,
            }),
          };
        }
      } else if (markerElements.current[marker]) {
        removeMarker(markerElements.current[marker]);
        markerElements.current = { ...markerElements.current, [marker]: null };
      }
    };

    if (mapScriptStatus === MapScriptStatus.Loaded) {
      updateMarker("pickUp");
      updateMarker("dropOff");
    }
  }, [positionsState]);

  const isProd = false; /* TODO: apply environment logic to define this var */
  const prodSubtitle = (
    <>
      <span>Ups. Apologies. Please </span>
      <a href={github.repositoryIssues} target="_blank">
        inform the Web Page Maintainer
      </a>
    </>
  );
  const devSubtitle = (
    <>
      <span>Did you set your "googleMapsAPI.json.key"?</span>
      <br />
      <span>Check the "README.md" for more details</span>
    </>
  );

  return mapScriptStatus === MapScriptStatus.Error ? (
    <FullScreenError
      title="Cannot display 'Google Maps'"
      subtitle={isProd ? prodSubtitle : devSubtitle}
    />
  ) : (
    <div
      style={{
        width: "100%",
        height: "100%",
      }}
      id="map"
    />
  );
}

export default Map;
