'use strict';

var React = require('react-native');
var Index = require('./app/root');

var {
  AppRegistry,
  Component,
  View,
} = React;

class ReactRoute extends Component {
  render() {
      return (
        <Index/>
      );
  }
}

AppRegistry.registerComponent('ReactRoute', () => ReactRoute);
