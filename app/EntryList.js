'use strict';

var React = require('react-native');
var Router = require('./router');

var {
  StyleSheet,
  Text,
  View,
  Image,
  ListView,
  TouchableHighlight,
  ActivityIndicatorIOS,
} = React;

var QIITA_REACTJS_ENTRY_URL = 'https://qiita.com/api/v2/tags/reactjs/items';

var EntryList = React.createClass({
  getInitialState: function() {
    return (
      {
        dataSource: new ListView.DataSource({
          rowHasChanged: (row1, row2) => row1 !== row2
        }),
        isLoaded: false
      }
    );
  },
  componentDidMount: function() {
    console.log('entry list.js ' + this.props.entries);
    if (typeof this.props.entries !== 'undefined') {
      this.setState(
        {
          dataSource: this.state.dataSource.cloneWithRows(this.props.entries),
          isLoaded: true
        }
      );
    } else {
      this.fetchData();
    }
  },
  fetchData: function() {
    fetch(QIITA_REACTJS_ENTRY_URL)
    .then((response) => response.json())
    .then((responseData) => {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(responseData),
        isLoaded: true
      });
    })
    .done();
  },
  renderEntry: function(entry) {
    return (
      <TouchableHighlight onPress={() => this.onPressed(entry)}>
        <View>
          <View style={styles.container}>
            <Image
              source={{uri: entry.user.profile_image_url}}
              style={styles.thumbnail}
            />
          <View style={styles.rightContainer}>
              <Text style={styles.title}>{entry.title}</Text>
              <Text style={styles.name}>{entry.user.id}</Text>
            </View>
          </View>
          <View style={styles.separator} />
        </View>
      </TouchableHighlight>
    );
  },
  onPressed: function(entry) {
    let profile = {
      name: entry.title,
      url: entry.url,
    };
    let route = Router.getDetailRoute(profile);
    this.props.navigator.push(route);
  },
  viewLoadingData: function() {
    return (
      <View style={styles.activityIndicator}>
        <ActivityIndicatorIOS
          animating={true}
          size={'large'}
        />
        <View>
          <Text style={styles.loadingMessage}>Please wait a second ...</Text>
        </View>
      </View>
    );
  },
  render: function() {
    if (this.state.isLoaded) {
      return (
        <ListView
          style={styles.listView}
          dataSource={this.state.dataSource}
          renderRow={this.renderEntry}
        />
      );
    } else {
      return (
        this.viewLoadingData()
      );
    }
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  thumbnail: {
    width: 60,
    height: 60,
    marginRight: 10
  },
  rightContainer: {
    flex: 1
  },
  title: {
    fontSize: 14,
    marginBottom: 8
  },
  name: {
    color: '#656565'
  },
  separator: {
    height: 1,
    backgroundColor: '#DDDDDDD'
  },
  listView: {
    backgroundColor: '#F5FCFF'
  },
  activityIndicator: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  loadingMessage: {
    flex: 1,
    fontSize: 20,
    color: '#656565',
  }
});

module.exports = EntryList;
