import {
  View,
  Image,
  Platform,
  Dimensions,
  Text,
  Animated,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import axios from 'axios';
import MapView, {
  Marker,
  PROVIDER_DEFAULT,
  PROVIDER_GOOGLE,
  Callout,
} from 'react-native-maps';

const GOOGLE_MAPS_APIKEY = 'AIzaSyDvH3f3z8eYs8Q-IolL2xJIshzQgjuQnV8';

const {width, height} = Dimensions.get('window');

const RouteMap = ({origin, dataLocksmith}) => {
  const originLoc = {
    latitude: origin.details.geometry.location.lat,
    longitude: origin.details.geometry.location.lng,
  };

  const initialMapState = {
    dataLocksmith,
    // markers,
    region: {
      latitude: originLoc.latitude,
      longitude: originLoc.longitude,
      latitudeDelta: 0.0222,
      longitudeDelta: 0.0121,
    },
  };

  const [state, setState] = React.useState(initialMapState);

  if (!dataLocksmith) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <MapView
        initialRegion={state.region}
        style={styles.map}
        provider={PROVIDER_GOOGLE}>
        {dataLocksmith.map((marker, index) => {
          return (
            <Marker
              key={index}
              // coordinate={marker.coordinate}
              coordinate={{
                latitude: marker.location.coordinates[1],
                longitude: marker.location.coordinates[0],
              }}
              // onPress={e => onMarkerPress(e)}
            >
              <Animated.Image
                source={require('../../assets/images/map-car.png')}
                style={styles.marker}
                resizeMode="cover"
              />
            </Marker>
          );
        })}
        <Marker coordinate={state.region}>
          <Callout>
            <Text>Bạn đang ở đây</Text>
          </Callout>
        </Marker>
      </MapView>
    </View>
  );
};

export default RouteMap;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  search_place: {
    position: 'absolute',
    top: 20,
    left: 10,
    right: 10,
    borderWidth: 2,
    width: '100%',
  },
  chipsScrollView: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 90 : 80,
    paddingHorizontal: 10,
  },
  chipsIcon: {
    marginRight: 5,
  },
  chipsItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 8,
    paddingHorizontal: 20,
    marginHorizontal: 10,
    height: 35,
    shadowColor: '#ccc',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  },
  scrollView: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 10,
  },

  cardImage: {
    flex: 3,
    width: '100%',
    height: '100%',
    alignSelf: 'center',
  },
  textContent: {
    flex: 2,
    padding: 10,
  },
  cardtitle: {
    fontSize: 12,
    // marginTop: 5,
    fontWeight: 'bold',
  },
  cardDescription: {
    fontSize: 12,
    color: '#444',
  },
  markerWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
  },
  marker: {
    width: 30,
    height: 30,
  },
  button: {
    alignItems: 'center',
    marginTop: 5,
  },
  signIn: {
    width: '100%',
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3,
  },
  textSign: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});
