import React, { useReducer } from "react";
import {
  lsSet,
  encrypt,
  download,
  keyFilter,
  generatePassword
} from "./helpers";
import { Create } from "./components/Create";
import { DataTable } from "./components/DataTable";
import { Import } from "./components/Import";

type State = {
  data: object;
  key: string;
  hidden: true;
};

export type Action =
  | { type: "create"; identifier: string; length: number; symbols: boolean }
  | { type: "import"; data: object; key: string }
  | { type: "delete"; item: string }
  | { type: "export" }
  | { type: "unhide" };

function reducer(state: Readonly<State>, action: Action) {
  switch (action.type) {
    case "create": {
      let pw = generatePassword(action.length, action.symbols);
      let newData = {
        ...state.data,
        [action.identifier]: pw
      };
      let encryptedData = encrypt(newData, state.key);
      lsSet(encryptedData);
      return {
        ...state,
        data: newData
      };
    }
    case "delete": {
      let newData = keyFilter(state.data, action.item);
      let encryptedData = encrypt(newData, state.key);
      lsSet(encryptedData);
      return {
        ...state,
        data: newData
      };
    }
    case "import": {
      return {
        ...state,
        data: action.data,
        key: action.key,
        hidden: false
      };
    }
    case "export": {
      let encryptedData = encrypt(state.data, state.key);
      download(encryptedData);
      return state;
    }
    case "unhide": {
      return {
        ...state,
        data: {},
        key: "",
        hidden: true
      };
    }
    default: {
      return state;
    }
  }
}

const initialState = {
  data: {},
  key: "",
  hidden: true
};

export const App: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { data, hidden } = state;

  return (
    <>
      {hidden ? (
        <div>
          <Import dispatch={dispatch} />
        </div>
      ) : (
        <div className="flex flex-column items-center">
          <div className="mt2">
            <button
              style={{ padding: ".40rem" }}
              className="mr2 bn bg-light-gray hover-bg-moon-gray"
              onClick={() => dispatch({ type: "unhide" })}
            >
              Import
            </button>
            <button
              style={{ padding: ".40rem" }}
              className="bn bg-light-gray hover-bg-moon-gray"
              onClick={() => dispatch({ type: "export" })}
            >
              Export
            </button>
          </div>
          <Create dispatch={dispatch} data={data} />
          <DataTable data={data ?? {}} dispatch={dispatch} />
        </div>
      )}
    </>
  );
};
