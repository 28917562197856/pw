export type State = {
  data: object;
  key: string;
  site: string;
  identifier: string;
  password: string;
};

export type Action =
  | { type: "field"; name: string; value: string }
  | { type: "create" }
  | { type: "import"; encryptedData: string; key: string }
  | { type: "init" }
  | { type: "export" };
