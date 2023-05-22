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
import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import {useInterval} from '../../API/useInterval';
import {useNavigation, useRoute} from '@react-navigation/native';
import {COLORS, SIZES, baseUrl} from '../../contains';
import AppContext from '../../navigator/AppContext';
import messaging from '@react-native-firebase/messaging';
import ModalDealCost from '../../components/OrderComponents/ModalDealCost';

export default function OrderAcceptedScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const {user} = useContext(AppContext);
  const {data} = route.params;
  const [showModalDealCost, setShowModalDealCost] = useState(false);
  const [cost, setCost] = useState('');

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

  async function cancelOrder() {
    const configurationObject = {
      url: `${baseUrl}/order/cancel/${data[0]._id}`,
      method: 'PUT',
    };
    await axios(configurationObject)
      .then(response => {
        if (response.status === 201) {
          // alert(` You have updated: ${JSON.stringify(response.data)}`);
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

  return (
    <ScrollView>
      <View style={styles.container}>
        {/* Information */}
        <View style={styles.viewHeader}>
          <Image
            style={styles.avatar}
            source={require('../../assets/images/user.png')}
            // source={{uri: customer.image}}
          />
          <Text style={{fontSize: 20, fontWeight: '700'}}>
            Nguyen Phi Hoang
          </Text>
          <TouchableOpacity>
            <Image
              style={styles.iconContact}
              source={require('../../assets/images/telephone.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              style={styles.iconContact}
              source={require('../../assets/images/message.png')}
            />
          </TouchableOpacity>
        </View>

        {/* Location */}

        <View style={styles.viewLocation}>
          <Text style={{fontWeight: '600'}}>Địa chỉ:</Text>
          <View style={styles.viewDirection}>
            <Image
              style={styles.icon}
              source={require('../../assets/images/rec.png')}
            />
            <Text style={{fontSize: 16, fontWeight: '700'}}>17 Lê Lợi</Text>
          </View>
          <View style={styles.viewDirection}>
            <Image
              style={styles.icon}
              source={require('../../assets/images/dotted-barline.png')}
            />
            <Text> </Text>
          </View>
          <View style={styles.viewDirection}>
            <Image
              style={styles.icon}
              source={require('../../assets/images/placeholder.png')}
            />
            <Text style={{fontSize: 16, fontWeight: '700'}}>
              12 Nguyễn Văn bảo
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
          <Text style={styles.textNotification}>*Xin vui lòng chờ.</Text>
          <Text style={styles.textNotification}>
            *Thợ sữa khóa đang trên đường đến chỗ bạn.
          </Text>
          {/* <TouchableOpacity onPress={showAlertCancel} style={styles.btnCancel}>
            <Text style={{fontSize: 24, color: '#ffffff', fontWeight: '700'}}>
              Hủy
            </Text>
          </TouchableOpacity> */}
        </View>
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
