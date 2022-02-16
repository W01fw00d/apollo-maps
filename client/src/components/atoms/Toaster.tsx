import React from "react";
import Snackbar from "@mui/material/Snackbar";
import { useTheme } from "@mui/styles";

interface Props {
  isOpen: boolean;
  message: string;
  close: Function;
}

function Toaster({ isOpen, message, close }: Props) {
  const { color, boxShadowColor }: any = useTheme();

  const defaultStyles = {
    "&.MuiSnackbar-root": {
      top: "32px",
      right: "32px",
    },
    "& .MuiPaper-root": {
      borderRadius: "8px",
      backgroundColor: "rgba(51,51,51,0.90)",
      boxShadow: `0 1px 2px 0 ${boxShadowColor}, 0 1px 8px 0 ${boxShadowColor}`,
      fontSize: "16px",
      color,
    },
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      open={isOpen}
      autoHideDuration={5000}
      onClose={(_, reason: string) => {
        if (reason === "timeout") {
          close();
        }
      }}
      onClick={() => {
        close();
      }}
      message={message}
      sx={defaultStyles}
    />
  );
}

export default Toaster;
