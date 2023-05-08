import {
  Image,
  View,
  Platform,
  StyleSheet,
  Pressable,
  PixelRatio,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import MapView, {
  Marker,
  PROVIDER_DEFAULT,
  PROVIDER_GOOGLE,
} from 'react-native-maps';
import Entypo from 'react-native-vector-icons/Entypo';
import {useNavigation} from '@react-navigation/native';
import {ICONS, SIZES} from '../../contains/theme';

const HomeMap = () => {
  const mapRef = useRef(null);
  const navigation = useNavigation();
  const [coordinate, setCoordinate] = useState();

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => navigation.openDrawer()}
        style={styles.roundButton}>
        <Entypo name="menu" size={28} color={'#4a4a4a'} />
      </Pressable>
      <Image style={styles.marker} source={ICONS.marker} />
      <MapView
        ref={mapRef}
        style={{width: '100%', height: '100%'}}
        // provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : PROVIDER_DEFAULT}
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        initialRegion={{
          latitude: 10.82213,
          longitude: 106.686829,
          latitudeDelta: 0.0222,
          longitudeDelta: 0.0121,
        }}
        onRegionChangeComplete={region => {
          // setCoordinate(region);

          console.log(region);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: SIZES.width,
    height: SIZES.height,
  },
  marker: {
    resizeMode: 'contain',
    position: 'absolute',
    zIndex: 1,
    top: SIZES.height / 2 - PixelRatio.getPixelSizeForLayoutSize(7.5),
    left: SIZES.width / 2 - PixelRatio.getPixelSizeForLayoutSize(7.5),
    width: PixelRatio.getPixelSizeForLayoutSize(15),
    height: PixelRatio.getPixelSizeForLayoutSize(15),
  },
  roundButton: {
    zIndex: 1,
    position: 'absolute',
    top: Platform.OS === 'ios' ? 40 : 10,
    left: 10,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 50,
  },
});

export default HomeMap;
