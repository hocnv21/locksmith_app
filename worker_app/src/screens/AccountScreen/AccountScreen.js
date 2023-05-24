import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import AppContext from '../../navigator/AppContext';
import AppBar from '../../components/Appbar/AppBar';
import AccountItems from '../../components/AccountComponents/AccountItems';
import {COLORS} from '../../contains';
import CustomButton from '../../components/LoginComponents/CustomButton';
import {baseUrl} from '../../contains/url';
import axios from 'axios';
import ModalAccount from '../../components/AccountComponents/ModalAccount';
import {useNavigation} from '@react-navigation/native';
import {getLocksmith} from '../../Api/RestFullApi';

export default function AccountScreen() {
  const navigation = useNavigation();
  const {user, setUser} = useContext(AppContext);
  const [data, setData] = useState(null);
  const [disable, setDisable] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const date = new Date(data?.birthDate ? data.birthDate : user.birthDate);
  useEffect(() => {
    getLocksmith(user._id, setData);
  }, []);
  useEffect(() => {
    const focusHandler = navigation.addListener('focus', () => {
      getLocksmith(user._id, setUser);
    });
    return focusHandler;
  }, []);
  if (!data) {
    return <ActivityIndicator />;
  }

  return (
    <>
      <AppBar centerText={'Thông tin tài khoản'} />
      <View style={styles.container}>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Image
            style={styles.img}
            source={{uri: data ? data.image : user.image}}
          />
          <Text style={styles.text1}>{data?.name ? data.name : user.name}</Text>
        </View>

        <AccountItems
          text={'Giới tính:'}
          value={
            data?.gender
              ? data.gender
                ? 'Nam'
                : 'Nữ'
              : user.gender
              ? 'Nam'
              : 'Nữ'
          }
        />
        <AccountItems
          text={'Ngày sinh:'}
          value={date.toLocaleDateString('en-GB')}
        />
        <AccountItems text={'Số điện thoại:'} value={user.phoneNumber} />

        <CustomButton
          title={'Sửa hồ sơ'}
          type={'PRIMARY'}
          onPress={() => setModalVisible(!modalVisible)}
        />
        <ModalAccount
          data={data}
          setData={setData}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffff',
    flex: 1,
    padding: 20,
  },
  img: {
    width: 150,
    height: 150,
    borderRadius: 100,
    resizeMode: 'cover',
  },
  text1: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  btn: {
    width: '90%',
    height: 50,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  textBtn: {
    color: '#ffffff',
    fontWeight: '700',
  },
});
