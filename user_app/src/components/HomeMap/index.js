import {Image, Platform} from 'react-native';
import React, {useState, useEffect} from 'react';
import MapView, {
  Marker,
  PROVIDER_DEFAULT,
  PROVIDER_GOOGLE,
} from 'react-native-maps';

const HomeMap = () => {
  const [locksmiths, setLocksmiths] = useState([]);

  const getImage = type => {
    if (type === 'Home') {
      return require('../../assets/images/map-home.png');
    }
    if (type === 'Vehicle') {
      return require('../../assets/images/map-car.png');
    }
    return require('../../assets/images/map-elec.png');
  };

  return (
    <MapView
      style={{left: 0, right: 0, top: 0, bottom: 0, position: 'absolute'}}
      // provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : PROVIDER_DEFAULT}
      provider={PROVIDER_GOOGLE}
      showsUserLocation={true}
      initialRegion={{
        latitude: 10.82213,
        longitude: 106.686829,
        latitudeDelta: 0.0222,
        longitudeDelta: 0.0121,
      }}>
      {locksmiths.map(locksmith => (
        <Marker
          key={locksmith.id}
          coordinate={{
            latitude: locksmith.latitude,
            longitude: locksmith.longitude,
          }}>
          <Image
            style={{
              width: 35,
              height: 35,
              resizeMode: 'contain',
              // transform: [
              //   {
              //     rotate: `${locksmith.heading}deg`,
              //   },
              // ],
            }}
            source={getImage(locksmith.type)}
          />
        </Marker>
      ))}
    </MapView>
  );
};

export default HomeMap;
