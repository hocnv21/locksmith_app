import {
  StyleSheet,
  Text,
  View,
  Platform,
  Dimensions,
  Image,
  TouchableOpacity,
  Pressable,
  Button,
  ScrollView,
  Alert,
  Linking,
} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
import AppContext from '../../navigator/AppContext';
import {useRoute, useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {baseUrl} from '../../contains/url';
import {COLORS, SIZES} from '../../contains';

export default function Unlocking() {
  const navigation = useNavigation();
  const {user} = useContext(AppContext);
  const SIZE = {
    WIDTH: Dimensions.get('screen').width,
    HEIGHT: Dimensions.get('screen').height,
  };
  const route = useRoute();
  const {newOrders, customer} = route.params;
  const [locksmiths, setLocksmiths] = useState(null);

  const onPressComplete = async () => {
    const configurationObject = {
      url: `${baseUrl}/order/complete/${newOrders._id}`,
      method: 'PUT',
    };

    await axios(configurationObject)
      .then(response => {
        if (response.status === 200) {
          navigation.navigate('HomeScreen');
        } else {
          throw new Error('An error has occurred asdasdasd');
        }
      })
      .catch(error => {
        alert('An error has occurred aaa' + error);
      });
  };
  const onSubmitPushNotification = async () => {
    const configurationObject = {
      url: `${baseUrl}/notification/acceptedDealCost`,
      method: 'POST',
      data: {
        userId: newOrders.customer_id,
        status: 'true',
      },
    };
    await axios(configurationObject)
      .then(response => {
        if (response.status === 201) {
          console.log('success push noti');
          Alert.alert('Bạn đã hoàn thành đơn !');
        } else {
          throw new Error('An error has occurred');
        }
      })
      .catch(error => {
        console.log(error);
        Alert.alert('An error noti' + error);
      });
  };
  async function onSubmitComplete() {
    await onPressComplete();
    await onSubmitPushNotification();
  }

  return (
    <>
      <ScrollView>
        <View
          style={{
            height: SIZE.HEIGHT,
            width: SIZE.WIDTH,
            padding: 20,
            marginTop: Platform.OS == 'ios' ? 40 : 20,
            backgroundColor: ' blue',
          }}>
          {/* Information */}
          <View
            style={[
              styles.inforUser,
              {marginVertical: 0, justifyContent: 'center'},
            ]}>
            <Text
              style={{
                fontSize: 24,
                fontWeight: '700',
                color: COLORS.background,
              }}>
              Bạn đã đến nơi sữa khóa
            </Text>
          </View>
          <View style={styles.inforUser}>
            <Image
              style={{
                resizeMode: 'contain',
                height: 70,
                width: 70,
                padding: 10,
                marginRight: 20,
                borderRadius: 40,
              }}
              // source={require('../../asset/images/user.png')}
              source={{uri: customer.image}}
            />
            <Text style={{fontSize: 20, fontWeight: '700'}}>
              {customer.name}
            </Text>
            <TouchableOpacity
              onPress={() => Linking.openURL(`tel:${customer.phoneNumber}`)}>
              <Image
                style={{
                  resizeMode: 'contain',
                  height: 30,
                  width: 30,
                  marginHorizontal: 10,
                }}
                source={require('../../assets/images/telephone.png')}
              />
            </TouchableOpacity>
          </View>

          {/* Location */}

          <View
            style={{
              marginVertical: 20,
              backgroundColor: '#ffffff',
              padding: 20,
              borderRadius: 10,
            }}>
            <Text style={{fontWeight: '600'}}>Địa chỉ:</Text>

            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                style={{
                  resizeMode: 'contain',
                  height: 20,
                  width: 20,
                  margin: 5,
                }}
                source={require('../../assets/images/placeholder.png')}
              />
              <Text style={{fontSize: 16, fontWeight: '700'}}>
                {newOrders.titleAddress}
              </Text>
            </View>
          </View>
          {/* Detail  */}

          <View
            style={{backgroundColor: '#ffffff', padding: 20, borderRadius: 10}}>
            <Text style={{fontWeight: '600'}}>Thông tin hóa đơn:</Text>
            <Text>Mã Hóa Đơn: {newOrders._id}</Text>
            <Text>Thời gian đặt: {newOrders.created_at}</Text>
          </View>

          {/* Button */}

          <View>
            <Pressable
              onPress={() => onSubmitComplete()}
              // onPress={() => console.log('presssssss')}
              style={{
                width: SIZE.WIDTH * 0.9,
                height: 60,
                backgroundColor: 'blue',
                justifyContent: 'center',
                alignItems: 'center',
                marginVertical: 40,
              }}>
              <Text style={{fontSize: 24, color: '#ffffff', fontWeight: '700'}}>
                Kết thúc đơn
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  inforUser: {
    width: '100%',
    height: SIZES.height * 0.1,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 30,
  },
});
