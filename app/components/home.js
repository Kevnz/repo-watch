import React from "react";
import history from '../history';

export default class Home extends React.Component {
  static displayName = "Home"

  constructor(props) {
    super(props);

    this.state = {
      action: "/",
      user: "kevnz"
    };
  }

  componentDidMount() {
    this.setState(this.computeState());
  }

  computeState(state) {
    const nextState = {
      ...this.state,
      ...state,
    };

    const { user, repo } = nextState;

    nextState.action = `/${user}`;

    return nextState;
  }

  handleChange(event) {
    const { name, value } = event.target;

    this.setState(this.computeState({ [name]: value }));
  }

  handleSubmit(event) {
    event.preventDefault();
    const { submit } = this.props;
    const { action } = this.state;
    console.log(action);
    history.replaceState(null, action);


  }

  render() {
    const { action, user, repo } = this.state;

    return (
      <section>
        <form
          action={action}
          method="GET"
          onChange={::this.handleChange}
          onSubmit={::this.handleSubmit}
          className="col s12"
        >
          <div className="row">
              <input id="user" name="user" type="text" defaultValue={user} />
              <label htmlFor="user" className="active">
                Github User
              </label>
          </div>

          <div className="row">
            <button type="submit">
              Submit
            </button>
          </div>
        </form>
      </section>
    );
  }
}
