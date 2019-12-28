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
    <form
      className="mt2"
      style={styles.container}
      onSubmit={e => {
        e.preventDefault();
        if (!encryptedData && key) {
          let choice = confirm(
            `Create new database with master password "${key}"?`
          );
          if (choice) {
            history.push("/");
            context.setKey(key);
          }
        } else if (!decrypt(encryptedData, key)) {
          alert("Invalid password!");
        } else {
          let decryptedData = decrypt(encryptedData, key);
          context.setData(decryptedData);
          context.setKey(key);
          history.push("/");
        }
      }}
    >
      <textarea
        className={"w-60 w-40-m w-30-ns h4 mt4"}
        style={{ resize: "none" }}
        value={encryptedData}
        onChange={e => setEncryptedData(e.target.value)}
      />
      <input
        className="mv2"
        autoFocus
        value={key}
        onChange={e => setKey(e.target.value)}
      />
      <button className="bn pa2 bg-light-gray hover-bg-moon-gray" type="submit">
        Import / Create
      </button>
    </form>
  );
};

const styles = {
  container: {
    display: "grid",
    gridTemplateRows: "1fr",
    justifyItems: "center",
    alignItems: "center"
  }
};
