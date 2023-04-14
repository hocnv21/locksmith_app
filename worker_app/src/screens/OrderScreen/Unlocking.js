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
} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
import AppContext from '../../navigator/AppContext';
import {useRoute, useNavigation} from '@react-navigation/native';
import axios from 'axios';

export default function Unlocking() {
  const baseUrl =
    Platform.OS === 'ios'
      ? 'http://localhost:3000'
      : 'https://d25c-2001-ee0-4fc4-af90-e187-11b6-a37a-c15c.ap.ngrok.io';
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
    const idLocksmith = user.uid;
    const configurationObject = {
      url: `${baseUrl}/order/complete/${newOrders._id}`,
      method: 'PUT',
    };

    await axios(configurationObject)
      .then(response => {
        if (response.status === 200) {
          navigation.navigate('HomeScreen');
        } else {
          throw new Error('An error has occurred');
        }
      })
      .catch(error => {
        alert('An error has occurred');
      });
  };

  return (
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
          style={{
            width: '100%',
            height: SIZE.HEIGHT * 0.1,
            backgroundColor: '#ffffff',
            borderRadius: 10,

            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 30,
          }}>
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
          <Text style={{fontSize: 20, fontWeight: '700'}}>{customer.name}</Text>
          <TouchableOpacity>
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
          <TouchableOpacity>
            <Image
              style={{
                resizeMode: 'contain',
                height: 30,
                width: 30,
              }}
              source={require('../../assets/images/message.png')}
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
              source={require('../../assets/images/rec.png')}
            />
            <Text style={{fontSize: 16, fontWeight: '700'}}>17 Lê Lợi</Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              style={{
                resizeMode: 'contain',
                height: 20,
                width: 20,
                margin: 5,
              }}
              source={require('../../assets/images/dotted-barline.png')}
            />
            <Text> </Text>
          </View>
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
              12 Nguyễn Văn Bảo
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
            onPress={onPressComplete}
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
  );
}

const styles = StyleSheet.create({});
