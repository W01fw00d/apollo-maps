import React from "react";

import { FormState } from "../../interfaces/FormState";
import { PositionState } from "../../interfaces/PositionState";

import Toaster from "../atoms/Toaster";
import Background from "../atomsStyled/Background";
import AddressesForm from "../organisms/AddressesForm";
import Map from "../organisms/Map";

interface Props {
  formState: FormState;
  positionsState: { [key: string]: PositionState };
  createJobState: string | null;
  setPosition: Function;
  geocodeAddress: Function;
  createJob: Function;
  resetJobState: Function;
}

function CreateJobTemplate({
  formState,
  positionsState,
  createJobState,
  setPosition,
  geocodeAddress,
  createJob,
  resetJobState,
}: Props) {
  return (
    <Background>
      <Map positionsState={positionsState} />
      <AddressesForm
        styles={{
          position: "fixed",
          left: 0,
          top: 0,
        }}
        formState={formState}
        createJobState={createJobState}
        positionsState={positionsState}
        setPosition={setPosition}
        geocodeAddress={geocodeAddress}
        createJob={createJob}
      />
      <Toaster
        isOpen={createJobState === "successful"}
        message="Job has been created successfully!"
        close={resetJobState}
      />
    </Background>
  );
}

export default CreateJobTemplate;
