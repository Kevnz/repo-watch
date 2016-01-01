
import ES6Promise from "es6-promise";
import React from "react";
import ReactDOM from 'react-dom';
import { Router } from "react-router";
import history from './history';

import routes from "./routes";

ES6Promise.polyfill();
ReactDOM.render(<Router history={history} routes={routes} />, document.getElementById("app"));
