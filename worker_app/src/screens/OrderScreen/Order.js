import {
  Dimensions,
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';
import React from 'react';
import {useRoute} from '@react-navigation/native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

const GOOGLE_MAPS_APIKEY = 'AIzaSyDYWtP2hykeWKnJHJIPaJcFff68Uecg-co';

export default function Order() {
  const route = useRoute();
  const {dataOrder, locksmith} = route.params;
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        // onUserLocationChange={onUserLocationChange}
        initialRegion={{
          latitude: 10.82213,
          longitude: 106.686829,
          latitudeDelta: 0.0222,
          longitudeDelta: 0.0121,
        }}>
        <MapViewDirections
          origin={{
            latitude: locksmith?.location.coordinates[1],
            longitude: locksmith?.location.coordinates[0],
          }}
          // onReady={onDirectionFound}
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
            latitude: locksmith?.location.coordinates[1],
            longitude: locksmith?.location.coordinates[0],
          }}>
          <Image
            style={{height: 50, width: 50, resizeMode: 'contain'}}
            source={require('../../assets/images/moto.png')}
          />
        </Marker>
        <Marker
          coordinate={{
            latitude: dataOrder.coordinates[1],
            longitude: dataOrder.coordinates[0],
          }}
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: Dimensions.get('window').height,
  },
});
