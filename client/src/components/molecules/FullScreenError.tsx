import React from "react";
import { styled } from "@mui/system";
import { useTheme } from "@mui/styles";

interface Props {
  title: React.ReactFragment;
  subtitle: React.ReactFragment;
}

const Background = styled("span")(() => {
  const { backgroundImage }: any = useTheme();

  return {
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexFlow: "column",
    backgroundImage,
  };
});

function FullScreenError({ title, subtitle }: Props) {
  return (
    <Background>
      <h1>{title}</h1>
      <h3>{subtitle}</h3>
    </Background>
  );
}

export default FullScreenError;
