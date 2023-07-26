import React from "react";
import { Route, Switch } from "react-router-dom";
import MainPageComponentIndex from "../pages/main";

export default function RouterApp() {
  return (
    <Switch>
      <Route exact path={"/:name_company"} component={MainPageComponentIndex}></Route>
    </Switch>
  );
}
