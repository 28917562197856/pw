import React, { useReducer, useEffect, useContext } from "react";
import { State, Action } from "./AppTypes";
import { lsSet, encrypt, download, keyFilter } from "./helpers";
import { AddItem } from "./components/AddItem";
import { GeneratePassword } from "./components/GeneratePassword";
import { DataDisplay } from "./components/DataDisplay";
import { Link, useHistory } from "react-router-dom";
import { RouterContext } from "./Router";

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
      let key = action.key;
      let data = action.data;
      return {
        ...state,
        data,
        key
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

export const App: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const history = useHistory();
  const context = useContext(RouterContext);

  const { data, site, identifier, password } = state;

  useEffect(() => console.log(context), [context]);
  useEffect(() => {
    if (!context.key) {
      history.push("/");
    } else {
      if (!Object.keys(context.data).length) {
        dispatch({ type: "import", key: context.key });
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
      <Link to="/">Import</Link>
      <GeneratePassword dispatch={dispatch} />
      <AddItem
        dispatch={dispatch}
        site={site}
        identifier={identifier}
        password={password}
      />
      <div>
        {!data ? (
          "No data available"
        ) : (
          <DataDisplay data={data} dispatch={dispatch} />
        )}
      </div>
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
