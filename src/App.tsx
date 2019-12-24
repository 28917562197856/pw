import React, { useReducer } from "react";
import crypto from "crypto-js";

const lsGet = (name: string) => localStorage.getItem(name) ?? "";

const lsSet = (data: string) => localStorage.setItem("data", data);

type State = {
  data: object;
  encryptedData: string;
  key: string;
  site: string;
  identifier: string;
  password: string;
};

const encrypt = (data: object, key: string) => {
  return crypto.AES.encrypt(JSON.stringify(data), key).toString();
};

const decrypt = (data: string, key: string) => {
  return crypto.AES.decrypt(data, key).toString(crypto.enc.Utf8);
};

const init = () => {
  console.log("test");
  let lsData = lsGet("data");
  let key = prompt("Enter master password");
  let data: State = {
    data: {
      "gmail.com": ["email", "pw"],
      facebook: ["email", "pw"]
    },
    encryptedData: encrypt(
      {
        "gmail.com": ["email", "pw"],
        facebook: ["email", "pw"]
      },
      "test"
    ),
    key: key!,
    site: "",
    identifier: "",
    password: ""
  };
  if (lsData) {
    data = JSON.parse(decrypt(lsData, key!));
  }

  return data;
};

const reducer = (state: State, action: any) => {
  switch (action.type) {
    case "field": {
      return {
        ...state,
        [action.name]: action.value
      };
    }
    case "create": {
      let newState = {
        ...state,
        data: {
          ...state.data,
          [state.site]: [state.identifier, state.password]
        }
      };
      lsSet(encrypt(newState, state.key));
      return newState;
    }
    default: {
      return state;
    }
  }
};

export const App: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, undefined, init);

  const { data } = state;

  return (
    <div
      style={{
        display: "grid",
        gridTemplateRows: "1fr",
        justifyItems: "center",
        alignItems: "center"
      }}
    >
      <div>
        <button>Import</button>
        <button>Export</button>
      </div>
      <form
        onSubmit={e => {
          e.preventDefault();
          dispatch({ type: "create" });
        }}
      >
        <input
          placeholder="site"
          onChange={e =>
            dispatch({ type: "field", name: "site", value: e.target.value })
          }
        ></input>
        <input
          placeholder="identifier"
          onChange={e =>
            dispatch({
              type: "field",
              name: "identifier",
              value: e.target.value
            })
          }
        ></input>
        <input
          placeholder="password"
          onChange={e =>
            dispatch({ type: "field", name: "password", value: e.target.value })
          }
        ></input>
        <button type="submit">Create</button>
      </form>
      <div>
        {!data
          ? "loading"
          : Object.entries(data).map(e => (
              <div key={String(Math.random())}>
                <div>{e[0]}</div>
                <div>{e[1][0]}</div>
                <div>{e[1][1]}</div>
              </div>
            ))}
      </div>
    </div>
  );
};
