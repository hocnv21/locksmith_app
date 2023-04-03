import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

export default function TextLine({text, colorLine}) {
  return (
    <View
      style={{flexDirection: 'row', alignItems: 'center', marginVertical: 20}}>
      <View style={{flex: 1, height: 1, backgroundColor: colorLine}} />
      <View>
        <Text style={{width: 50, textAlign: 'center'}}>{text}</Text>
      </View>
      <View style={{flex: 1, height: 1, backgroundColor: colorLine}} />
    </View>
  );
}

const styles = StyleSheet.create({});
