import React, { useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { App } from "./App";
import { Import } from "./components/Import";

export const RouterContext = React.createContext<any>({});

export const Router: React.FC = () => {
  const [data, setData] = useState({});
  const [key, setKey] = useState("");

  return (
    <RouterContext.Provider value={{ data, key, setData, setKey }}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/import" component={Import} />
          <Route exact path="/" component={App} />
          <Route path="/" render={() => <div>404</div>} />
        </Switch>
      </BrowserRouter>
    </RouterContext.Provider>
  );
};
