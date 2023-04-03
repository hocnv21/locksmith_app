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
import Navigator from './src/navigator/Navigator';
import Router from './src/navigator/Root';

navigator.geolocation = require('@react-native-community/geolocation');
const App = () => {
  const androidPermissions = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Unlocker App location Permission',
          message:
            'Unlocker App needs access to your location ' +
            'so you can take awesome rides.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the location');
      } else {
        console.log('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };
  useEffect(() => {
    if (Platform.OS === 'android') {
      androidPermissions();
    } else {
      //Android
      Geolocation.requestAuthorization();
    }
  }, []);
  return (
    <View style={{flex: 1}}>
      <Router />
    </View>
  );
};

export default App;