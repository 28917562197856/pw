import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { App } from "./App";
import { Import } from "./components/Import";
import { lsGet } from "./helpers";

type Props = {};

export const Router: React.FC<Props> = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route
          exact
          path="/"
          render={props => <Import {...props} encryptedData={lsGet()} />}
        />
        <Route exact path="/show" component={App} />
        <Route path="/" render={() => <div>404</div>} />
      </Switch>
    </BrowserRouter>
  );
};
