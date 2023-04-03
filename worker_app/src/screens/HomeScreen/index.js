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
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import styles from './styles';

import {useInterval} from '../../Api/useInterval';
import {useNavigation} from '@react-navigation/native';
import Geolocation from '@react-native-community/geolocation';

import AppContext from '../../navigator/AppContext';
import BottomView from '../../components/HomeComponents/BottomView';

const origin = {latitude: 10.82313, longitude: 106.688829};
const destination = {latitude: 10.82213, longitude: 106.686829};
const GOOGLE_MAPS_APIKEY = 'AIzaSyDYWtP2hykeWKnJHJIPaJcFff68Uecg-co';

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

  const androidPermissions = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Unlocker App location Permission',
          message:
            'Unlocker App needs access to your location ' +
            'so you can take awesome rides.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the location');
        subscribeLocationLocation();
      } else {
        console.log('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };
  useEffect(() => {
    if (Platform.OS === 'android') {
      androidPermissions();
    } else {
      //Android
      Geolocation.requestAuthorization();
    }
  }, []);
  const subscribeLocationLocation = () => {
    Geolocation.watchPosition(
      position => {
        //Will give you the location on location change

        console.log(position);

        //getting the Longitude from the location json
        const currentLongitude = JSON.stringify(position.coords.longitude);

        //getting the Latitude from the location json
        const currentLatitude = JSON.stringify(position.coords.latitude);

        //Setting Longitude state
        setCurrentLongitude(currentLongitude);

        //Setting Latitude state
        setCurrentLatitude(currentLatitude);
      },
      error => {
        console.log(error.message);
      },
      {
        enableHighAccuracy: false,
        maximumAge: 1000,
      },
    );
  };

  const onPressActive = () => {
    setIsActive(!isActive);
  };

  const onAccept = async () => {
    const idLocksmith = user.uid;
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

  const baseUrl =
    Platform.OS === 'ios'
      ? 'http://localhost:3000'
      : 'https://af22-2001-ee0-4fc4-af90-71c0-c896-33e6-bf5c.ap.ngrok.io';

  function getCustomer() {
    const source = axios.CancelToken.source();

    const url = `${baseUrl}/customer/${newOrders[0].customer_id}`;
    console.log('waiting  get customer !!!!!!!!!');

    axios
      .get(url)
      .then(value => {
        console.log(value.data.data);
        setCustomer(value.data.data);
        return;
      })
      .catch(e => {
        console.log('err get ' + e);
        console.log(customer);
      });
  }
  async function getOrder() {
    const source = axios.CancelToken.source();

    const idCustomer = user.uid;
    const url = `${baseUrl}/order/pendingOrder/${idCustomer}`;
    console.log('waiting get order !!!!!!!!!');

    await axios
      .get(url)
      .then(value => {
        console.log(value.data.data);
        setNewOrders(value.data.data);
        getCustomer();
        setModalVisible(true);
        return;
      })
      .catch(e => {
        console.log('err get ' + e);
      });
  }

  // useInterval(getOrder, 4000);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        showsMyLocationButton={true}
        // onUserLocationChange={onUserLocationChange}
        initialRegion={{
          latitude: currentLatitude,
          longitude: currentLongitude,
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

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        {customer && (
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Bạn có một đơn mới !</Text>
              <Text style={styles.modalText}>Khach Hang : {customer.name}</Text>
              <Text style={styles.modalText}></Text>

              <View style={{flexDirection: 'row'}}>
                <Pressable
                  style={[styles.button]}
                  onPress={() => setModalVisible(!modalVisible)}>
                  <Text style={styles.textStyle}>Từ Chối</Text>
                </Pressable>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => onAccept()}>
                  <Text style={styles.textStyle}>Chấp Nhận</Text>
                </Pressable>
              </View>
            </View>
          </View>
        )}
      </Modal>
    </View>
  );
};

export default HomeScreen;
