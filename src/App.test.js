import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("testing addition", () => {
  render(<App />);
  expect(screen.getByText("Hello")).toBeInTheDocument();
});
