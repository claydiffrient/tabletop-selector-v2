import React, { Component } from "react";
import themeable from "@instructure/ui-themeable";
import styles from "./styles.css";
import theme from "./theme.js";
import Heading from "@instructure/ui-core/lib/components/Heading";
import TextInput from "@instructure/ui-core/lib/components/TextInput";
import Container from "@instructure/ui-core/lib/components/Container";
import Button from "@instructure/ui-core/lib/components/Button";

class Login extends Component {
  render() {
    return (
      <Container as="div" padding="small">
        <Heading align="center" level="h2">
          Login
        </Heading>
        <TextInput label="Email" placeholder="luke@jedimasters.com" />
        <TextInput type="password" label="Password" />
        <Container align="center" margin="small 0 0 0" as="div">
          <Button variant="primary" margin="0 xxx-small 0 0">
            Submit
          </Button>
          <Button margin="0 0 0 xxx-small" type="reset">
            Reset
          </Button>
        </Container>
      </Container>
    );
  }
}

export default themeable(theme, styles)(Login);
