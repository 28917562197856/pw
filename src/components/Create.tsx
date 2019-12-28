import React, { useState } from "react";
import { Action } from "../AppTypes";

type Props = {
  dispatch: React.Dispatch<Action>;
  data: object;
};

export const Create: React.FC<Props> = ({ dispatch, data }) => {
  const [identifier, setIdentifier] = useState("");
  const [symbols, setSymbols] = useState(false);
  const [length, setLength] = useState<any>(64);
  return (
    <div style={styles.container} className="mb2">
      <div className="mv2" style={styles.container}>
        <div>
          <span className="mr2">Symbols?</span>
          <input type="checkbox" onChange={() => setSymbols(!symbols)} />
        </div>
        <span className="mh2">Password length ({length})</span>
        <input
          className="w5"
          min={1}
          max={128}
          type="range"
          onChange={e => {
            let len = parseInt(e.target.value);
            setLength(len);
          }}
        />
      </div>
      <div>
        <input
          value={identifier}
          onChange={e => setIdentifier(e.target.value)}
        />
        <button
          className="ml1"
          onClick={() => {
            if (!identifier) alert("Fields must be nonempty!");
            else if (identifier in data) alert("Field already exists!");
            else dispatch({ type: "create", identifier, length, symbols });
          }}
        >
          Add item
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "grid",
    gridTemplateRows: "1fr",
    justifyItems: "center",
    alignItems: "center"
  }
};
