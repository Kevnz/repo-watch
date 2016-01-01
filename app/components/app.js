import React from "react";

export default class App extends React.Component {
  static displayName = "App"
  render() {
    return (
      <section>
        <header>
          <h1>Repo Watch</h1>
        </header>

        <main className="container">
          {this.props.children}
        </main>

      </section>
    );
  }
}
