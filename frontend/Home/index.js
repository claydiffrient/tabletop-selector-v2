import React, { Component } from "react";
import themeable from "@instructure/ui-themeable";
import styles from "./styles.css";
import theme from "./theme.js";
import { getDecoded } from "../utils/auth_helpers";

class Home extends Component {
  state = {
    user: getDecoded().data
  };
  render() {
    return <div>You're logged in as {this.state.user.username}</div>;
  }
}

export default themeable(theme, styles)(Home);
