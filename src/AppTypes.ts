export type State = {
  data: object;
  key: string;
  encryptedData: string;
  site: string;
  identifier: string;
  password: string;
  hidden: boolean;
};

export type Action =
  | { type: "field"; name: string; value: string }
  | { type: "create" }
  | { type: "import"; encryptedData: string }
  | { type: "init" }
  | { type: "export" };
