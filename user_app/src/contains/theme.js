import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');

export const COLORS = {
  primary: '#252c4a',
  secondary: '#1E90FF',
  accent: '#3498db',
  violet: '#694AFF',
  lightViolet: '#F0EDFF',
  success: '#00C851',
  error: '#ff4444',
  bacgroundLogin: '#efeefc',
  black: '#171717',
  white: '#FFFFFF',
  background: '#1065e9',
  jade_green: '#3EB8D4',
  light_gray: '#C6C6C6',
  gray: '#E7E7E7',
};
export const ICONS = {
  cancel: require('../assets/images/icon/cancel.png'),
  arrow_back: require('../assets/images/icon/back-arrow.png'),
  camera: require('../assets/images/icon/camera.png'),
  photos: require('../assets/images/icon/photos.png'),
  arrow_right: require('../assets/images/icon/right-arrow.png'),
  location: require('../assets/images/icon/location.png'),
  marker: require('../assets/images/icon/marker.png'),
};
export const shadowView = {
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 4,
  elevation: 5,
};

export const SIZES = {
  base: 10,
  width,
  height,
};
