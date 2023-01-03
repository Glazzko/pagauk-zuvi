import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import "./index.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Next from "./components/Next";
import Shop from "./components/Shop";

ReactDOM.render(
    <Router>
        <div>
            <Route exact path="/">
                <App />
            </Route>
            <Route path="/next">
                <Next />
            </Route>
            <Route path="/shop">
                <Shop />
            </Route>
        </div>
    </Router>,
    document.getElementById("root")
);
