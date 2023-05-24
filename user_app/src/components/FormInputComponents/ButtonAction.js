import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Avatar} from 'react-native-paper';
import {SIZES} from '../../contains/theme';

export default function ButtonAction({setModalVisible}) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={styles.btnTakeImage}>
        <Avatar.Icon icon="camera" size={32} />
        <Text>Thêm hình ảnh</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flexDirection: 'row', justifyContent: 'center'},
  btnTakeImage: {
    width: SIZES.width - 50,
    height: 80,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
});
