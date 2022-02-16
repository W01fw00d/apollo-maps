/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, screen } from "@testing-library/react";

import TextInput from "./TextInput";

describe("TextInput", () => {
  test("Displays TextInput value", () => {
    render(
      <TextInput
        id="text-input"
        placeholder={"This is the placeholder"}
        value="This is a TextInput"
        onChange={() => {}}
        geocodeAddress={() => {}}
      />
    );

    expect(screen.getByDisplayValue("This is a TextInput")).toBeInTheDocument();
  });
});
