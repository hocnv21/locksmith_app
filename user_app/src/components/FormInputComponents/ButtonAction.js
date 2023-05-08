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
      <TouchableOpacity
        // onPress={() => selectFile()}
        style={styles.btnTakeImage}>
        <Avatar.Icon icon="video" size={32} />
        <Text>Thêm video</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flexDirection: 'row'},
  btnTakeImage: {
    width: (SIZES.width - 40) / 2 - 10,
    height: 80,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
});
