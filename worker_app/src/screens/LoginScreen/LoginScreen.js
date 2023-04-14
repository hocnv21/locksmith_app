/* eslint-disable react-hooks/rules-of-hooks */
import {
  View,
  Image,
  Text,
  ScrollView,
  ImageBackground,
  Button,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import PhoneInput from 'react-native-phone-number-input';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import {TextInput} from 'react-native-paper';

import styles from './style';
import TextLine from '../../components/LoginComponents/TextLine';
import Pressable_line from '../../components/LoginComponents/Pressable_line';
import Logo_Login from '../../components/LoginComponents/Logo_Login';
import CustomButton from '../../components/LoginComponents/CustomButton';
import LoginPhone from '../../components/LoginComponents/LoginPhone';
import OTPScreen from '../OTPScreen/OTPScreen';

const CELL_COUNT = 6;

export default function LoginScreen({navigation}) {
  const [email, setEmail] = useState('hoang@gmail.com');
  const [password, setPassword] = useState('112233');

  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const logoLink = require('../../assets/images/logo.png');

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
  const phoneInput = useRef(null);

  const onHandleLogin = async () => {
    const checkValid = phoneInput.current?.isValidNumber(phoneNumber);

    setValid(checkValid ? checkValid : false);
    if (checkValid) {
      const confirmation = await auth().signInWithPhoneNumber(formattedValue);
      setConfirm(confirmation);
      confirm !== null
        ? navigation.navigate('OTPScreen', {confirm: confirm})
        : null;
      // navigation.navigate('OTPScreen', {confirm: confirmation});
    } else {
      console.log(formattedValue);
      setShowMessage(true);
    }
  };

  const handleRegister = () => {
    navigation.navigate('Register');
  };
  // function onAuthStateChanged(user) {
  //   if (user) {
  //     // Some Android devices can automatically process the verification code (OTP) message, and the user would NOT need to enter the code.
  //     // Actually, if he/she tries to enter it, he/she will get an error message because the code was already used in the background.
  //     // In this function, make sure you hide the component(s) for entering the code and/or navigate away from this screen.
  //     // It is also recommended to display a message to the user informing him/her that he/she has successfully logged in.
  //     console.log(user);
  //     navigation.navigate('Test');
  //   }
  // }

  // useEffect(() => {
  //   const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
  //   return subscriber; // unsubscribe on unmount
  // }, []);

  async function signInWithPhoneNumber(phoneNumber) {
    const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
    console.log('loginPhone' + JSON.stringify(confirmation));
    setConfirm(confirmation);
  }

  async function confirmCode(code) {
    try {
      if (code.length === 6) await confirm.confirm(code);
    } catch (error) {
      console.log('Invalid code.');
    }
  }
  if (!confirm) {
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
                <Text style={styles.h1}>Welcome</Text>
                <Pressable_line
                  textStart={"Don't have an account?"}
                  textPressable={'Register now'}
                  onPress={handleRegister}
                />
              </View>

              <Text>Số điện thoại</Text>
              <LoginPhone
                showMessage={showMessage}
                setShowMessage={setShowMessage}
                phoneNumber={phoneNumber}
                setPhoneNumber={setPhoneNumber}
                formattedValue={formattedValue}
                setFormattedValue={setFormattedValue}
                valid={valid}
                setValid={setValid}
                phoneInput={phoneInput}
                signInWithPhoneNumber={signInWithPhoneNumber}
              />

              <CustomButton
                onPress={onHandleLogin}
                title="login"
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
      <OTPScreen confirmCode={confirmCode} />
    </>
  );
}
