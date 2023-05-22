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
import {baseUrl} from '../../contains';
export default function WaitingOrderScreen() {
  const SIZE = {
    WIDTH: Dimensions.get('screen').width,
    HEIGHT: Dimensions.get('screen').height,
  };
  const route = useRoute();
  const navigation = useNavigation();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const {idCustomer} = route.params;
  // const baseUrl =
  //   Platform.OS === 'ios' ? 'http://localhost:3000' : 'http://10.0.2.2:3000';

  async function getOrder() {
    const source = axios.CancelToken.source();
    const url = `${baseUrl}/order/orderWorking/${idCustomer}`;

    setIsLoading(true);
    await axios
      .get(url)
      .then(value => {
        navigation.navigate('Order', {data: value.data.data});
        // setData(value.data.data);
        return;
      })
      .catch(e => {
        console.log('err get ' + e);
      });
  }

  useInterval(getOrder, 2000);

  // if (data !== null) {
  //   navigation.navigate('Order', {data: data});
  // }
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator />
      <Text>đang tìm kiếm thợ khóa gần đây</Text>
      <Text>vui lòng chờ trong giây lát</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
