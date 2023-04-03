import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS} from '../../contains';

export default function Pressable_line({
  textStart,
  textPressable,
  onPress,
  color,
}) {
  return (
    <View style={styles.container}>
      <Text>{textStart}</Text>
      <Pressable onPress={onPress}>
        <Text style={styles.text}> {textPressable}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  text: {
    fontWeight: '700',
    color: COLORS.error,
  },
});
