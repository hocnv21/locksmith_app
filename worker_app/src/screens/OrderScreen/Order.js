import {
  Dimensions,
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  ActivityIndicator,
  Linking,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import Geolocation from '@react-native-community/geolocation';
import {SIZES} from '../../contains';
import BottomCustomer from '../../components/OrderComponents/BottomCustomer';

const GOOGLE_MAPS_APIKEY = 'AIzaSyBRIMcAbmG87nU5UbSOdCHyM0EPNIgj_g0';
const ASPECT_RATIO = SIZES.width / SIZES.height;
const LATITUDE_DELTA = 0.0122;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default function Order() {
  const navigation = useNavigation();
  const route = useRoute();
  const [isFinished, setIsFinished] = useState(true);
  const {dataOrder, locksmith, customer} = route.params;
  const [currentLongitude, setCurrentLongitude] = useState(''); //10.82213
  const [currentLatitude, setCurrentLatitude] = useState(''); //106.686829
  const mapRef = useRef(null);

  Geolocation.getCurrentPosition(
    position => {
      console.log('position' + position);
      setCurrentLatitude(position.coords.latitude);
      setCurrentLongitude(position.coords.longitude);
    },
    error => console.log(error.message),
    {
      enableHighAccuracy: true,
      timeout: 200000,
      maximumAge: 500,
      distanceFilter: 10,
    },
  );

  Geolocation.watchPosition(
    position => {
      console.log('watchPoin');
      setCurrentLatitude(position.coords.latitude);
      setCurrentLongitude(position.coords.longitude);
    },
    error => console.log('error' + error),
    {
      enableHighAccuracy: true,
      timeout: 20000,
      maximumAge: 500,
      distanceFilter: 10,
    },
  );

  if (currentLongitude === '') {
    return (
      <View>
        <ActivityIndicator />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        followsUserLocation={true}
        initialRegion={{
          latitude: currentLatitude,
          longitude: currentLongitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }}>
        <MapViewDirections
          onReady={result => {
            result.distance < 0.14
              ? navigation.navigate('Unlocking', {
                  customer: customer,
                  newOrders: dataOrder,
                })
              : null;
          }}
          origin={{
            latitude: currentLatitude,
            longitude: currentLongitude,
          }}
          destination={{
            latitude: dataOrder.coordinates[1],
            longitude: dataOrder.coordinates[0],
          }}
          apikey={GOOGLE_MAPS_APIKEY}
          strokeWidth={5}
          strokeColor="blue"
        />

        <Marker
          coordinate={{
            latitude: dataOrder.coordinates[1],
            longitude: dataOrder.coordinates[0],
          }}
        />
      </MapView>
      <BottomCustomer customer={customer} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  map: {
    width: '100%',
    height: Dimensions.get('window').height - 140,
  },
});
