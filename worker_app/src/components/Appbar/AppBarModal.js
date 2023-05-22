import {useNavigation, useRoute} from '@react-navigation/native';
import * as React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
  ActivityIndicator,
  Modal,
  Alert,
  PixelRatio,
  Image,
} from 'react-native';
import {Appbar} from 'react-native-paper';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS, ICONS} from '../../contains/theme';

function AppBarModal({leftIcon, centerText, rightText, onPress}) {
  const navigation = useNavigation();
  const _handleDraw = () => onPress();

  return (
    <Appbar.Header style={styles.container}>
      <View style={styles.container}>
        <TouchableOpacity onPress={_handleDraw}>
          <Ionicons
            color={'#ffffff'}
            size={PixelRatio.getPixelSizeForLayoutSize(10)}
            name="chevron-down"
          />
        </TouchableOpacity>

        {centerText && <Text style={styles.textName}>{centerText}</Text>}
        <Text></Text>

        {rightText && <Text style={styles.textName}>{rightText}</Text>}
      </View>
    </Appbar.Header>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.background,
    paddingHorizontal: 10,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
  },
  logoMenu: {
    borderWidth: 2,
    borderColor: '#ffffff',
    width: 50,
    height: 50,
    padding: 5,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  //   image: {
  //     height: PixelRatio.getPixelSizeForLayoutSize(12),
  //     width: PixelRatio.getPixelSizeForLayoutSize(12),
  //   },
});

export default AppBarModal;
