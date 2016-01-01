import axios from "axios";
import { Link } from "react-router";
import React from "react";

import { resolve } from "react-resolver";

@resolve("details", function({ params }) {
  const { user, repo } = params;
  const url = `/api/${user}/${repo}`;

  return axios.get(url).then(({ data }) => data);
})
export default class RepoDetail extends React.Component {
  static displayName = "Stargazer"

  render() {
    const { repo } = this.props;

    return (
        <section> ? </section>
    );
  }
}
