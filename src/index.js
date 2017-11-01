import React from "react";
import { render } from "react-dom";
//import { Router, Route, hashHistory } from "react-router";

import App from "./common/components/App";

// CSS
require("./styles/normalize.css");
require("./styles/main.css");

var content = document.getElementById("content");

render(<App />, content);
