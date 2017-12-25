import React, { Component } from "react";
import themeable from "@instructure/ui-themeable";
import styles from "./styles.css";
import theme from "./theme.js";
import Authentication from "../Authentication";
import Home from "../Home";
import Heading from "@instructure/ui-core/lib/components/Heading";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

class Main extends Component {
  render() {
    return (
      <div className={styles.root}>
        <Heading level="h1" border="bottom" margin="0 0 small 0" align="center">
          Tabletop Selector v2
        </Heading>
        <Router>
          <Switch>
            <Route exact path="/" component={Authentication} />
            <Route path="/home" component={Home} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default themeable(theme, styles)(Main);
