import React, {useContext, useEffect, useState} from 'react';
import {
  Dimensions,
  View,
  StyleSheet,
  Text,
  ScrollView,
  Pressable,
  Platform,
  Image,
  TouchableOpacity,
  PixelRatio,
  Alert,
} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import HomeMap from '../../components/HomeMap';
import HomeSearch from '../../components/HomeSearch';
import {COLORS, SIZES} from '../../contains/theme';
import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
// import SloganMessage from '../../components/SloganMessage';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AppBar from '../../components/Appbar/AppBar';
import category from '../../assets/data/category';
import ServiceItem from '../../components/HomeComponents/ServiceItem';
import AppContext from '../../navigator/AppContext';
import moment, {isDate} from 'moment';

const HomeScreen = () => {
  const {user} = useContext(AppContext);
  const navigation = useNavigation();
  const [typeLock, setTypeLock] = useState('');
  function handlePressItem() {
    // navigation.navigate('FormInput', {typeLock: value.type});
  }
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
  async function registerAppWithFCM() {
    await messaging().registerDeviceForRemoteMessages();
  }

  async function getTokenMessaging() {
    if (Platform.OS === 'ios') {
      await registerAppWithFCM();
      await messaging()
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

  return (
    <>
      <AppBar rightText={`xin chào, ${user.name}`} />
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.textHeader}>Bạn đang tìm dịch vụ gì nè ? </Text>
          </View>
          <View style={styles.content}>
            {category.map((value, index) => (
              <ServiceItem key={index} value={value} />
            ))}
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    // padding: 10,
    // marginTop: Platform.OS === 'ios' ? 45 : 0,
    backgroundColor: COLORS.background,
    height: SIZES.height,
    width: SIZES.width,
  },
  header: {
    padding: 10,
    height: SIZES.height * 0.13,

    // backgroundColor: '#000000',
  },
  textHeader: {
    fontSize: 32,
    fontWeight: '700',
    color: '#ffffff',
  },
  content: {
    // marginBottom: 20,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 10,
    height: SIZES.height * 0.87,
    width: SIZES.width,
    backgroundColor: '#ffffff',
  },
});
