import {Button, StyleSheet, Text, View} from 'react-native';
import React from 'react';

import auth from '@react-native-firebase/auth';

export default function Test() {
  const signOut = async () => {
    console.log('signing out');
    auth()
      .signOut()
      .then(async () => {
        console.log('User sign-out successfully!');
      })
      .catch(e => alert('Error', e.message));
  };
  return (
    <View
      style={{
        flex: 1,
        marginTop: 60,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text>Test</Text>
      <Button onPress={signOut} title="Log Out" />
    </View>
  );
}

const styles = StyleSheet.create({});
