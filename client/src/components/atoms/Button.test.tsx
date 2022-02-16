/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "@mui/material/styles";

import theme from "../themes/original";
import Button from "./Button";

describe("Button", () => {
  test("Displays Button label", () => {
    render(
      <ThemeProvider theme={theme}>
        <Button label="This is a button" disabled={false} onClick={() => {}} />
      </ThemeProvider>
    );

    expect(screen.getByText("This is a button")).toBeInTheDocument();
  });
});
