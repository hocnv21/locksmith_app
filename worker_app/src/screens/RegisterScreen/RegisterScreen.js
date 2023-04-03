import React, {useState} from 'react';
import {View, ActivityIndicator, Text, Alert, ScrollView} from 'react-native';
import {TextInput} from 'react-native-paper';
import CustomButton from '../../components/LoginComponents/CustomButton';
import TextLine from '../../components/LoginComponents/TextLine';
import TextUnderline from '../../components/LoginComponents/TextUnderline';
import Logo_Login from '../../components/LoginComponents/Logo_Login';
import auth from '@react-native-firebase/auth';
import firebase from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import styles from './style';

export default function RegisterScreen({navigation}) {
  const [email, setEmail] = useState('viethoc123@gmail.com');
  const [name, setName] = useState('Tran Quang Dat');
  const [password, setPassword] = useState('112233');
  const [passwordConfirm, setPasswordConfirm] = useState('112233');
  const [loading, setLoading] = useState(false);
  const [googleLogin, setGoogleLogin] = useState(false);
  const [user, setUser] = useState();

  const onUserRegister = async () => {
    setLoading(true);
    if (!email || !password || !name) {
      alert('please add all the field');
      return;
    }

    const result = await auth().createUserWithEmailAndPassword(email, password);

    await result.user
      .updateProfile({
        displayName: name,
        photoURL: null,
      })
      .then(() => {
        console.log('then update' + result.user.displayName);
        setLoading(false);
      });

    // await firestore().collection('users').doc(result.user.uid).set({
    //   displayName: name,
    //   email: result.user.email,
    //   photoURL: null,
    //   point: 50,
    //   score: 0,
    //   uid: result.user.uid,
    // });
  };
  // const loginWithGoogle = async () => {
  //   // Get the users ID token
  //   const {idToken} = await GoogleSignin.signIn();

  //   // Create a Google credential with the token
  //   const googleCredential = auth.GoogleAuthProvider.credential(idToken);

  //   try {
  //     let loginUser = await auth().signInWithCredential(googleCredential);
  //     console.log(JSON.stringify(loginUser));
  //     setGoogleLogin(true);
  //   } catch (error) {
  //     setGoogleLogin(false);
  //   }
  // };

  if (loading) {
    return <ActivityIndicator size="large" color="#00ff00" />;
  }

  const handleHaveAcc = () => {
    navigation.goBack();
  };
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.bottom}>
          <View style={styles.form}>
            <View style={styles.welcom}>
              <Text style={styles.h1}>Register</Text>
            </View>
            <Text>Full Name</Text>
            <TextInput
              placeholder="Name Profile"
              label="Full Name"
              value={name}
              onChangeText={setName}
              style={styles.input}
              outline
            />
            <Text>Email</Text>
            <TextInput
              label="Email"
              dense={true}
              value={email}
              placeholder="email"
              onChangeText={setEmail}
              style={styles.input}
            />
            <Text>Password</Text>
            <TextInput
              placeholder="Password"
              label="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={true}
              style={styles.input}
            />
            <Text>Confirm Password</Text>
            <TextInput
              placeholder="Confirm Password"
              label="Confirm Password"
              value={passwordConfirm}
              onChangeText={setPasswordConfirm}
              secureTextEntry={true}
              style={styles.input}
            />
            <CustomButton
              title="Register"
              type="PRIMARY"
              disabled={!email || !password || !name || !passwordConfirm}
              onPress={() => onUserRegister()}
            />
            <View style={styles.haveAcc}>
              <View></View>
              <TextUnderline
                onPress={handleHaveAcc}
                text={'You have an account?'}
              />
            </View>

            <TextLine text={'Login with'} colorLine={'black'} />

            <View style={styles.login_logo}>
              <Logo_Login TYPE={'google'} />
              <Logo_Login TYPE={'facebook'} />
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
