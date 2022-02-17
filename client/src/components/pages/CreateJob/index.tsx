import React, { useState, useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { useLazyQuery } from "@apollo/client";

import { geocodeAddressRequest, createJobRequest } from "../../../api/main";

import { GeocodeStatus } from "../../../enums/GeocodeStatus";
import { JobStatus } from "../../../enums/JobStatus";
import { PositionState } from "../../../interfaces/PositionState";
import { FormState } from "../../../interfaces/FormState";
import theme from "../../themes/original";

import CreateJobTemplate from "../../templates/CreateJob";

import { GEOCODE_QUERY } from "../../../graphql/operations";

import { manageGeocodeState } from "./model";

function CreateJobPage() {
  const BLANK_POSITION_STATE: PositionState = { status: GeocodeStatus.Blank };

  const [pickUpPositionsState, setPickUpPositionsState] =
    useState<PositionState>({
      ...BLANK_POSITION_STATE,
    });

  const [dropOffPositionsState, setDropOffPositionsState] =
    useState<PositionState>({
      ...BLANK_POSITION_STATE,
    });

  const positionsState = {
    pickUp: pickUpPositionsState,
    dropOff: dropOffPositionsState,
  };

  const setPositionsState: { [key: string]: Function } = {
    pickUp: setPickUpPositionsState,
    dropOff: setDropOffPositionsState,
  };

  // ----------------------- GEOCODE -----------------------

  const [geocodeAddressQueryPickUp, pickUpResult] = useLazyQuery(GEOCODE_QUERY);
  const [geocodeAddressQueryDropOff, dropOffResult] =
    useLazyQuery(GEOCODE_QUERY);

  useEffect(() => {
    manageGeocodeState(pickUpResult, setPickUpPositionsState);
  }, [pickUpResult.data]);

  useEffect(() => {
    manageGeocodeState(dropOffResult, setDropOffPositionsState);
  }, [dropOffResult.data]);

  const geocodeAddressQueries: { [key: string]: Function } = {
    pickUp: geocodeAddressQueryPickUp,
    dropOff: geocodeAddressQueryDropOff,
  };

  const geocodeAddress = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const id = target.id;
    const address = target.value;

    if (address) {
      geocodeAddressQueries[id]({
        variables: {
          address,
        },
      });
    } else {
      setPositionsState[id]({
        ...BLANK_POSITION_STATE,
      });
    }
  };

  // ----------------------- FORM -----------------------

  const BLANK_FORM_STATE: FormState = { pickUp: "", dropOff: "" };

  const [formState, setFormState] = useState<FormState>({
    ...BLANK_FORM_STATE,
  });

  const [createJobState, setCreateJobState] = useState<JobStatus | null>(null);

  const setForm = (id: string, value: string) => {
    setFormState((previousState) => ({
      ...previousState,
      [id]: value,
    }));
  };

  const createJob = async () => {
    setCreateJobState(JobStatus.InProcess);
    const result = await createJobRequest(formState.pickUp, formState.dropOff);

    if (result.errors) {
      setCreateJobState(null);
    } else {
      setCreateJobState(JobStatus.Succesful);
      setPickUpPositionsState({
        ...BLANK_POSITION_STATE,
      });
      setDropOffPositionsState({
        ...BLANK_POSITION_STATE,
      });

      setFormState({ ...BLANK_FORM_STATE });
    }
  };

  return (
    <ThemeProvider theme={theme}>
      {/* TODO: Try to add an alternative theme, maybe dark mode? */}
      <CreateJobTemplate
        formState={formState}
        positionsState={positionsState}
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
