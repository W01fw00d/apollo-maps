import React from "react";
import Box from "@mui/material/Box";

import TextInput from "../atoms/TextInput";
import IconImage from "../atomsStyled/IconImage";

interface Props {
  iconPath: string;
  alt: string;
  id: string;
  placeholder: string;
  styles: object;
  value: string;
  onChange: Function;
  geocodeAddress: Function;
}

function IconTextInput({
  iconPath,
  alt,
  id,
  placeholder,
  styles = {},
  value,
  onChange,
  geocodeAddress,
}: Props) {
  return (
    <Box sx={{ display: "flex", alignItems: "flex-end", ...styles }}>
      <IconImage src={iconPath} alt={alt} />
      <TextInput
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        geocodeAddress={geocodeAddress}
      />
    </Box>
  );
}

export default IconTextInput;
