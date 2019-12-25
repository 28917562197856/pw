import React, { useReducer, useEffect } from "react";
import { State } from "./AppTypes";
import { lsGet, lsSet, encrypt, decrypt, download } from "./helpers";

const reducer = (state: State, action: any) => {
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
        data: newData
      };
    }
    case "import": {
      let key = prompt("Enter master password");
      let data = decrypt(action.encryptedData, key!);
      return {
        ...state,
        encryptedData: "",
        data,
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
};

const initialState = {
  data: {},
  key: "",
  encryptedData: "",
  site: "",
  identifier: "",
  password: "",
  hidden: true
};

export const App: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { data, encryptedData, site, identifier, password, hidden } = state;

  useEffect(() => console.log(state), [state]);
  useEffect(() => {
    let encryptedData = lsGet();
    if (encryptedData) dispatch({ type: "import", encryptedData });
  }, []);

  return (
    <>
      <div
        style={{
          display: "grid",
          gridTemplateRows: "1fr",
          justifyItems: "center",
          alignItems: "center"
        }}
      >
        <div>
          <input
            value={encryptedData}
            placeholder="data string"
            onChange={e =>
              dispatch({
                type: "field",
                name: "encryptedData",
                value: e.target.value
              })
            }
          />
          <button
            onClick={() => {
              dispatch({ type: "import", encryptedData });
            }}
          >
            Import
          </button>
          <button
            className={hidden ? "dn" : undefined}
            onClick={() => {
              dispatch({ type: "export" });
            }}
          >
            Export
          </button>
        </div>
        <button
          className={!hidden ? "dn" : undefined}
          onClick={() => {
            dispatch({ type: "init" });
          }}
        >
          Create database
        </button>
      </div>
      <div
        style={{
          display: hidden ? "none" : "grid",
          gridTemplateRows: "1fr",
          justifyItems: "center",
          alignItems: "center"
        }}
      >
        <form
          onSubmit={e => {
            e.preventDefault();
            dispatch({ type: "create" });
          }}
        >
          <input
            value={site}
            placeholder="site"
            onChange={e =>
              dispatch({ type: "field", name: "site", value: e.target.value })
            }
          />
          <input
            value={identifier}
            placeholder="identifier"
            onChange={e =>
              dispatch({
                type: "field",
                name: "identifier",
                value: e.target.value
              })
            }
          />
          <input
            value={password}
            placeholder="password"
            onChange={e =>
              dispatch({
                type: "field",
                name: "password",
                value: e.target.value
              })
            }
          />
          <button type="submit">Add item</button>
        </form>
        <div>
          {!data
            ? "No data available"
            : Object.entries(data).map(e => (
                <div key={String(Math.random())}>
                  <div>{e[0]}</div>
                  <div>{e[1][0]}</div>
                  <div>{e[1][1]}</div>
                </div>
              ))}
        </div>
      </div>
    </>
  );
};
