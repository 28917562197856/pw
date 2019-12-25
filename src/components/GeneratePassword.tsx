import React, { useState } from "react";
import { generatePassword } from "../helpers";

type Props = {
  dispatch: React.Dispatch<any>;
};

export const GeneratePassword: React.FC<Props> = ({ dispatch }) => {
  const [numbers, setNumbers] = useState(false);
  const [symbols, setSymbols] = useState(false);
  const [length, setLength] = useState(64);

  return (
    <form>
      <span>numbers?</span>
      <input type="checkbox" onChange={() => setNumbers(!numbers)} />
      <span>symbols?</span>
      <input type="checkbox" onChange={() => setSymbols(!symbols)} />
      <input
        value={length}
        type="number"
        onChange={e => setLength(parseInt(e.target.value))}
      />
      <button
        onClick={e => {
          e.preventDefault();
          let pw = generatePassword(length, numbers, symbols);
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
