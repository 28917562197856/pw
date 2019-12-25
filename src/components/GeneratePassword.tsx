import React, { useState } from "react";
import { generatePassword } from "../helpers";

type Props = {
  dispatch: React.Dispatch<any>;
};

export const GeneratePassword: React.FC<Props> = ({ dispatch }) => {
  const [symbols, setSymbols] = useState(false);
  const [length, setLength] = useState(64);

  return (
    <form>
      <span>Symbols?</span>
      <input type="checkbox" onChange={() => setSymbols(!symbols)} />
      <input
        min={5}
        max={256}
        value={length}
        type="range"
        onChange={e => setLength(parseInt(e.target.value))}
      />
      {length}
      <button
        onClick={e => {
          e.preventDefault();
          let pw = generatePassword(length, symbols);
          dispatch({
            type: "field",
            name: "password",
            value: pw
          });
        }}
      >
        Generate password
      </button>
    </form>
  );
};
