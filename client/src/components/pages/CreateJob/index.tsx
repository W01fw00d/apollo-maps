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

  const [createJobMutation, createJobResult] = useMutation(JOB_MUTATION, {
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
    if (createJobResult.error) {
      setCreateJobState(null);
    } else if (createJobResult.data) {
      setCreateJobState(JobStatus.Succesful);
      setPickUpPositionsState({
        ...BLANK_POSITION_STATE,
      });
      setDropOffPositionsState({
        ...BLANK_POSITION_STATE,
      });

      setFormState({ ...BLANK_FORM_STATE });
    }
  }, [createJobResult.data]);

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
