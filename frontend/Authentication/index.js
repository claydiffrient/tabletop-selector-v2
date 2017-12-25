import React, { Component } from "react";
import themeable from "@instructure/ui-themeable";
import styles from "./styles.css";
import theme from "./theme.js";
import Text from "@instructure/ui-core/lib/components/Text";
import Login from "./Login";
import Registration from "./Registration";
import Grid, {
  GridCol,
  GridRow
} from "@instructure/ui-core/lib/components/Grid";

class Authentication extends Component {
  render() {
    return (
      <Grid visualDebug>
        <GridRow>
          <GridCol>
            <Login />
          </GridCol>
          <GridCol>
            <Registration />
          </GridCol>
        </GridRow>
      </Grid>
    );
  }
}

export default themeable(theme, styles)(Authentication);
