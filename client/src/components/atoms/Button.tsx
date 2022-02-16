import React from "react";
import { Button as MuiButton } from "@mui/material";
import { useTheme } from "@mui/styles";

interface Props {
  label: string;
  styles?: object;
  disabled: boolean;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

function Button({ label, styles = {}, disabled = false, onClick }: Props) {
  const getStyles = (): any => {
    const { color, backgroundImage }: any = useTheme();
    const boxShadow = "0 1px 2px 0 rgba(16,162,234,0.30)";

    return {
      height: "40px",
      boxShadow,
      backgroundImage,
      fontWeight: 900,
      fontSize: "16px",
      color,
      textTransform: "none",

      "&:disabled": {
        color,
        opacity: "0.5",
      },

      "&.MuiButtonBase-root:hover, &.MuiButton-root:hover": {
        boxShadow,
      },

      ...styles,
    };
  };

  return (
    <MuiButton
      variant="contained"
      sx={getStyles()}
      disabled={disabled}
      onClick={onClick}
    >
      {label}
    </MuiButton>
  );
}

export default Button;
