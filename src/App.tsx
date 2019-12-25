import React, { useReducer, useEffect } from "react";
import { State } from "./AppTypes";
import { lsGet, lsSet, encrypt, decrypt, download } from "./helpers";
import { AddItem } from "./components/AddItem";
import { ImportExportInit } from "./components/ImportExportInit";
import { GeneratePassword } from "./components/GeneratePassword";

function reducer(state: State, action: any) {
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
}

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
        <ImportExportInit
          dispatch={dispatch}
          encryptedData={encryptedData}
          hidden={hidden}
        />
      </div>
      <div
        style={{
          display: hidden ? "none" : "grid",
          gridTemplateRows: "1fr",
          justifyItems: "center",
          alignItems: "center"
        }}
      >
        <GeneratePassword dispatch={dispatch} />
        <AddItem
          dispatch={dispatch}
          site={site}
          identifier={identifier}
          password={password}
        />
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
