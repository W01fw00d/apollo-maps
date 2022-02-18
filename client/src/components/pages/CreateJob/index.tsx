import React, { useState, useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { useLazyQuery, useMutation } from "@apollo/client";

import { GeocodeStatus } from "../../../enums/GeocodeStatus";
import { JobStatus } from "../../../enums/JobStatus";
import { PositionState } from "../../../interfaces/PositionState";
import { FormState } from "../../../interfaces/FormState";
import theme from "../../themes/original";
import { GEOCODE_QUERY, JOB_MUTATION } from "../../../graphql/operations";

import CreateJobTemplate from "../../templates/CreateJob";

import { manageGeocodeState } from "./model";

function CreateJobPage() {
  const BLANK_POSITION_STATE: PositionState = { status: GeocodeStatus.Blank };
  const BLANK_FORM_STATE: FormState = { pickUp: "", dropOff: "" };
  /*   const CACHE_AND_NETWORK_FETCH_POLICY: any = {
    // TODO: this is a workaround to avoid data being cached and breaking a feature
    // The counterpart to this workaround is that we might be doing more API requests than needed.
    // https://stackoverflow.com/questions/58264413/how-to-execute-query-on-every-click-using-uselazyquery
    // https://github.com/apollographql/apollo-client/issues/9338
    // fetchPolicy: "cache-and-network",
  }; */

  const [pickUpPositionsState, setPickUpPositionsState] =
    useState<PositionState>({
      ...BLANK_POSITION_STATE,
    });
  const [dropOffPositionsState, setDropOffPositionsState] =
    useState<PositionState>({
      ...BLANK_POSITION_STATE,
    });

  const [formState, setFormState] = useState<FormState>({
    ...BLANK_FORM_STATE,
  });

  const [createJobState, setCreateJobState] = useState<JobStatus | null>(null);

  const [geocodeAddressQueryPickUp, pickUpGeocodeResult] = useLazyQuery(
    GEOCODE_QUERY
    /*     ,{
      ...CACHE_AND_NETWORK_FETCH_POLICY,
      ...getGeocodeCallbacks(setPickUpPositionsState),
    } */
  );
  const [geocodeAddressQueryDropOff, dropOffGeocodeResult] = useLazyQuery(
    GEOCODE_QUERY
    /*     ,{
      ...CACHE_AND_NETWORK_FETCH_POLICY,
      ...getGeocodeCallbacks(setDropOffPositionsState),
    } */
  );

  const geocodeAddressQueries: { [key: string]: Function } = {
    pickUp: geocodeAddressQueryPickUp,
    dropOff: geocodeAddressQueryDropOff,
  };
  const geocodeAddressResults: { [key: string]: any } = {
    pickUp: pickUpGeocodeResult,
    dropOff: dropOffGeocodeResult,
  };
  const setPositionsState: { [key: string]: Function } = {
    pickUp: setPickUpPositionsState,
    dropOff: setDropOffPositionsState,
  };

  const geocodeAddress = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const id = target.id;
    const address = target.value;

    if (address) {
      if (geocodeAddressResults[id]?.variables?.address === address) {
        // As the current address is already cached, use the cached geocode instead of calling API
        manageGeocodeState(geocodeAddressResults[id], setPositionsState[id]);
      } else {
        geocodeAddressQueries[id]({
          variables: {
            address,
          },
        });
      }
    } else {
      setPositionsState[id]({
        ...BLANK_POSITION_STATE,
      });
    }
  };

  const setStatesToBlank = () => {
    // TODO: Refactor iterate through setPositionsState object and set to Blank every property
    setPickUpPositionsState({
      ...BLANK_POSITION_STATE,
    });
    setDropOffPositionsState({
      ...BLANK_POSITION_STATE,
    });
    //
    setFormState({ ...BLANK_FORM_STATE });
  };

  const [createJobMutation] = useMutation(JOB_MUTATION, {
    onCompleted: (data) => {
      if (data) {
        setCreateJobState(JobStatus.Succesful);
        setStatesToBlank();
      }
    },
    onError: (error) => {
      // TODO: handle error displaying toaster with error message to user
      console.error({ error });
      setCreateJobState(null);
    },
  });

  const setForm = (id: string, value: string) => {
    setFormState((previousState) => ({
      ...previousState,
      [id]: value,
    }));
  };

  const createJob = () => {
    setCreateJobState(JobStatus.InProcess);

    const { pickUp, dropOff } = formState;
    createJobMutation({
      variables: {
        pickUp,
        dropOff,
      },
    });
  };

  useEffect(() => {
    manageGeocodeState(pickUpGeocodeResult, setPickUpPositionsState);
  }, [pickUpGeocodeResult.loading, pickUpGeocodeResult.data]);
  useEffect(() => {
    manageGeocodeState(dropOffGeocodeResult, setDropOffPositionsState);
  }, [dropOffGeocodeResult.data]);

  return (
    <ThemeProvider theme={theme}>
      {/* TODO: Try to add an alternative theme, maybe dark mode? */}
      <CreateJobTemplate
        formState={formState}
        positionsState={{
          pickUp: pickUpPositionsState,
          dropOff: dropOffPositionsState,
        }}
        createJobState={createJobState}
        setPosition={setForm}
        geocodeAddress={geocodeAddress}
        createJob={createJob}
        resetJobState={() => setCreateJobState(null)}
      />
    </ThemeProvider>
  );
}

export default CreateJobPage;
