type State = {
  data: Data;
  key: string;
};

type Action =
  | { type: "create"; identifier: string; length: number; symbols: boolean }
  | { type: "import"; data: object; key: string }
  | { type: "delete"; item: string }
  | { type: "export" };

type Data = {
  site: string[];
};

export { State, Action, Data };
