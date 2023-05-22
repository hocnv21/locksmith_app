import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

export default function ShowErrorMessage({showMessage, valid, message}) {
  return (
    <View>
      {showMessage && (
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View></View>
          <Text style={{color: 'red'}}>{valid ? '' : message}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({});
