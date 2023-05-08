import {
  View,
  Dimensions,
  Alert,
  ScrollView,
  Text,
  Platform,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';

import axios from 'axios';
import LocksmithTypes from '../../components/LocksmithTypes';
import RouteMap from '../../components/RouteMap';

import {useRoute, useNavigation} from '@react-navigation/native';
import AppContext from '../../navigator/AppContext';
import {baseUrl} from '../../contains';

const SearchResults = props => {
  const typeState = useState(null);
  const [data, setData] = useState();
  const [idData, setIdData] = useState([]);
  const route = useRoute();
  const [isLoading, setIsLoading] = useState(false);
  const {user} = useContext(AppContext);
  const navigation = useNavigation();

  const {originPlace, description, listPhotos, typeLock} = route.params;

  // const baseUrl =
  //   Platform.OS === 'ios' ? 'http://localhost:3000' : 'http://10.0.2.2:3000';

  const getArrayId = array => {
    array.map(value => {
      idData.push(value._id);
    });
  };

  useEffect(() => {
    console.log('origin lat hahaha:' + JSON.stringify(originPlace));
    console.log('description:' + description);
    console.log('length photo:' + listPhotos.length);
    console.log('type lock:' + typeLock);
    const source = axios.CancelToken.source();
    const url = `${baseUrl}/locksmith/location/find/${originPlace.details.geometry.location.lng}-${originPlace.details.geometry.location.lat}-${typeLock}`;
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(url, {cancelToken: source.token});

        if (response.status === 200) {
          console.log(response.data.data);
          setData(response.data.data);
          setIsLoading(false);
          return;
        } else {
          throw new Error('Failed to fetch users');
        }
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log('Data fetching cancelled');
        } else {
          setIsLoading(false);
        }
      }
    };
    fetchUsers();

    return () => source.cancel('Data fetching cancelled');
  }, []);

  const onSubmitFormHandler = async () => {
    var date = new Date();
    console.log(date);

    const idCustomer = user.uid;
    getArrayId(data);
    setIsLoading(true);
    try {
      const response = await axios.post(`${baseUrl}/order/create`, {
        customer_id: idCustomer,
        // customer_name: user.displayName,
        locksmith_accepted_id: '',
        locksmith_ids: idData,
        status: 'pending',
        description: description,
        listPhotos: listPhotos,
        type: typeLock,
        total: 0,
        is_paid: false,
        coordinates: [
          originPlace.details.geometry.location.lng,
          originPlace.details.geometry.location.lat,
        ],
        created_at: date,
        updated_at: '',
      });
      if (response.status === 201) {
        // Alert.alert(` You have created: ${JSON.stringify(response.data)}`);
        setIsLoading(false);
        setIdData([]);
        navigation.navigate('WaitingOrder', {idCustomer});
      } else {
        throw new Error('An error has occurred');
      }
    } catch (error) {
      Alert.alert('An error has occurred');
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <ScrollView>
      <View style={{}}>
        <View style={{height: Dimensions.get('window').height * 0.9}}>
          <RouteMap origin={originPlace} dataLocksmith={data} />
        </View>

        <View
          style={{
            borderWidth: 1,
            height: Dimensions.get('window').height * 0.1,
          }}>
          {/* <LocksmithTypes
            typeState={typeState}
            onSubmit={onSubmitFormHandler}
          /> */}
          <TouchableOpacity
            onPress={onSubmitFormHandler}
            style={{
              width: '95%',
              height: '80%',
              backgroundColor: '#1065e9',
              padding: 10,
              margin: 10,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 10,
            }}>
            <Text style={{color: '#fff', fontWeight: 'bold'}}>Xác nhận</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default SearchResults;
