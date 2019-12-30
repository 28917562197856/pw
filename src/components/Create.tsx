import React, { useState } from "react";
import { Action } from "../App";

type Props = {
  dispatch: React.Dispatch<Action>;
  data: object;
};

export const Create: React.FC<Props> = ({ dispatch, data }) => {
  const [identifier, setIdentifier] = useState("");
  const [symbols, setSymbols] = useState(false);
  const [length, setLength] = useState<any>(64);

  return (
    <div className="mb2 flex flex-column items-center">
      <div className="flex items-center mt2">
        <span className="mr2">Symbols?</span>
        <input
          className="pointer"
          type="checkbox"
          onChange={() => setSymbols(!symbols)}
        />
      </div>
      <span className="mt2">Password length ({length})</span>
      <input
        className="w5 mt2"
        min={1}
        max={128}
        type="range"
        onChange={e => {
          let len = parseInt(e.target.value);
          setLength(len);
        }}
      />
      <form
        className="mt2"
        onSubmit={e => {
          e.preventDefault();
          if (!identifier) alert("Fields must be nonempty!");
          else if (identifier in data) alert("Field already exists!");
          else dispatch({ type: "create", identifier, length, symbols });
        }}
      >
        <input
          placeholder="Identifier"
          style={{ height: "20px" }}
          value={identifier}
          onChange={e => setIdentifier(e.target.value)}
        />
        <button
          className="ml1 bn pa1 h-100 bg-light-gray hover-bg-moon-gray"
          type="submit"
        >
          Add item
        </button>
      </form>
    </div>
  );
};
