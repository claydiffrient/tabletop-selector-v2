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

class Registration extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  };

  passwordsMatch = () => {
    if (!this.state.password.length || !this.state.confirmPassword.length) {
      return true;
    }
    return (
      this.state.password.length > 0 &&
      this.state.confirmPassword.length > 0 &&
      this.state.password === this.state.confirmPassword
    );
  };

  handleSubmit = e => {
    e.preventDefault();
    if (!this.passwordsMatch()) {
      return false;
    }
    axios
      .post("/users/register", {
        email: this.state.email,
        password: this.state.password,
        username: this.state.username
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
      password: "",
      username: "",
      confirmPassword: ""
    });
  };

  render() {
    if (isAuthorized() || this.state.authorized) {
      return <Redirect to="/home" push />;
    }
    const passwordMessages = [];
    let formError = false;
    if (!this.passwordsMatch()) {
      passwordMessages.push({
        text: "Passwords do not match",
        type: "error"
      });
      formError = true;
    }

    return (
      <Container as="div" padding="small">
        <Heading align="center" level="h2">
          Register
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
            name="username"
            label="Username"
            placeholder="skywalker79"
            value={this.state.username}
            onChange={this.handleChange}
          />
          <TextInput
            name="password"
            type="password"
            label="Password"
            value={this.state.password}
            onChange={this.handleChange}
            messages={passwordMessages}
          />
          <TextInput
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            value={this.state.confirmPassword}
            onChange={this.handleChange}
            messages={passwordMessages}
          />
          <Container align="center" margin="small 0 0 0" as="div">
            <Button
              margin="0 xxx-small 0 0"
              type="reset"
              onClick={this.handleReset}
            >
              Reset
            </Button>
            <Button
              disabled={formError}
              type="submit"
              variant="primary"
              margin="0 0 0 xxx-small"
            >
              Submit
            </Button>
          </Container>
        </form>
      </Container>
    );
  }
}

export default themeable(theme, styles)(Registration);
