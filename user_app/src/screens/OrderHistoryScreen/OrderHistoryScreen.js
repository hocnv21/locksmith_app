import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import AppBar from '../../components/Appbar/AppBar';
import {SIZES} from '../../contains';
import ActionComponent from '../../components/OrderHistoryComponents/ActionComponent';
import Dashboard from '../../components/OrderHistoryComponents/Dashboard';
import {getAllOrderByCustomerId} from '../../API/RestFullApi';
import AppContext from '../../navigator/AppContext';
import {baseUrl} from '../../contains';
import axios from 'axios';
import OrderItems from '../../components/OrderHistoryComponents/OrderItems';
import {useNavigation} from '@react-navigation/native';

export default function OrderHistoryScreen() {
  const navigation = useNavigation();
  const {user} = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isSelectButton, setIsSelectButton] = useState('All');
  const [numOrder, setNumOrder] = useState(null);
  const [numOrderComplete, setNumOrderComplete] = useState(0);
  const [numOrderCancel, setNumOrderCancel] = useState(0);
  const [data, setData] = useState(null);
  const [dataComplete, setDataComplete] = useState([]);
  const [dataCancel, setDataCancel] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  async function getCount() {
    const url = `${baseUrl}/order/getCount/${user._id}`;
    await axios.get(url).then(response => {
      if (response.status === 404) {
        return 'error found order';
      }
      if (response.status === 200) {
        console.log(response.data.data);
        setNumOrder(response.data.data);
      }
    });
  }

  async function getOrder() {
    const url = `${baseUrl}/order/allOrderByCustomer/${user._id}`;
    setDataCancel([]);
    setDataComplete([]);
    await axios.get(url).then(response => {
      if (response.status === 404) {
        return 'error found order';
      }
      if (response.status === 200) {
        setData(response.data.data);
      }
    });
  }

  async function getOrderComplete() {
    const url = `${baseUrl}/order/orderComplete/${user._id}`;
    await axios.get(url).then(response => {
      if (response.status === 404) {
        return 'error found order';
      }
      if (response.status === 200) {
        setData(response.data.data);
      }
    });
  }
  async function getOrderCancel() {
    const url = `${baseUrl}/order/orderCancel/${user._id}`;
    await axios
      .get(url)
      .then(response => {
        if (response.status === 200) {
          setData(response.data.data);
        } else {
          setData([]);
          return;
        }
      })
      .catch(error => setData([]));
  }

  useEffect(() => {
    getOrder();
    getCount();
  }, []);
  useEffect(() => {
    const focusHandler = navigation.addListener('focus', () => {
      getOrder();
      getCount();
    });
    return focusHandler;
  }, []);
  async function onPressAll() {
    setIsSelectButton('All');
    await getOrder();
  }
  async function onPressOrderComplete() {
    setIsSelectButton('Complete');
    await getOrderComplete();
  }
  async function onPressOrderCancel() {
    setIsSelectButton('Cancel');
    await getOrderCancel();
  }
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getOrder();
    getCount();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  if (!data && !numOrder) {
    return (
      <View>
        <ActivityIndicator />
      </View>
    );
  }
  return (
    <>
      <AppBar centerText={'Đơn sửa khóa'} rightText={' '} />
      <View style={styles.container}>
        {numOrder && (
          <Dashboard
            numberFirst={
              numOrder[0].countAll +
              (numOrder[1]?.countAll ? numOrder[1].countAll : 0)
            }
            numberSecond={
              numOrder[0]._id.status === 'complete'
                ? numOrder[0].countAll
                : numOrder[1]?.countAll
            }
            numberThird={
              numOrder[0]._id.status === 'canceled'
                ? numOrder[0].countAll
                : numOrder[1]?.countAll
                ? numOrder[1].countAll
                : 0
            }
          />
        )}

        <ActionComponent
          onPressAll={onPressAll}
          onPressOrderComplete={onPressOrderComplete}
          onPressOrderCancel={onPressOrderCancel}
          isSelectButton={isSelectButton}
        />
        <View
          style={{
            width: '100%',
            height: '80%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {data !== null ? (
            <FlatList
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
              style={{width: '100%'}}
              data={data}
              renderItem={({item}) => <OrderItems item={item} />}
              keyExtractor={item => item._id}
            />
          ) : (
            <Text>Không có hóa đơn nào ở đây hết !!</Text>
          )}
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'red',
    width: SIZES.width,
    height: SIZES.height,
    alignItems: 'center',
  },
});
