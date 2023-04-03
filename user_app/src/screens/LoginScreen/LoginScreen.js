/* eslint-disable react-hooks/rules-of-hooks */
import {View, Image, Text, ScrollView, ImageBackground} from 'react-native';
import React, {useState, useEffect} from 'react';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import {TextInput} from 'react-native-paper';

import styles from './style';
import TextLine from '../../components/LoginComponents/TextLine';
import Pressable_line from '../../components/LoginComponents/Pressable_line';
import Logo_Login from '../../components/LoginComponents/Logo_Login';
import CustomButton from '../../components/LoginComponents/CustomButton';

export default function LoginScreen({navigation}) {
  const [email, setEmail] = useState('hoc@gmail.com');
  const [password, setPassword] = useState('112233');

  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const logoLink = require('../../assets/images/logo.png');

  const onHandleLogin = async () => {
    if (!email || !password) {
      alert('please add all the field');
      return;
    }

    await auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log('user have login :');
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleRegister = () => {
    navigation.navigate('Register');
  };

  return (
    <ScrollView>
      <View style={styles.container}>
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

            <Text>Email</Text>
            <TextInput
              placeholder="Email"
              onChangeText={setEmail}
              value={email}
              style={styles.input}
              label="Email"
            />
            <Text>Password</Text>
            <TextInput
              placeholder="password"
              label="Password"
              onChangeText={text => setPassword(text)}
              value={password}
              secureTextEntry={true}
              style={styles.input}
            />
            <View style={styles.forgotPass}>
              <View></View>
              <Pressable_line textPressable={'Forgot you password?'} />
            </View>
            <CustomButton
              onPress={onHandleLogin}
              title="login"
              disabled={!email || !password}
              type="PRIMARY"
            />

            <TextLine text={'Login with'} colorLine={'black'} />

            <View style={styles.login_logo}>
              <Logo_Login TYPE={'facebook'} />
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
