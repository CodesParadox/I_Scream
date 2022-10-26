import React, { Fragment } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { Dashboard } from "./pages/Dashboard";
import { Tables } from "./pages/Tables";
import { Profile } from "./pages/Profile";

const Routes = () => {

  return (
    <Fragment>
      <BrowserRouter>
        <Route exact path="/" render={() => <Dashboard/> } />
        <Route path="/tables" component={Tables} />
        <Route path="/profile" component={Profile} />
      </BrowserRouter>
    </Fragment>
  );
};

export default Routes;
