'use strict';

var React = require('react-native');
var Button = require('react-native-button');

var {
  View,
  Text,
  Image
} = React;

let Router = {
  getTopRoute() {
    return {
      getSceneClass() {
        return require('./homeScene');
      },
      getTitle() {
        return 'Top';
      },
    };
  },
  getEntryRoute() {
    return {
      getSceneClass() {
        return require('./entryList');
      },
      getTitle() {
        return '最新';
      },
    };
  },
  getSearchRoute() {
    return {
      getSceneClass() {
        return require('./searchEntry');
      },
      getTitle() {
        return '検索';
      },
    };
  },
  getSearchListRoute(entry, name) {
    return {
      renderScene(navigator) {
        let EntryList = require('./entryList');
        return (
          <EntryList navigator={navigator} entries={entry}/>
        );
      },
      getTitle() {
        return ('「' + name + '」での検索結果');
      },
    };
  },
  getDetailRoute(profile) {
    return {
      renderScene(navigator) {
        let ProfileScene = require('./profileScene');
        return <ProfileScene navigator={navigator} profile={profile} />;
      },
      // renderTitle() {
      //   return (
      //     <View style={styles.container}>
      //       <Image source={{uri: profile.photoUrl}} style={styles.titlePhoto} />
      //       <Text style={styles.titleName}>{profile.name}</Text>
      //     </View>
      //   );
      // },
      getTitle() {
        return profile.name;
      },
      // renderRightButton() {
      //   return (
      //     <Button onPress={() => { console.log('Tapped right button'); }}>
      //       Add
      //     </Button>
      //   );
      // },

    };
  },
};

var styles = {
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleName: {
    marginLeft: 5,
    fontWeight: 'bold'
  },
  titlePhoto: {
    height: 30,
    width: 30,
    borderRadius: 15,
  }
};

module.exports = Router;
