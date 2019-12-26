import React, { useReducer, useEffect } from "react";
import { State, Action } from "./AppTypes";
import { lsSet, encrypt, decrypt, download } from "./helpers";
import { AddItem } from "./components/AddItem";
import { GeneratePassword } from "./components/GeneratePassword";
import { DataDisplay } from "./components/DataDisplay";
import { RouteComponentProps, Link } from "react-router-dom";

function reducer(state: State, action: Action) {
  switch (action.type) {
    case "field": {
      return {
        ...state,
        [action.name]: action.value
      };
    }
    case "create": {
      let newData = {
        ...state.data,
        [state.site]: [state.identifier, state.password]
      };
      let encryptedData = encrypt(newData, state.key);
      lsSet(encryptedData);
      return {
        ...state,
        data: newData,
        site: "",
        identifier: "",
        password: ""
      };
    }
    case "import": {
      let key = action.key;
      let data = decrypt(action.encryptedData, key ?? "");
      return {
        ...state,
        data,
        encryptedData: "",
        key,
        hidden: false
      };
    }
    case "init": {
      let key = prompt("Enter master password") ?? "";
      let encryptedData = encrypt(state.data, key);
      lsSet(encryptedData);
      return {
        ...state,
        key,
        hidden: false
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
  site: "",
  identifier: "",
  password: ""
};

export const App: React.FC<RouteComponentProps> = ({ location, history }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { data, site, identifier, password } = state;

  useEffect(() => console.log(state), [state]);
  useEffect(() => {
    if (location.state === undefined) {
      history.push("/");
    } else
      dispatch({
        type: "import",
        encryptedData: location.state.encryptedData,
        key: location.state.key
      });
  }, []);

  return (
    <div style={styles.container}>
      <Link to="/">Import</Link>
      <GeneratePassword dispatch={dispatch} />
      <AddItem
        dispatch={dispatch}
        site={site}
        identifier={identifier}
        password={password}
      />
      <div>{!data ? "No data available" : <DataDisplay data={data} />}</div>
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
