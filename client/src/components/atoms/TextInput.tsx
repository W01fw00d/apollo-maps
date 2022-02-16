import React, { useRef } from "react";
import { Input as MuiInput } from "@mui/material";

interface Props {
  id: string;
  placeholder: string;
  value: string;
  onChange: Function;
  geocodeAddress: Function;
}

function TextInput({
  id,
  placeholder,
  value,
  onChange,
  geocodeAddress, // TODO: this component is not really reusable. This name is not generic
}: // And all the debounce feature should be independent, maybe I can create a higher component
// that encapsulates this one or similar input components and gives them the debounce feature!
Props) {
  const timeout = useRef<any>();

  const styles = {
    borderRadius: "4px",
    // TODO: move margins pxs common sizes to a common file, 32px, 16px and 8px...
    height: "32px",
    background: "#F0F3F7",

    fontSize: "15px",
    color: "#252525",
    padding: "4px 5px 5px",

    width: "100%",

    "&::placeholder": {
      color: "#8596A6",
    },

    "&.MuiInputBase-root.MuiInput-root:before, &.MuiInputBase-root.MuiInput-root:after":
      {
        borderBottom: "none",
      },
  };

  return (
    <MuiInput
      id={id}
      placeholder={placeholder}
      sx={styles}
      value={value}
      onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(event);

        clearTimeout(timeout.current);
        timeout.current = setTimeout(() => {
          geocodeAddress(event);
        }, 1500);
      }}
      onBlur={(event: React.FocusEvent<HTMLInputElement>) => {
        clearTimeout(timeout.current);
        geocodeAddress(event);
      }}
    />
  );
}

export default TextInput;
