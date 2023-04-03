import {StyleSheet, Text, View, Pressable, Dimensions} from 'react-native';
import React from 'react';

export default function TextUnderline({onPress, text}) {
  return (
    <View>
      <Pressable onPress={onPress}>
        <Text
          style={{
            padding: 10,
            fontWeight: '700',
            color: '#0068FF',
            textDecorationLine: 'underline',
          }}>
          {' '}
          {text}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({});
