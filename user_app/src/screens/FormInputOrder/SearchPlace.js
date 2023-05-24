import React, {useState, useEffect} from 'react';
import {
  View,
  TextInput,
  SafeAreaView,
  Platform,
  TouchableOpacity,
  Image,
} from 'react-native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {useNavigation, useRoute} from '@react-navigation/native';
import axios from 'axios';
import styles from './styles.js';
import PlaceRow from './PlaceRow.js';

const homePlace = {
  description: 'Home',
  formatted_address:
    '12 Nguyễn Văn Bảo, Phường 4, Gò Vấp, Thành phố Hồ Chí Minh, Vietnam',
  geometry: {location: {lat: 10.82202435, lng: 106.68756890394116}}, // iuh
};
const workPlace = {
  description: 'Work',

  geometry: {location: {lat: 10.835099, lng: 106.6336986}}, // 221 phan huy ich
};

const SearchPlace = props => {
  const [originPlace, setOriginPlace] = useState(null);
  const navigation = useNavigation();
  const route = useRoute();
  const {description, listPhotos, typeLock} = route.params;
  // const checkNavigation = async () => {
  //   if (originPlace) {
  //     navigation.navigate('SearchResults', {
  //       originPlace,
  //     });
  //   }
  // };
  console.log('list image props' + listPhotos.length);

  useEffect(() => {
    // console.log(description);
    // console.log(listPhotos.length);
    const checkNavigation = async () => {
      if (originPlace) {
        navigation.navigate('SearchResults', {
          originPlace,
          description,
          listPhotos,
          typeLock,
        });
      }
    };
    checkNavigation();
  }, [description, listPhotos, navigation, originPlace, typeLock]);
  // if (originPlace) {
  //   navigation.navigate('SearchResults', {
  //     originPlace: originPlace,
  //   });
  // }

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <GooglePlacesAutocomplete
          placeholder="Where from?"
          onPress={(data, details = null) => {
            console.log(
              'location details :' + JSON.stringify(data.structured_formatting),
            );
            setOriginPlace({data, details});
          }}
          // enablePoweredByContainer={false}

          suppressDefaultStyles
          // currentLocation={true}
          // currentLocationLabel="Current location"
          styles={{
            textInput: styles.textInput,
            container: styles.autocompleteContainer,
            listView: styles.listView,
            separator: styles.separator,
          }}
          fetchDetails={true}
          nea
          onFail={er => console.log(er)}
          query={{
            key: 'AIzaSyBRIMcAbmG87nU5UbSOdCHyM0EPNIgj_g0',
            language: 'en',
            // components: 'country:vi',
            type: 'address',
          }}
          minLength={5}
          renderRow={data => <PlaceRow data={data} />}
          renderDescription={data => data.description || data.vicinity}
          predefinedPlaces={[homePlace, workPlace]}
        />

        {/* Circle near Origin input */}
        <View style={styles.circle} />

        {/* Line between dots */}
      </View>
    </SafeAreaView>
  );
};

export default SearchPlace;
