/* eslint-disable react-hooks/rules-of-hooks */
import {
  View,
  Image,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import {
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';

import auth from '@react-native-firebase/auth';

import styles from './style';

import Pressable_line from '../../components/LoginComponents/Pressable_line';

import CustomButton from '../../components/LoginComponents/CustomButton';
import LoginPhone from '../../components/LoginComponents/LoginPhone';
import OTPScreen from '../OTPScreen/OTPScreen';

import axios from 'axios';
import {baseUrl} from '../../contains/url';

const CELL_COUNT = 6;

export default function LoginScreen({navigation}) {
  const [email, setEmail] = useState('hoang@gmail.com');
  const [password, setPassword] = useState('112233');

  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const logoLink = require('../../assets/images/lock.png');

  // If null, no SMS has been sent
  const [confirm, setConfirm] = useState(null);
  // verification code (OTP - One-Time-Passcode)
  const [value, setValue] = useState('');

  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  // Phone input
  const [formattedValue, setFormattedValue] = useState('');
  const [valid, setValid] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const [statusMessage, setStatusMessage] = useState(false);
  const phoneInput = useRef(null);

  async function getExitsUser(phone) {
    const url = `${baseUrl}/customer/phoneNumber/${phone}`;
    const result = await axios
      .get(url, {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Mobile Safari/537.36 Edg/115.0.0.0',
        },
      })
      .then(response => {
        if (response.status === 404) {
          setStatusMessage(false);
          return false;
        } else {
          setStatusMessage(true);
          return true;
        }
      })
      .catch(e => {
        console.log('err get ' + e.response?.data);
      });

    return result;
  }

  const onHandleLogin = async () => {
    const checkValid = phoneInput.current?.isValidNumber(phoneNumber);

    setValid(checkValid ? checkValid : false);
    if (checkValid) {
      console.log(formattedValue.replace('0', ''));
      const phoneFormat = formattedValue.replace('0', '');

      const kq = await getExitsUser(phoneFormat);
      if (kq) {
        console.log('yes');

        const confirmation = await auth().signInWithPhoneNumber(formattedValue);
        setConfirm(confirmation);
      } else {
        console.log('noo');
        setShowMessage(true);
      }
    } else {
      setShowMessage(true);
    }
  };

  const handleRegister = () => {
    navigation.navigate('Register');
  };

  async function signInWithPhoneNumber(phoneNumber) {
    const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
    console.log('loginPhone' + JSON.stringify(confirmation));
    setConfirm(confirmation);
  }

  async function confirmCode(code) {
    try {
      if (code.length === 6) {
        const credential = auth.PhoneAuthProvider.credential(
          confirm.verificationId,
          code,
        );

        const result = await auth().signInWithCredential(credential);
        console.log('login dang nhap ' + JSON.stringify(result.user.uid));
      }
      // const credential = auth.PhoneAuthProvider.credential(confirm.verificationId,code)
    } catch (error) {
      console.log('Invalid code.');
    }
  }
  if (confirm == null) {
    return (
      <ScrollView>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.container}>
          <View style={styles.top}>
            <Image style={styles.logo} source={logoLink} />
          </View>
          <View style={styles.bottom}>
            <View style={styles.form}>
              <View style={styles.welcom}>
                <Text style={styles.h1}>Chào mừng bạn</Text>
                <Pressable_line
                  textStart={'Bạn chưa có tài khoản?'}
                  textPressable={'Đăng ký ngay'}
                  onPress={handleRegister}
                />
              </View>

              <Text>Số điện thoại</Text>
              <LoginPhone
                showMessage={showMessage}
                statusMessage={statusMessage}
                setShowMessage={setShowMessage}
                phoneNumber={phoneNumber}
                setPhoneNumber={setPhoneNumber}
                formattedValue={formattedValue}
                setFormattedValue={setFormattedValue}
                valid={valid}
                setValid={setValid}
                stateScreen={'login'}
                phoneInput={phoneInput}
              />

              <CustomButton
                onPress={onHandleLogin}
                title="Đăng nhập"
                disabled={!email || !password}
                type="PRIMARY"
              />
            </View>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    );
  }

  return (
    <>
      <OTPScreen phoneNumber={formattedValue} confirmCode={confirmCode} />
    </>
  );
}
