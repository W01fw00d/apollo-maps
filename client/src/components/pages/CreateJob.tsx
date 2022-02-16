import React, { useState } from "react";
import { ThemeProvider } from "@mui/material/styles";

import { geocodeAddressRequest, createJobRequest } from "../../api/main";

import { GeocodeStatus } from "../../enums/GeocodeStatus";
import { JobStatus } from "../../enums/JobStatus";
import { PositionState } from "../../interfaces/PositionState";
import { FormState } from "../../interfaces/FormState";
import theme from "../themes/original";

import CreateJobTemplate from "../templates/CreateJob";

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

  const BLANK_FORM_STATE: FormState = { pickUp: "", dropOff: "" };

  const [formState, setFormState] = useState<FormState>({
    ...BLANK_FORM_STATE,
  });

  const [createJobState, setCreateJobState] = useState<JobStatus | null>(null);

  const resetJobState = () => {
    setCreateJobState(null);
  };

  const setForm = (id: string, value: string) => {
    setFormState((previousState) => ({
      ...previousState,
      [id]: value,
    }));
  };

  const geocodeAddress = async ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    const id = target.id;
    const value = target.value;

    if (value) {
      const result = await geocodeAddressRequest(target.value);
      const geocode = result.data.geocode;

      if (result.errors || !geocode) {
        setPositionsState[id]({
          status: GeocodeStatus.Error,
        });
      } else {
        setPositionsState[id]({
          status: GeocodeStatus.Present,
          geocode: {
            lat: geocode.latitude,
            lng: geocode.longitude,
          },
        });
      }
    } else {
      setPositionsState[id]({
        ...BLANK_POSITION_STATE,
      });
    }
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
        resetJobState={resetJobState}
      />
    </ThemeProvider>
  );
}

export default CreateJobPage;
