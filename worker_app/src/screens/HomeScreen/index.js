import {
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  View,
  Platform,
  Alert,
  PermissionsAndroid,
  Modal,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

import axios from 'axios';

import Entypo from 'react-native-vector-icons/Entypo';

import styles from './styles';

import {useInterval} from '../../Api/useInterval';
import {useNavigation} from '@react-navigation/native';
import Geolocation from '@react-native-community/geolocation';

import AppContext from '../../navigator/AppContext';
import BottomView from '../../components/HomeComponents/BottomView';
import {URL_DEVICE} from '@env';
import {baseUrl} from '../../contains/url';
import ModalOrder from '../../components/HomeComponents/ModalOrder';
import ModalDealCost from '../../components/OrderComponents/ModalDealCost';
import messaging from '@react-native-firebase/messaging';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
const origin = {latitude: 10.82313, longitude: 106.688829};
const destination = {latitude: 10.82213, longitude: 106.686829};
const GOOGLE_MAPS_APIKEY = 'AIzaSyDvH3f3z8eYs8Q-IolL2xJIshzQgjuQnV8';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [locksmith, setLocksmith] = useState(null);
  const [customer, setCustomer] = useState(null);
  const [order, setOrder] = useState(null);
  const [isActive, setIsActive] = useState(true);
  const [currentLatitude, setCurrentLatitude] = useState('');
  const [currentLongitude, setCurrentLongitude] = useState('');
  const [myPosition, setMyPosition] = useState(null);

  const [newOrders, setNewOrders] = useState([]);

  const {user} = useContext(AppContext);
  const [loading, setLoading] = useState(true);
  const [initialRoute, setInitialRoute] = useState('HomeScreen');

  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  }
  async function saveTokenToDatabase(token) {
    // Assume user is already signed in
    const userId = auth().currentUser.uid;

    // Add the token to the users datastore

    await firestore()
      .collection('users')
      .doc(userId)
      .set({
        tokens: firestore.FieldValue.arrayUnion(token),
      });
  }
  async function getTokenMessaging() {
    if (Platform.OS === 'ios') {
      messaging()
        .getAPNSToken()
        .then(token => {
          return saveTokenToDatabase(token);
        });
    } else {
      messaging()
        .getToken()
        .then(token => {
          return saveTokenToDatabase(token);
        });
    }
    return messaging().onTokenRefresh(token => {
      saveTokenToDatabase(token);
    });
  }
  useEffect(() => {
    if (Platform.OS === 'ios') {
      requestUserPermission();
    }
    getTokenMessaging();
  }, []);
  const onPressActive = () => {
    setIsActive(!isActive);
  };

  const onAccept = async () => {
    const idLocksmith = user._id;
    const configurationObject = {
      url: `${baseUrl}/order/accepted/${newOrders[0]._id}`,
      method: 'PUT',
      data: {
        locksmith_accepted_id: idLocksmith,
      },
    };
    console.log('accept .................................!');

    await axios(configurationObject)
      .then(response => {
        if (response.status === 200) {
          // alert(` You have updated: ${JSON.stringify(response.data)}`);
          setModalVisible(false);
          navigation.navigate('OrderDetail', {
            newOrders: newOrders[0],
            customer: customer,
            locksmith: locksmith,
          });
        } else {
          throw new Error('An error has occurred');
        }
      })
      .catch(error => {
        alert('An error has occurred');
      });
  };

  const onDirectionFound = event => {
    console.log('Direction found: ', event);
    if (order) {
      setOrder({
        ...order,
        distance: event.distance,
        duration: event.duration,
        pickedUp: order.pickedUp || event.distance < 0.2,
        isFinished: order.pickedUp && event.distance < 0.2,
      });
    }
  };

  const getDestination = () => {
    if (order && order.pickedUp) {
      return {
        latitude: order.destLatitude,
        longitude: order.destLongitude,
      };
    }
    return {
      latitude: order.originLatitude,
      longitude: order.originLongitude,
    };
  };

  function getCustomer() {
    const source = axios.CancelToken.source();

    const url = `${baseUrl}/customer/${newOrders[0].customer_id}`;
    // console.log('waiting  get customer !!!!!!!!!');

    axios
      .get(url)
      .then(value => {
        setCustomer(value.data.data);
        return;
      })
      .catch(e => {
        console.log('err get ' + e);
        // console.log(customer);
      });
  }
  async function getOrder() {
    const source = axios.CancelToken.source();

    const url = `${baseUrl}/order/pendingOrder/${user._id}`;
    // console.log('waiting get order !!!!!!!!!');

    await axios
      .get(url)
      .then(value => {
        if (value.data.data[0].status === 'pending') {
          setNewOrders(value.data.data);
          getCustomer();
          setModalVisible(true);
          console.log(newOrders[0].type);
          return;
        }
      })
      .catch(e => {
        console.log('err get ' + e);
      });
  }

  // useInterval(getOrder, 2000);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        showsMyLocationButton={true}
        // onUserLocationChange={onUserLocationChange}
        initialRegion={{
          latitude: 10.82213,
          longitude: 106.686829,
          latitudeDelta: 0.0222,
          longitudeDelta: 0.0121,
        }}>
        {order && (
          <MapViewDirections
            origin={{
              latitude: locksmith?.latitude,
              longitude: locksmith?.longitude,
            }}
            onReady={onDirectionFound}
            destination={getDestination()}
            apikey={GOOGLE_MAPS_APIKEY}
            strokeWidth={5}
            strokeColor="black"
          />
        )}
      </MapView>

      <Pressable
        onPress={() => console.warn('Balance')}
        style={styles.balanceButton}>
        <Text style={styles.balanceText}>
          <Text style={{color: 'green'}}>VND</Text> 0.00
        </Text>
      </Pressable>

      <Pressable
        onPress={() => navigation.openDrawer()}
        style={styles.roundButton}>
        <Entypo name="menu" size={28} color={'#4a4a4a'} />
      </Pressable>

      <BottomView isActive={isActive} onPress={onPressActive} />

      {newOrders.length > 0 && (
        <ModalOrder
          setModalVisible={setModalVisible}
          modalVisible={modalVisible}
          newOrders={newOrders[0]}
          onAccept={onAccept}
        />
      )}
    </View>
  );
};

export default HomeScreen;
