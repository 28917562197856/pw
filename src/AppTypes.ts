type State = {
  data: Data;
  key: string;
  site: string;
  identifier: string;
  password: string;
};

type Action =
  | { type: "field"; name: string; value: string }
  | { type: "create" }
  | { type: "import"; data?: object; key: string }
  | { type: "delete"; item: string }
  | { type: "export" };

type Data = {
  site: string[];
};

export { State, Action, Data };
