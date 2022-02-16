/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "@mui/material/styles";

import theme from "../themes/original";
import Toaster from "./Toaster";

describe("Toaster", () => {
  test("Displays Toaster text", () => {
    render(
      <ThemeProvider theme={theme}>
        <Toaster isOpen={true} message="This is a Toaster" close={() => {}} />
      </ThemeProvider>
    );

    expect(screen.getByText("This is a Toaster")).toBeInTheDocument();
  });
});
