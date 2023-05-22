import {StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';

export default function AccountItems({text, value, readOnly}) {
  return (
    <View style={styles.container}>
      <Text>{text}</Text>
      {/* <TextInput value={value} /> */}
      <Text>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: 1,
  },
});
