import React, { useReducer, useEffect, useContext } from "react";
import { State, Action } from "./AppTypes";
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

function reducer(state: State, action: Action) {
  switch (action.type) {
    case "create": {
      let pw = generatePassword(action.length, action.symbols);
      let newData = {
        ...state.data,
        [state.identifier]: pw
      };
      let encryptedData = encrypt(newData, state.key);
      lsSet(encryptedData);
      return {
        ...state,
        data: newData,
        identifier: ""
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
  key: "",
  identifier: ""
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
    <div style={styles.container}>
      <div className="mt2">
        <button className="mr2" onClick={() => history.push("/import")}>
          Import
        </button>
        <button onClick={() => dispatch({ type: "export" })}>Export</button>
      </div>
      <Create dispatch={dispatch} data={data} />
      <DataTable data={data ?? {}} dispatch={dispatch} />
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "'Roboto', sans-serif",
    display: "grid",
    gridTemplateRows: "1fr",
    justifyItems: "center",
    alignItems: "center"
  }
};
