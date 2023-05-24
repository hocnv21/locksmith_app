import {
  Image,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useState} from 'react';

import {COLORS, SIZES} from '../../contains';
import {Checkbox} from 'react-native-paper';
import ShowErrorMessage from '../LoginComponents/ShowErrorMessage';
import CustomButton from '../LoginComponents/CustomButton';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import {launchImageLibrary} from 'react-native-image-picker';
import axios from 'axios';
import {baseUrl} from '../../contains/url';
import AppContext from '../../navigator/AppContext';
import {getLocksmith} from '../../Api/RestFullApi';

export default function ModalAccount({
  setModalVisible,
  modalVisible,
  data,
  setData,
}) {
  const [name, setName] = useState(data.name);

  const [image, setImage] = useState(null);
  const [showMessage, setShowMessage] = useState(false);
  // check box
  const [googleLogin, setGoogleLogin] = useState(false);
  const [user, setUser] = useState();
  const [checked, setChecked] = useState(data.gender); // true : male , false : female
  const [selectedDate, setSelectedDate] = useState(new Date(data.birthDate));
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
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

  const onUpdate = async () => {
    const configurationObject = {
      url: `${baseUrl}/locksmith/update/${data._id}`,
      method: 'PUT',
      data: {
        name: name,
        gender: checked,
        birthDate: selectedDate,
        image: image,
      },
    };
    console.log('accept .................................!');

    await axios(configurationObject)
      .then(response => {
        if (response.status === 201) {
          getLocksmith(data._id, setData);
          setModalVisible(false);
        } else {
          throw new Error('An error has occurred');
        }
      })
      .catch(error => {
        alert('An error has occurred');
      });
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.form}>
            <View
              style={{
                marginTop: 30,
                marginBottom: 40,
                borderRadius: 120,
                width: '100%',
                height: 200,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              {!image ? (
                <>
                  <Image
                    source={{uri: data.image}}
                    style={{width: 200, height: 200, borderRadius: 120}}
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
          </View>
          {/* btn */}
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <TouchableOpacity
              onPress={() => setModalVisible(!modalVisible)}
              style={[styles.btn, {backgroundColor: COLORS.light_gray}]}>
              <Text style={[styles.textBtn]}>Thoát</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onUpdate()} style={styles.btn}>
              <Text style={styles.textBtn}>Cập nhật</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  form: {
    maxWidth: 360,
    // maxHeight: 680,

    alignSelf: 'center',
    padding: 20,
    backgroundColor: '#ffffff',
    width: SIZES.width * 0.9,
    marginBottom: 30,

    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 7,
  },
  btn: {
    backgroundColor: 'blue',
    height: 60,
    width: '45%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  textBtn: {
    color: '#ffffff',
  },
  centeredView: {
    // width: SIZES.width * 0.7,
    // height: SIZES.height * 0.7,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    width: '95%',
    height: SIZES.height * 0.9,
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
