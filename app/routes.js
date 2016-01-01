import React from "react";
import { Route } from "react-router";

import App from "./components/app";
import Home from "./components/home";
import RepoList from "./components/repo-list";
import RepoDetail from "./components/repo-detail";

export default (
  <Route component={App}>

    <Route path="/" component={Home} />
    <Route path="/:user" component={RepoList} />
    <Route path="/:user/:repo" component={RepoDetail} />
  </Route>
);
