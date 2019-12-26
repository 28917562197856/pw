import React, { useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { decrypt } from "../helpers";

type Props = {
  encryptedData: string | null;
};

export const Import: React.FC<Props & RouteComponentProps> = ({
  encryptedData,
  history
}) => {
  const [data, setData] = useState(encryptedData ?? "");
  const [key, setKey] = useState("");

  return (
    <div>
      <textarea
        className={"w5 h3"}
        style={{ resize: "none" }}
        value={data}
        onChange={e => setData(e.target.value)}
      />
      <input value={key} onChange={e => setKey(e.target.value)} />
      <button
        onClick={() => {
          if (!data && key) {
            let choice = confirm(
              `Create new database with master password ${key}?`
            );
            if (choice) {
              history.push({
                pathname: "show",
                state: { key }
              });
            }
          } else if (!decrypt(data, key)) {
            alert("Invalid password!");
          } else {
            setData("");
            setKey("");
            let decryptedData = decrypt(data, key);
            console.log(decryptedData);
            history.push({
              pathname: "/show",
              state: { data: decryptedData, key }
            });
          }
        }}
      >
        Import / Create
      </button>
    </div>
  );
};
