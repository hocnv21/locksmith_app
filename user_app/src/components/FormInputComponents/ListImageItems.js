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

export default function ListImageItems({
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
        setSelectedImage(`data:image/png;base64,${value.base64}`);
      }}>
      <Image
        style={styles.imageStyle}
        source={{uri: `data:image/png;base64,${value.base64}`}}
      />
      <TouchableOpacity
        onPress={() => onPressDeleteImage(value)}
        style={styles.btnDelete}>
        <Image style={styles.iconDelete} source={ICONS.cancel} />
      </TouchableOpacity>
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
  btnDelete: {
    width: 20,
    height: 20,
    position: 'absolute',
    right: 10,
    top: 10,
  },
  iconDelete: {resizeMode: 'contain', width: 20, height: 20},
  imageStyle: {
    width: PixelRatio.getPixelSizeForLayoutSize(30),
    height: PixelRatio.getPixelSizeForLayoutSize(30),
    resizeMode: 'cover',
    margin: 5,
  },
});
