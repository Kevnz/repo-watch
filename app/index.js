
import ES6Promise from "es6-promise";
import React from "react";
import ReactDOM from 'react-dom';


import App from "./app";

ES6Promise.polyfill();
ReactDOM.render(<App/>, document.getElementById("app"));
