import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

export default function DashBoardItem({title, number}) {
  return (
    <View style={styles.dashBoard}>
      <Text style={styles.text}>{title}</Text>
      <Text style={styles.text}>{number}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  dashBoard: {
    width: '30%',
    backgroundColor: 'blue',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {fontWeight: '600', color: '#ffffff'},
});
