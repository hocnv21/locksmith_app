import {
  Image,
  PixelRatio,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {ICONS, SIZES, shadowView} from '../../contains/theme';
import {useNavigation} from '@react-navigation/native';

export default function ServiceItem({value}) {
  const navigation = useNavigation();
  const _handlePress = () => {
    navigation.navigate('FormInput', {typeLock: value.type});
  };
  return (
    <View style={styles.service}>
      <TouchableOpacity onPress={_handlePress}>
        <Image style={styles.banner} source={value.banner} />
        <View style={styles.viewBtn}>
          <Text style={styles.text}>{value.nameCategory}</Text>
          <Image style={styles.icon} source={ICONS.arrow_right} />
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  service: [
    {
      marginTop: 10,
      marginBottom: 5,
      borderRadius: 10,
      width: '100%',
      height: (SIZES.height * 0.87) / 3 - 15 - 25,
      backgroundColor: '#ffffff',
    },
    shadowView,
  ],
  banner: {
    width: '100%',
    height: '70%',
    resizeMode: 'cover',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  viewBtn: {
    flexDirection: 'row',
    paddingLeft: 20,
    height: '30%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {fontSize: 18, fontWeight: '700'},
  icon: {
    height: PixelRatio.getPixelSizeForLayoutSize(12),
    width: PixelRatio.getPixelSizeForLayoutSize(12),
  },
});
