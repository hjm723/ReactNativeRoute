'use strict';

var React = require('react-native');

var {
  View,
  Text,
} = React;

var Button = require('react-native-button');
var Router = require('./router');

class HomeScene extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Button
          style={styles.button}
          onPress={() => {
            let route = Router.getHomeRoute();
            this.props.navigator.push(route);
          }}
        >
          最新の記事一覧
        </Button>
        <Button
          style={styles.button}
          onPress={() => {
            let route = Router.getSearchRoute();
            this.props.navigator.push(route);
          }}
        >
          検索
        </Button>
      </View>
    );
  }
}

var styles = {
  container: {
    justifyContent: 'center'
  },
  button: {
    padding: 20
  },
};

module.exports = HomeScene;
