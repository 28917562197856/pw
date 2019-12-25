import React from "react";

type Props = {
  dispatch: React.Dispatch<any>;
  encryptedData: string;
  hidden: boolean;
};

export const ImportExportInit: React.FC<Props> = ({
  dispatch,
  encryptedData,
  hidden
}) => {
  return (
    <>
      <div>
        <input
          value={encryptedData}
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
    </>
  );
};
