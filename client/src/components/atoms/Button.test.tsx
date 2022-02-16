/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, screen } from "@testing-library/react";

import Button from "./Button";

describe("Button", () => {
  test("Displays Button label", () => {
    render(
      <Button label="This is a button" disabled={false} onClick={() => {}} />
    );

    expect(screen.getByText("This is a button")).toBeInTheDocument();
  });
});
