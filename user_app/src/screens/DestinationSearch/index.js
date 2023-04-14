import React, {useState, useEffect} from 'react';
import {View, TextInput, SafeAreaView, Platform} from 'react-native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import styles from './styles.js';
import PlaceRow from './PlaceRow';

const homePlace = {
  description: 'Home',
  geometry: {location: {lat: 10.82202435, lng: 106.68756890394116}}, // iuh
};
const workPlace = {
  description: 'Work',
  geometry: {location: {lat: 10.835099, lng: 106.6336986}}, // 221 phan huy ich
};

const DestinationSearch = props => {
  const [originPlace, setOriginPlace] = useState(null);
  const [locksmithNearBy, setLocksmithNearBy] = useState(null);
  const navigation = useNavigation();

  const checkNavigation = async () => {
    if (originPlace) {
      console.log('nananananaananan');
      navigation.navigate('SearchResults', {
        originPlace,
      });
    }
  };

  useEffect(() => {
    checkNavigation();
  }, [originPlace]);

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <GooglePlacesAutocomplete
          placeholder="Where from?"
          onPress={(data, details = null) => {
            setOriginPlace({data, details});

            console.log(
              'location details :' + JSON.stringify(data.structured_formatting),
            );
          }}
          enablePoweredByContainer={false}
          suppressDefaultStyles
          currentLocation={true}
          currentLocationLabel="Current location"
          styles={{
            textInput: styles.textInput,
            container: styles.autocompleteContainer,
            listView: styles.listView,
            separator: styles.separator,
          }}
          fetchDetails
          query={{
            key: 'AIzaSyDvH3f3z8eYs8Q-IolL2xJIshzQgjuQnV8',
            language: 'en',
          }}
          renderRow={data => <PlaceRow data={data} />}
          renderDescription={data => data.description || data.vicinity}
          predefinedPlaces={[homePlace, workPlace]}
        />

        {/* <GooglePlacesAutocomplete
          placeholder="Where to?"
          onPress={(data, details = null) => {
            setDestinationPlace({data, details});
          }}
          enablePoweredByContainer={false}
          suppressDefaultStyles
          styles={{
            textInput: styles.textInput,
            container: {
              ...styles.autocompleteContainer,
              top: 55,
            },
            separator: styles.separator,
          }}
          fetchDetails
          query={{
            key: 'AIzaSyDvH3f3z8eYs8Q-IolL2xJIshzQgjuQnV8',
            language: 'en',
          }}
          renderRow={data => <PlaceRow data={data} />}
          renderDescription={data => data.description || data.vicinity}
          predefinedPlaces={[homePlace, workPlace]}
        /> */}

        {/* Circle near Origin input */}
        <View style={styles.circle} />

        {/* Line between dots */}
      </View>
    </SafeAreaView>
  );
};

export default DestinationSearch;
