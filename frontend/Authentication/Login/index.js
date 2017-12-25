import React, { Component } from "react";
import themeable from "@instructure/ui-themeable";
import styles from "./styles.css";
import theme from "./theme.js";
import Heading from "@instructure/ui-core/lib/components/Heading";
import TextInput from "@instructure/ui-core/lib/components/TextInput";
import Container from "@instructure/ui-core/lib/components/Container";
import Button from "@instructure/ui-core/lib/components/Button";
import axios from "axios";
import { storeToken, isAuthorized } from "../../utils/auth_helpers";
import Redirect from "react-router-dom/Redirect";

class Login extends Component {
  state = {
    email: "",
    password: ""
  };

  handleSubmit = e => {
    e.preventDefault();
    axios
      .post("/users/login", {
        email: this.state.email,
        password: this.state.password
      })
      .then(response => {
        const { token } = response.data;
        storeToken(token);
        this.setState({ authorized: true });
      });
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleReset = () => {
    this.setState({
      email: "",
      password: ""
    });
  };

  render() {
    if (isAuthorized() || this.state.authorized) {
      return <Redirect to="/home" push />;
    }

    return (
      <Container as="div" padding="small">
        <Heading align="center" level="h2">
          Login
        </Heading>
        <form onSubmit={this.handleSubmit}>
          <TextInput
            name="email"
            label="Email"
            placeholder="luke@jedimasters.com"
            value={this.state.email}
            onChange={this.handleChange}
          />
          <TextInput
            name="password"
            type="password"
            label="Password"
            value={this.state.password}
            onChange={this.handleChange}
          />
          <Container align="center" margin="small 0 0 0" as="div">
            <Button
              margin="0 xxx-small 0 0"
              type="reset"
              onClick={this.handleReset}
            >
              Reset
            </Button>
            <Button type="submit" variant="primary" margin="0 0 0 xxx-small">
              Submit
            </Button>
          </Container>
        </form>
      </Container>
    );
  }
}

export default themeable(theme, styles)(Login);
