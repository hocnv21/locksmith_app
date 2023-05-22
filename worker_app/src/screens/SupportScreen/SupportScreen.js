import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import AppBar from '../../components/Appbar/AppBar';

export default function SupportScreen() {
  return (
    <>
      <AppBar centerText={'Trang hổ trợ'} rightText={' '} />
      <View>
        <Text>SupportScreen</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({});
