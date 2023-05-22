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
  blue: '#1495ff',
  white: '#FFFFFF',
  background: '#1065e9',
  black_light: '#252C4A',
  jade_green: '#3EB8D4',
  light_gray: 'gray',
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
