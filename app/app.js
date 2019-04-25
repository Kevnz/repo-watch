import React, { Component } from 'react'
import { Router, Link } from '@reach/router'



import Home from "./components/home";
import RepoList from "./components/repo-list";
import RepoDetail from "./components/repo-detail";

export default class App extends Component {
  render() {
    return (
      <section>
        <header>
          <h1><Link to="/">GitHub Observatory</Link></h1>
        </header>
        <main className="container">
          <Router>
            <Home path="/" />
            <RepoList path="/:user" />
            <RepoDetail path="/:user/:repo" />
          </Router>
        </main>
      </section>
    )
  }
}
