import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";

export function addToList() {}

export function App() {
  const [listState, setListState] = useState<string[]>([]);
  const [value, setValue] = useState("");

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <input
          value={value}
          data-testid={"todo-input"}
          onChange={(event) => {
            setValue(event.target.value);
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              setListState((currentValue) => [...currentValue, value]);
            }
          }}
        />
        {listState.map((entry) => (
          <span data-testid={"todo-item-0"}>{entry}</span>
        ))}
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}
