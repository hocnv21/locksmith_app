import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useState} from 'react';
import AppContext from '../../navigator/AppContext';
import AppBar from '../../components/Appbar/AppBar';
import AccountItems from '../../components/AccountComponents/AccountItems';
import {COLORS} from '../../contains';
import CustomButton from '../../components/LoginComponents/CustomButton';

export default function AccountScreen() {
  const {user} = useContext(AppContext);
  const [disable, setDisable] = useState(true);
  const date = new Date(user.birthDate);
  return (
    <>
      <AppBar centerText={'Thông tin tài khoản'} />
      <View style={styles.container}>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Image style={styles.img} source={{uri: user.image}} />
          <Text style={styles.text1}>{user.name}</Text>
        </View>

        <AccountItems text={'Giới tính:'} value={user.gender ? 'Nam' : 'Nữ'} />
        <AccountItems
          text={'Ngày sinh:'}
          value={date.toLocaleDateString('en-GB')}
        />
        <AccountItems text={'Số điện thoại:'} value={user.phoneNumber} />

        <CustomButton
          title={'Sửa hồ sơ'}
          type={'PRIMARY'}
          onPress={() => console.log('press')}
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
