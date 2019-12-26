import React, { useState } from "react";
import { RouteComponentProps } from "react-router-dom";

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
          if (data === "" || key === "") alert("Field must be nonempty!");
          else {
            setData("");
            setKey("");
            history.push({
              pathname: "/show",
              state: { encryptedData: data, key }
            });
          }
        }}
      >
        Import / Create
      </button>
    </div>
  );
};
