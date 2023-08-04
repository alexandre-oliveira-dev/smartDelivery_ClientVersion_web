import React from "react";
import { Route, Switch } from "react-router-dom";
import MainPageComponentIndex from "../pages/main";
import Cart from '../pages/cart';
import DetailsPage from "../pages/itemDetails";

export default function RouterApp() {
  return (
    <Switch>
      <Route
        exact
        path={'/:name_company'}
        component={MainPageComponentIndex}
      ></Route>
      <Route
        exact
        path={'/:name_company/meu carrinho'}
        component={Cart}
      ></Route>
      <Route
        exact
        path={'/:name_company/detalhes/:id'}
        component={DetailsPage}
      ></Route>
    </Switch>
  );
}
