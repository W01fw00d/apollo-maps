import React from "react";

import { FormState } from "../../interfaces/FormState";
import { PositionState } from "../../interfaces/PositionState";
import { GeocodeStatus } from "../../enums/GeocodeStatus";

import Button from "../atoms/Button";
import FormBox from "../atomsStyled/FormBox";
import IconTextInput from "../molecules/IconTextInput";

interface AddressesFormProps {
  styles: object;
  formState: FormState;
  createJobState: string | null;
  positionsState: { [key: string]: PositionState };
  setPosition: Function;
  geocodeAddress: Function;
  createJob: Function;
}

interface InputProps {
  id: string;
  label: string;
  formState: { [key: string]: string };
  positionsState: { [key: string]: PositionState };
  setPosition: Function;
  geocodeAddress: Function;
}

interface IconsPaths {
  [key: string]: { [key: string]: string };
}

const ICONS_PATH_TEMPLATE = (file: string) => `src/assets/${file}.svg`;
const ICONS_PATHS: IconsPaths = {
  // TODO: replace the .svg icons by open source ones
  pickUp: {
    blank: ICONS_PATH_TEMPLATE("pickUpBadgeBlank"),
    present: ICONS_PATH_TEMPLATE("pickUpBadgePresent"),
    error: ICONS_PATH_TEMPLATE("pickUpBadgeError"),
  },
  dropOff: {
    blank: ICONS_PATH_TEMPLATE("dropOffBadgeBlank"),
    present: ICONS_PATH_TEMPLATE("dropOffBadgePresent"),
    error: ICONS_PATH_TEMPLATE("dropOffBadgeError"),
  },
};

const Input = ({
  id,
  label,
  formState,
  positionsState,
  setPosition,
  geocodeAddress,
}: InputProps) => (
  <IconTextInput
    id={id}
    iconPath={ICONS_PATHS[id][positionsState[id].status]}
    alt={`${label} badge with grey background`}
    placeholder={`${label} address`}
    styles={{ marginBottom: "16px" }}
    value={formState[id]}
    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
      setPosition(id, event.target.value);
    }}
    geocodeAddress={geocodeAddress}
  />
);

function AddressesForm({
  styles,
  formState,
  createJobState,
  positionsState,
  setPosition,
  geocodeAddress,
  createJob,
}: AddressesFormProps) {
  return (
    <FormBox style={styles}>
      <Input
        id="pickUp"
        label="Pick Up"
        formState={formState}
        positionsState={positionsState}
        setPosition={setPosition}
        geocodeAddress={geocodeAddress}
      />
      <Input
        id="dropOff"
        label="Drop Off"
        formState={formState}
        positionsState={positionsState}
        setPosition={setPosition}
        geocodeAddress={geocodeAddress}
      />
      <Button
        label={createJobState === "inProcess" ? "Creating..." : "Create job"}
        styles={{ width: "360px", alignSelf: "flex-end" }}
        disabled={
          createJobState === "inProcess" ||
          positionsState.pickUp.status !== GeocodeStatus.Present ||
          positionsState.dropOff.status !== GeocodeStatus.Present
        }
        onClick={() => {
          createJob();
        }}
      />
    </FormBox>
  );
}

export default AddressesForm;
