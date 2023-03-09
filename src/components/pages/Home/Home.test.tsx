import React from "react";
import { render, screen } from "@testing-library/react";
import Home from "./Home";

test("renders initializing message", () => {
  render(<Home />);
  const linkElement = screen.getByText(/Classified Cellars Initializing.../i);
  expect(linkElement).toBeInTheDocument();
});
