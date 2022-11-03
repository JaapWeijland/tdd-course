import React from "react";
import { render, screen } from "@testing-library/react";
import { App } from "./App";
import userEvent from "@testing-library/user-event";

test("renders learn react link", () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

test("renders input field", () => {
  render(<App />);
  const inputField = screen.getByTestId("todo-input");
  expect(inputField).toBeInTheDocument();
});

test("adds todo item after user input", () => {
  render(<App />);
  userEvent.type(screen.getByTestId("todo-input"), "text");
  userEvent.type(screen.getByTestId("todo-input"), "{enter}");
  const index = 0;
  expect(screen.getByTestId(`todo-item-${index}`)).toBeInTheDocument();
  expect(screen.getByTestId(`todo-item-${index}`)).toBeInTheDocument();
});
