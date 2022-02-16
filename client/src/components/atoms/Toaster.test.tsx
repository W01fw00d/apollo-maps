/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, screen } from "@testing-library/react";

import Toaster from "./Toaster";

describe("Toaster", () => {
  test("Displays Toaster text", () => {
    render(
      <Toaster isOpen={true} message="This is a Toaster" close={() => {}} />
    );

    expect(screen.getByText("This is a Toaster")).toBeInTheDocument();
  });
});
