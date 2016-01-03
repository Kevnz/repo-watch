import React from "react";
import { Link } from 'react-router';

export default class App extends React.Component {
  static displayName = "App"
  render() {
    return (
      <section>
        <header>
          <h1><Link to="/">Repo Watch</Link></h1>
        </header>

        <main className="container">
          {this.props.children}
        </main>

      </section>
    );
  }
}
