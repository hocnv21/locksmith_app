import {
  ActivityIndicator,
  Alert,
  Dimensions,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {useInterval} from '../../API/useInterval';
import {useNavigation, useRoute} from '@react-navigation/native';

export default function WaitingOrderScreen() {
  const SIZE = {
    WIDTH: Dimensions.get('screen').width,
    HEIGHT: Dimensions.get('screen').height,
  };
  const route = useRoute();
  const navigation = useNavigation();
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const {idCustomer} = route.params;
  const baseUrl =
    Platform.OS === 'ios' ? 'http://localhost:3000' : 'http://10.0.2.2:3000';

  async function getOrder() {
    const source = axios.CancelToken.source();
    const url = `${baseUrl}/order/orderWorking/${idCustomer}`;
    console.log('waiting get order !!!!!!!!!');

    setIsLoading(true);
    await axios
      .get(url)
      .then(value => {
        console.log(value.data.data);
        setData(value.data.data);
        // navigation.navigate('OrderScreen', {data: value.data});
        setIsLoading(false);
        return;
      })
      .catch(e => {
        console.log('err get ' + e);
      });
  }

  useInterval(getOrder, 3000);

  if (!data) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator />
        <Text>đang tìm kiếm thợ khóa gần đây</Text>
        <Text>vui lòng chờ trong giây lát</Text>
      </View>
    );
  }
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
            source={require('../../assets/images/user.png')}
            // source={{uri: customer.image}}
          />
          <Text style={{fontSize: 20, fontWeight: '700'}}>
            Nguyen Phi Hoang
          </Text>
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
              12 Nguyễn Văn bảo
            </Text>
          </View>
        </View>
        {/* Detail  */}

        <View
          style={{backgroundColor: '#ffffff', padding: 20, borderRadius: 10}}>
          <Text style={{fontWeight: '600'}}>Thông tin hóa đơn:</Text>
          <Text>Mã Hóa Đơn: {data[0]._id}</Text>
          <Text>Thời gian đặt: {data[0].update_at}</Text>
        </View>

        {/* Button */}

        <View>
          <Pressable
            // onPress={() =>
            //   navigation.navigate('Order', {
            //     dataOrder: newOrders,
            //     locksmith: locksmiths,
            //   })
            // }
            onPress={() => console.log('presssssss')}
            style={{
              width: SIZE.WIDTH * 0.9,
              height: 60,
              backgroundColor: 'blue',
              justifyContent: 'center',
              alignItems: 'center',
              marginVertical: 40,
            }}>
            <Text style={{fontSize: 24, color: '#ffffff', fontWeight: '700'}}>
              Xem Chi Tiết
            </Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({});
