import React from "react";
import { Action } from "src/AppTypes";

type Props = {
  data: object;
  dispatch: React.Dispatch<Action>;
};

export const DataDisplay: React.FC<Props> = ({ data, dispatch }) => {
  //   console.log(data);
  return (
    <table>
      <thead>
        <tr>
          <th>Site</th>
          <th>Identifier</th>
          <th>Password</th>
        </tr>
      </thead>
      <tbody>
        {Object.entries(data).map(e => (
          <tr key={e[0]}>
            <CopiableTd text={e[0]} className="" />
            <CopiableTd text={e[1][0]} className="mh1" />
            <CopiableTd text={e[1][1]} className="" />
            <td>
              <button onClick={() => dispatch({ type: "delete", item: e[0] })}>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

type PropsCopiableDiv = {
  text: string;
  className: string;
};

const CopiableTd: React.FC<PropsCopiableDiv> = ({ text, className }) => {
  return (
    <td
      className={"pointer dim pa2 ba " + " " + className}
      onClick={async () => {
        await navigator.clipboard.writeText(text);
      }}
    >
      {text}
    </td>
  );
};
