import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { decrypt, lsGet } from "../helpers";
import { RouterContext } from "../Router";

export const Import: React.FC = () => {
  const [encryptedData, setEncryptedData] = useState(lsGet() ?? "");
  const [key, setKey] = useState("");
  const history = useHistory();
  const context = useContext(RouterContext);

  return (
    <div>
      <textarea
        className={"w5 h3"}
        style={{ resize: "none" }}
        value={encryptedData}
        onChange={e => setEncryptedData(e.target.value)}
      />
      <input value={key} onChange={e => setKey(e.target.value)} />
      <button
        onClick={() => {
          if (!encryptedData && key) {
            let choice = confirm(
              `Create new database with master password ${key}?`
            );
            if (choice) {
              history.push("show");
              context.setKey(key);
            }
          } else if (!decrypt(encryptedData, key)) {
            alert("Invalid password!");
          } else {
            let decryptedData = decrypt(encryptedData, key);
            context.setData(decryptedData);
            context.setKey(key);
            history.push("/show");
          }
        }}
      >
        Import / Create
      </button>
    </div>
  );
};
