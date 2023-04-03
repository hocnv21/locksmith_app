import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

export default function Logo_Login({onPress, TYPE}) {
  const logo_google = require('../../assets/images/google.png');
  const logo_facekook = require('../../assets/images/facebook.png');

  return (
    <TouchableOpacity onPress={onPress} style={styles.touch}>
      <Image
        style={styles.logo}
        source={TYPE === 'google' ? logo_google : logo_facekook}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
  },
  logo: {
    resizeMode: 'contain',
    width: 30,
    height: 30,
  },
  touch: {
    width: 50,
    height: 50,
    marginHorizontal: 10,

    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 4,
  },
});
