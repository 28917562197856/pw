import React, { useReducer, useEffect, useContext } from "react";
import {
  lsSet,
  encrypt,
  download,
  keyFilter,
  generatePassword
} from "./helpers";
import { Create } from "./components/Create";
import { DataTable } from "./components/DataTable";
import { useHistory } from "react-router-dom";
import { RouterContext } from "./Router";

type State = {
  data: object;
  key: string;
};

export type Action =
  | { type: "create"; identifier: string; length: number; symbols: boolean }
  | { type: "import"; data: object; key: string }
  | { type: "delete"; item: string }
  | { type: "export" };

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
        key: action.key
      };
    }
    case "export": {
      let encryptedData = encrypt(state.data, state.key);
      download(encryptedData);
      return state;
    }
    default: {
      return state;
    }
  }
}

const initialState = {
  data: {},
  key: ""
};

export const App: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const history = useHistory();
  const context = useContext(RouterContext);

  const { data } = state;

  useEffect(() => {
    if (!context.key) {
      history.push("/import");
    } else {
      if (!Object.keys(context.data).length) {
        dispatch({
          type: "import",
          data: { "example.com/myUsername": generatePassword(64) },
          key: context.key
        });
      } else {
        dispatch({
          type: "import",
          data: context.data,
          key: context.key
        });
      }
    }
  }, []);

  return (
    <div className="flex flex-column items-center">
      <div className="mt2">
        <button
          style={{ padding: ".40rem" }}
          className="mr2 bn bg-light-gray hover-bg-moon-gray"
          onClick={() => history.push("/import")}
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
  );
};
