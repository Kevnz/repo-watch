import React from "react";
import { Route, Router, Link } from "react-router-dom";

import App from "./components/app";
import Home from "./components/home";
import RepoList from "./components/repo-list";
import RepoDetail from "./components/repo-detail";

export default (
  <Router >      <section>
    <header>
      <h1><Link to="/">Repo Watch</Link></h1>
    </header>

    <main className="container">
      <Route path="/" component={Home} />
      <Route path="/:user" component={RepoList} />
      <Route path="/:user/:repo" component={RepoDetail} />
    </main>

  </section>

  </Router>
);
