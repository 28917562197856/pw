import React from "react";

type Props = {
  dispatch: React.Dispatch<any>;
  site: string;
  identifier: string;
  password: string;
};

export const AddItem: React.FC<Props> = ({
  dispatch,
  site,
  identifier,
  password
}) => {
  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        dispatch({ type: "create" });
      }}
    >
      <input
        value={site}
        onChange={e =>
          dispatch({ type: "field", name: "site", value: e.target.value })
        }
      />
      <input
        value={identifier}
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
  );
};
