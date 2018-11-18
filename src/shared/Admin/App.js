import React from "react";
import { Route, Switch } from "react-router-dom";

import routes from "./routes";

import P404 from "./Pages/404";
import Header from "./Components/Header";
import Error from "./Components/Error";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { cssload: false, error: "" };
    this.addError = this.addError.bind(this);
    this.HeaderWithProps = this.HeaderWithProps.bind(this);
  }
  componentDidMount() {
    this.setState({ cssload: true });
  }
  addError(err) {
    this.setState({ error: err });
  }
  HeaderWithProps(props) {
    return <Header {...props} addError={this.addError} />;
  }
  render() {
    const { error } = this.state;
    return (
      <div>
        <Route component={this.HeaderWithProps} />
        <Switch>
          {routes.map(({ path, exact, component: C, ...rest }) => (
            <Route
              key={path}
              path={path}
              exact={exact}
              render={props => (
                <C {...props} {...rest} addError={this.addError} />
              )}
            />
          ))}
          <Route render={props => <P404 {...props} />} />
        </Switch>
        {error ? <Error ok={this.addError} error={error} /> : ""}
      </div>
    );
  }
}
