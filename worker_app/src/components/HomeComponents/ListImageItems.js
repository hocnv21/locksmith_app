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
  indexPage,
  setCurrentIndex,
  listImage,
}) {
  function FooterImage() {
    return (
      <View style={{alignItems: 'center'}}>
        <Text style={{color: '#ffffff'}}>{`${indexPage + 1}/${
          listImage.length
        }`}</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
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
            // onImageIndexChange={index => setCurrentIndex(index)}
            // FooterComponent={() => <FooterImage />}
          />
        ) : null}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, width: '100%'},
  btnDelete: {
    width: 20,
    height: 20,
    position: 'absolute',
    right: 10,
    top: 10,
  },
  iconDelete: {resizeMode: 'contain', width: 20, height: 20},
  imageStyle: {
    // width: PixelRatio.getPixelSizeForLayoutSize(110),
    width: PixelRatio.getPixelSizeForLayoutSize(106.5),
    height: PixelRatio.getPixelSizeForLayoutSize(125),
    resizeMode: 'cover',

    margin: 5,
  },
});
