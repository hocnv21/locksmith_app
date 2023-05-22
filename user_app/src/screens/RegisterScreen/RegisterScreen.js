import React, {useRef, useState} from 'react';
import {
  View,
  ActivityIndicator,
  Text,
  Alert,
  ScrollView,
  Button,
  TouchableOpacity,
  Image,
} from 'react-native';
import {Avatar, TextInput} from 'react-native-paper';
import axios from 'axios';
import {baseUrl} from '../../contains/url';
import CustomButton from '../../components/LoginComponents/CustomButton';

import TextUnderline from '../../components/LoginComponents/TextUnderline';

import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import {launchImageLibrary} from 'react-native-image-picker';
import {Checkbox} from 'react-native-paper';

import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {getExitsUser} from '../../API/RestFullApi';
import styles from './style';
import LoginPhone from '../../components/LoginComponents/LoginPhone';
import ShowErrorMessage from '../../components/LoginComponents/ShowErrorMessage';

import OTPScreen from '../OTPScreen/OTPScreen';

export default function RegisterScreen({navigation}) {
  const [stateScreen, setStateScreen] = useState('first');
  const [name, setName] = useState('Nguyễn Viết Học');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  // phone input
  const [formattedValue, setFormattedValue] = useState('');
  const [valid, setValid] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const [statusMessage, setStatusMessage] = useState(false);
  const phoneInput = useRef(null);
  // check box

  const [checked, setChecked] = useState(false); // true : male , false : female
  const [selectedDate, setSelectedDate] = useState(null);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  // If null, no SMS has been sent
  const [confirm, setConfirm] = useState(null);
  // function
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    setSelectedDate(date);
    hideDatePicker();
  };
  async function checkPhoneExits() {
    const checkValid = phoneInput.current?.isValidNumber(phoneNumber);

    setValid(checkValid ? checkValid : false);
    if (checkValid) {
      console.log(formattedValue.replace('0', ''));
      const phoneFormat = formattedValue.replace('0', '');
      const kq = await getExitsUser(phoneFormat);
      if (kq) {
        console.log('tai khoan da ton tai');
        setStatusMessage(true);
        setShowMessage(true);
        //
        console.log(formattedValue);
        return false;
      } else {
        setStatusMessage(false);
        setShowMessage(false);
        console.log('sdt hop le');
        return true;
      }
    } else {
      setShowMessage(true);
      return false;
    }
  }

  const onCheckFormInput = async () => {
    // const age = checkBirthDate(selectedDate);
    // console.log('age-->>', age);
    const check = await checkPhoneExits();
    if (name.length > 8 && selectedDate != null && check) {
      console.log('oke all');
      setStateScreen('second');
    } else {
      setShowMessage(true);
    }
  };

  function checkBirthDate(date) {
    var toDay = new Date();
    var birthDate = new Date(date);

    var age = toDay.getFullYear() - birthDate.getFullYear();
    if (toDay.getMonth() < birthDate.getMonth()) {
      return (age = age - 1);
    } else if (toDay.getMonth() === birthDate.getMonth()) {
      if (toDay.getDate() < birthDate.getDate()) {
        console.log(toDay.getDate());

        return (age = age - 1);
      } else {
        return age;
      }
    }
    return age;
  }

  if (loading) {
    return <ActivityIndicator size="large" color="#00ff00" />;
  }

  const handleHaveAcc = () => {
    navigation.goBack();
  };
  const pickImageAndUpload = async () => {
    const fileResult = await launchImageLibrary({
      quality: 0.5,
      includeBase64: true,
    });
    if (fileResult.assets.length) {
      const fileObj = fileResult.assets[0];
      const uploadTask = storage()
        .ref()
        .child(`/userprofile/${Date.now()}.png`)
        .putString(fileObj.base64, 'base64');

      uploadTask.on(
        'state_changed',
        snapshot => {
          var progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          if (progress === 100) {
            console.log('tải ảnh hoàn tất');
          }
        },
        error => {
          alert('error uploading image');
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
            setImage(downloadURL);
          });
        },
      );
    }
  };
  async function onPressRegister() {
    const confirmation = await auth().signInWithPhoneNumber(formattedValue);
    setConfirm(confirmation);
  }
  async function createUser(id) {
    const response = await axios.post(`${baseUrl}/customer/create`, {
      _id: id,
      name: name,
      gender: checked,
      birthDate: selectedDate,
      phoneNumber: formattedValue.replace('0', ''),
      image: image,
    });
    if (response.status === 201) {
      console.log('create user success');
      // Alert.alert(` You have created: ${JSON.stringify(response.data)}`);
    } else {
      throw new Error('An error create user');
    }
  }

  async function confirmCode(code) {
    try {
      if (code.length === 6) {
        const credential = auth.PhoneAuthProvider.credential(
          confirm.verificationId,
          code,
        );
        console.log('credential' + JSON.stringify(credential));
        await auth()
          .signInWithCredential(credential)
          .then(value => {
            createUser(value.user.uid);
            console.log('login dang nhap ' + JSON.stringify(value.user.uid));
          });
      }
      // const credential = auth.PhoneAuthProvider.credential(confirm.verificationId,code)
    } catch (error) {
      console.log('Invalid code.');
    }
  }
  if (confirm == null) {
    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.bottom}>
            {stateScreen === 'first' && (
              <View style={styles.form}>
                <View style={styles.welcome}>
                  <Text style={styles.h1}>Đăng ký (1/2)</Text>
                </View>
                <Text>Họ và Tên</Text>
                <TextInput
                  placeholder="Họ tên đầy đủ"
                  label="Họ và tên"
                  value={name}
                  onChangeText={setName}
                  style={styles.input}
                  outline
                />
                <ShowErrorMessage
                  showMessage={showMessage}
                  valid={name.length > 8 ? true : false}
                  message={'Họ và tên phải nhiều hơn 8 ký tự'}
                />
                <Text>Giới tính</Text>
                <View style={{flexDirection: 'row'}}>
                  <Checkbox.Item
                    label="Nam"
                    color="red"
                    status={checked ? 'checked' : 'unchecked'}
                    onPress={() => {
                      setChecked(true);
                    }}
                  />
                  <Checkbox.Item
                    label="Nữ"
                    color="red"
                    status={!checked ? 'checked' : 'unchecked'}
                    onPress={() => {
                      setChecked(false);
                    }}
                  />
                </View>

                <Text>Ngày sinh</Text>
                <TouchableOpacity onPress={showDatePicker}>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: '400',
                      marginVertical: 20,
                    }}>
                    {selectedDate
                      ? selectedDate.toLocaleDateString('en-GB')
                      : '--- dd/mm/yyy ---'}
                  </Text>
                </TouchableOpacity>

                <ShowErrorMessage
                  showMessage={showMessage}
                  valid={selectedDate !== null}
                  message={'Bạn chưa nhập ngày sinh'}
                />
                <ShowErrorMessage
                  showMessage={showMessage}
                  valid={checkBirthDate(selectedDate) >= 18}
                  message={'Ngày sinh chưa đủ 18 tuổi'}
                />
                <DateTimePickerModal
                  isVisible={isDatePickerVisible}
                  mode="date"
                  onConfirm={handleConfirm}
                  onCancel={hideDatePicker}
                />
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
                  phoneInput={phoneInput}
                />

                <CustomButton
                  title="Tiếp theo"
                  type="PRIMARY"
                  disabled={!name}
                  onPress={() => onCheckFormInput()}
                />
                <View style={styles.haveAcc}>
                  <View></View>
                  <TextUnderline
                    onPress={handleHaveAcc}
                    text={'Bạn đã có tài khoản?'}
                  />
                </View>
              </View>
            )}
            {stateScreen === 'second' && (
              <View style={styles.form}>
                <View style={styles.welcome}>
                  <Text style={styles.h1}>Đăng ký (2/2)</Text>
                </View>
                <Text>Hình ảnh đại diện của bạn</Text>
                <View
                  style={{
                    marginTop: 30,
                    borderRadius: 120,
                    width: '100%',
                    height: 400,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  {!image ? (
                    <>
                      <Image
                        source={require('../../assets/images/user.png')}
                        style={{
                          width: 200,
                          height: 200,
                          borderRadius: 120,
                          resizeMode: 'contain',
                        }}
                      />
                    </>
                  ) : (
                    <Image
                      source={{uri: image}}
                      style={{width: 200, height: 200, borderRadius: 120}}
                    />
                  )}
                  <CustomButton
                    title="Tải ảnh lên"
                    type="PRIMARY"
                    onPress={() => pickImageAndUpload()}
                  />
                </View>

                <CustomButton
                  title="Đăng ký"
                  type="PRIMARY"
                  disabled={!image}
                  onPress={() => onPressRegister()}
                />
                <View style={styles.haveAcc}>
                  <View></View>
                  <TextUnderline
                    onPress={handleHaveAcc}
                    text={'Bạn đã có tài khoản?'}
                  />
                </View>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    );
  }
  return (
    <>
      <OTPScreen phoneNumber={formattedValue} confirmCode={confirmCode} />
    </>
  );
}
