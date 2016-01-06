'use strict';

var React = require('react-native');
var Router = require('./router');

var {
  WebView,
} = React;

class Component extends React.Component {
  handlePress() {
    let route = Router.getOtherRoute();
    this.props.navigator.push(route);
  }
  render() {
    return (
      <WebView
        url={this.props.profile.url}
      />
    );
  }
}

var styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
};

module.exports = Component;
