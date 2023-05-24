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
  Linking,
  Platform,
} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import {useInterval} from '../../API/useInterval';
import {useNavigation, useRoute} from '@react-navigation/native';
import {COLORS, SIZES, baseUrl} from '../../contains';
import AppContext from '../../navigator/AppContext';
import messaging from '@react-native-firebase/messaging';
import ModalDealCost from '../../components/OrderComponents/ModalDealCost';
import {getLocksmith} from '../../API/RestFullApi';

export default function OrderScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const {user} = useContext(AppContext);
  const {data} = route.params;
  const [locksmith, setLocksmith] = useState(null);
  const [showModalDealCost, setShowModalDealCost] = useState(false);
  const [cost, setCost] = useState('');
  const [stateScreen, setStateScreen] = useState('first');

  const showAlertCancel = () =>
    Alert.alert(
      'Thông báo',
      'Bạn muốn hủy đơn hàng ?',

      [
        {
          text: 'Thoát',
          style: 'default',
        },
        {
          text: 'Đồng ý',
          onPress: () => cancelOrder(),
          style: 'default',
        },
      ],
    );
  const onUpdateTotal = async () => {
    const configurationObject = {
      url: `${baseUrl}/order/dealCost/${data[0]._id}`,
      method: 'PUT',
      data: {
        total: Number(cost),
      },
    };
    console.log('accept .................................!');

    await axios(configurationObject)
      .then(response => {
        if (response.status === 201) {
          setStateScreen('second');
        } else {
          throw new Error('An error has occurred');
        }
      })
      .catch(error => {
        Alert.alert('error database' + error);
      });
  };
  const onSubmitPushNotification = async () => {
    console.log(data[0]);
    const configurationObject = {
      url: `${baseUrl}/notification/acceptedDealCost`,
      method: 'POST',
      data: {
        userId: data[0].locksmith_accepted_id,
        status: 'true',
      },
    };
    await axios(configurationObject)
      .then(response => {
        if (response.status === 201) {
          console.log('success push noti');
          Alert.alert('Thông báo', 'Bạn đã chấp nhận giá đơn hàng thành công');
        } else {
          throw new Error('An error has occurred');
        }
      })
      .catch(error => {
        console.log(error);
        Alert.alert('An error noti' + error);
      });
  };
  const OnPressSubmit = async () => {
    await onUpdateTotal();
    await onSubmitPushNotification();
    setShowModalDealCost(false);
  };
  const onCancelPushNotification = async () => {
    const configurationObject = {
      url: `${baseUrl}/notification/acceptedDealCost`,
      method: 'POST',
      data: {
        userId: data[0].locksmith_accepted_id,
        status: 'false',
      },
    };
    await axios(configurationObject)
      .then(response => {
        if (response.status === 201) {
        } else {
          throw new Error('An error has occurred');
        }
      })
      .catch(error => {
        Alert.alert('An error has occurred' + error);
      });
  };

  async function cancelOrder() {
    const configurationObject = {
      url: `${baseUrl}/order/cancel/${data[0]._id}`,
      method: 'PUT',
    };
    await axios(configurationObject)
      .then(response => {
        if (response.status === 201) {
          onCancelPushNotification();
          navigation.navigate('HomeScreen');
        } else {
          throw new Error('An error cancel');
        }
      })
      .catch(error => {
        console.log('An error cancel' + error);
      });
  }
  function setValueModal(remoteMessage) {
    setCost(remoteMessage.data.cost);
    setShowModalDealCost(!showModalDealCost);
  }
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      // Alert.alert(
      //   'A new FCM message arrived!',
      //   JSON.stringify(remoteMessage.data.cost),
      // );
      if (remoteMessage.data.status === 'true') {
        Alert.alert('Đơn sửa khóa đã hoàn thành  !');
        navigation.navigate('HomeScreen');
      } else {
        setValueModal(remoteMessage);
      }
    });

    return unsubscribe;
  }, []);
  useEffect(() => {
    getLocksmith(data[0].locksmith_accepted_id, setLocksmith);
  }, []);

  return (
    <ScrollView>
      <View style={styles.container}>
        {/* Information */}
        {locksmith && (
          <View style={styles.viewHeader}>
            <Image
              style={styles.avatar}
              source={{uri: locksmith.image}}
              // source={{uri: customer.image}}
            />
            <Text style={{fontSize: 20, fontWeight: '700'}}>
              {locksmith.name}
            </Text>
            <TouchableOpacity
              onPress={() => Linking.openURL(`tel:${locksmith.phoneNumber}`)}>
              <Image
                style={styles.iconContact}
                source={require('../../assets/images/telephone.png')}
              />
            </TouchableOpacity>
          </View>
        )}

        {/* Location */}

        <View style={styles.viewLocation}>
          <Text style={{fontWeight: '600'}}>Địa chỉ:</Text>

          <View style={styles.viewDirection}>
            <Image
              style={styles.icon}
              source={require('../../assets/images/placeholder.png')}
            />
            <Text style={{fontSize: 16, fontWeight: '700'}}>
              {data[0].titleAddress}
            </Text>
          </View>
        </View>
        {/* Detail  */}

        <View style={styles.viewInfo}>
          <Text style={{fontWeight: '600'}}>Thông tin hóa đơn:</Text>
          <Text>Mã Hóa Đơn: {data[0]._id}</Text>
          <Text>Thời gian đặt: {data[0].created_at}</Text>
        </View>

        {/* Button */}

        <View>
          {stateScreen === 'first' ? (
            <>
              <Text style={styles.textNotification}>
                *Tình trạng ổ khóa của bạn đã được gửi cho thợ khóa xem xét.
              </Text>
              <Text style={styles.textNotification}>
                *Bậy giờ bạn có thể trao đỗi với thợ khóa để nhận báo giá sửa
                chữa và tiếp tục đơn hàng.
              </Text>
              <TouchableOpacity
                onPress={showAlertCancel}
                style={styles.btnCancel}>
                <Text
                  style={{fontSize: 24, color: '#ffffff', fontWeight: '700'}}>
                  Hủy
                </Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <Text style={styles.textNotification}>*Xin vui lòng chờ.</Text>
              <Text style={styles.textNotification}>
                *Thợ sữa khóa đang trên đường đến chỗ bạn.
              </Text>
            </>
          )}
        </View>
        {cost.length > 0 && (
          <ModalDealCost
            modalVisible={showModalDealCost}
            setModalVisible={setShowModalDealCost}
            valueCost={cost}
            onSubmit={() => OnPressSubmit()}
            onCancel={showAlertCancel}
          />
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: SIZES.height,
    width: SIZES.width,
    padding: 20,
    marginTop: Platform.OS == 'ios' ? 40 : 20,
    backgroundColor: ' blue',
  },
  textNotification: {
    fontSize: 18,
    fontWeight: '600',
    color: 'red',
    marginTop: 10,
  },
  avatar: {
    resizeMode: 'contain',
    height: 70,
    width: 70,
    padding: 10,
    marginRight: 20,
    borderRadius: 40,
  },
  viewHeader: {
    width: '100%',
    height: SIZES.height * 0.1,
    backgroundColor: '#ffffff',
    borderRadius: 10,

    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 30,
  },
  viewLocation: {
    marginVertical: 20,
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 10,
  },
  iconContact: {
    resizeMode: 'contain',
    height: 30,
    width: 30,
  },
  viewDirection: {flexDirection: 'row', alignItems: 'center'},
  icon: {
    resizeMode: 'contain',
    height: 20,
    width: 20,
    margin: 5,
  },
  viewInfo: {backgroundColor: '#ffffff', padding: 20, borderRadius: 10},
  btnCancel: {
    width: SIZES.width * 0.9,
    borderWidth: 0.5,
    borderRadius: 5,
    height: 60,
    backgroundColor: COLORS.light_gray,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 40,
  },
});
