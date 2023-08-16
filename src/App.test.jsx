/* eslint-disable no-undef */
import { render, screen } from "@testing-library/react";
import App from "./App";
import { expect } from "vitest";

describe("App", () => {
  it("should have hello world", () => {
    render(<App />);
    const message = screen.queryByText(/Hello world/i);
    expect(message).toBeInTheDocument();
  });
});
