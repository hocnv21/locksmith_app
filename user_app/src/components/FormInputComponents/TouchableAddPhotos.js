import {
  Image,
  PixelRatio,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {ICONS} from '../../contains/theme';

export default function TouchableAddPhotos({setModal, filePath}) {
  return (
    <TouchableOpacity onPress={setModal} style={styles.container}>
      <Image style={styles.image} source={ICONS.camera} />
      <Text>{filePath.length}/5</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderStyle: 'dashed',
    borderWidth: 1,
    width: PixelRatio.getPixelSizeForLayoutSize(30),
    height: PixelRatio.getPixelSizeForLayoutSize(30),
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: PixelRatio.getPixelSizeForLayoutSize(10),
    height: PixelRatio.getPixelSizeForLayoutSize(10),
  },
});
