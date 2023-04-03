import React, {useEffect} from 'react';
import {
  View,
  PermissionsAndroid,
  Platform,
  StatusBar,
  StyleSheet,
} from 'react-native';
import 'react-native-gesture-handler';
import Geolocation from '@react-native-community/geolocation';

import Router from './src/navigator/Root';

const App = () => {
  return (
    <View style={{flex: 1}}>
      <Router />
    </View>
  );
};

export default App;
