import React, { useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { useLazyQuery, useMutation } from "@apollo/client";

import { GeocodeStatus } from "../../../enums/GeocodeStatus";
import { JobStatus } from "../../../enums/JobStatus";
import { PositionState } from "../../../interfaces/PositionState";
import { FormState } from "../../../interfaces/FormState";
import theme from "../../themes/original";
import { GEOCODE_QUERY, JOB_MUTATION } from "../../../graphql/operations";

import CreateJobTemplate from "../../templates/CreateJob";

import { getGeocodeCallbacks } from "./model";

function CreateJobPage() {
  const BLANK_POSITION_STATE: PositionState = { status: GeocodeStatus.Blank };
  const BLANK_FORM_STATE: FormState = { pickUp: "", dropOff: "" };
  const CACHE_AND_NETWORK_FETCH_POLICY: any = {
    /* TODO: this is a workaround to avoid data being cached
    and breaking the geocode feature after succesful job creation
    (if you type again the same valid address after input has been emptied, the API won't be called,
    and neither the callbacks will be; because the previous result is still cached)
    The counterpart to this workaround is that we might be doing more API requests than needed.
    * Better solution idea: instead of callbacks,
    use the useLazyQuery.options argument to get options.data and options.error
    and check any changes on them using a React.useEffect()
    * More details about the issue:
    https://stackoverflow.com/questions/58264413/how-to-execute-query-on-every-click-using-uselazyquery
    https://github.com/apollographql/apollo-client/issues/9338
    */
    fetchPolicy: "cache-and-network",
  };

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

  const [geocodeAddressQueryPickUp] = useLazyQuery(GEOCODE_QUERY, {
    ...CACHE_AND_NETWORK_FETCH_POLICY,
    ...getGeocodeCallbacks(setPickUpPositionsState),
  });
  const [geocodeAddressQueryDropOff] = useLazyQuery(GEOCODE_QUERY, {
    ...CACHE_AND_NETWORK_FETCH_POLICY,
    ...getGeocodeCallbacks(setDropOffPositionsState),
  });

  const geocodeAddressQueries: { [key: string]: Function } = {
    pickUp: geocodeAddressQueryPickUp,
    dropOff: geocodeAddressQueryDropOff,
  };
  const setPositionsState: { [key: string]: Function } = {
    pickUp: setPickUpPositionsState,
    dropOff: setDropOffPositionsState,
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
