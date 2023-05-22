import {
  Image,
  PixelRatio,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import ImageView from 'react-native-image-viewing';
import {ICONS} from '../../contains/theme';

export default function ImageItems({
  selectedImage,
  setSelectedImage,
  visibleImageView,
  setVisibleImageView,
  setViewImage,
  value,
  onPressDeleteImage,
  index,
}) {
  return (
    <TouchableOpacity
      onPress={() => {
        setVisibleImageView(true);
        setSelectedImage(value.uri);
      }}>
      <Image style={styles.imageStyle} source={{uri: value.uri}} />

      {selectedImage ? (
        <ImageView
          imageIndex={0}
          visible={visibleImageView}
          onRequestClose={() => setVisibleImageView(false)}
          images={[{uri: selectedImage}]}
        />
      ) : null}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  iconDelete: {resizeMode: 'contain', width: 20, height: 20},
  imageStyle: {
    width: PixelRatio.getPixelSizeForLayoutSize(30),
    height: PixelRatio.getPixelSizeForLayoutSize(30),
    resizeMode: 'cover',
    margin: 5,
  },
});
