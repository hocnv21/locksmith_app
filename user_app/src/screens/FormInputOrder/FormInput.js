import {
  Alert,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {Avatar} from 'react-native-paper';

import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import {COLORS, ICONS, SIZES} from '../../contains/theme';
import AppBar from '../../components/Appbar/AppBar';
import ListImageItems from '../../components/FormInputComponents/ListImageItems';
import TouchableAddPhotos from '../../components/FormInputComponents/TouchableAddPhotos';
import ButtonAction from '../../components/FormInputComponents/ButtonAction';

import TextInputMultipleForm from '../../components/FormInputComponents/TextInputMultipleForm';
import ModalOption from '../../components/FormInputComponents/ModalOption';
import SearchPlace from './SearchPlace';
import {useNavigation, useRoute} from '@react-navigation/native';

export default function FormInput() {
  const navigation = useNavigation();
  const route = useRoute();
  const {typeLock} = route.params;
  const [screenStatus, setScreenStatus] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [visibleImageView, setVisibleImageView] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [filePath, setFilePath] = useState([]);
  const [listURL, setListURL] = useState([]);
  const [valueText, setValueText] = useState('');

  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs camera permission',
          },
        );
        // If CAMERA Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else return true;
  };
  const requestExternalWritePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'External Storage Write Permission',
            message: 'App needs write permission',
          },
        );
        // If WRITE_EXTERNAL_STORAGE Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        alert('Write permission err', err);
      }
      return false;
    } else return true;
  };
  const captureImage = async type => {
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
      videoQuality: 'low',
      durationLimit: 30, //Video max duration in seconds
      saveToPhotos: true,
      includeBase64: true,
    };
    let isCameraPermitted = await requestCameraPermission();
    let isStoragePermitted = await requestExternalWritePermission();
    if (isCameraPermitted && isStoragePermitted) {
      await launchCamera(options, response => {
        if (response.didCancel) {
          Alert.alert('User cancelled camera picker');
          return;
        } else if (response.errorCode === 'camera_unavailable') {
          Alert.alert('Camera not available on device');
          return;
        } else if (response.errorCode === 'permission') {
          Alert.alert('Permission not satisfied');
          return;
        } else if (response.errorCode === 'others') {
          Alert.alert(response.errorMessage);
          return;
        }

        filePath.push(response.assets[0]);
        console.log(filePath.length);
        setModalVisible(false);
        // setFilePath(response.assets[0]);
      });
    }
  };
  // const pickImageAndUpload = async () => {
  //   const fileResult = await launchImageLibrary({
  //     quality: 0.5,
  //     includeBase64: true,
  //     selectionLimit: 2,
  //   });
  //   if (fileResult.assets.length) {
  //     const fileObj = fileResult.assets[0];
  //     const uploadTask = storage()
  //       .ref()
  //       .child(`/images/${fileObj.fileName}`)
  //       .putString(fileObj.base64, 'base64');

  //     uploadTask.on(
  //       'state_changed',
  //       snapshot => {
  //         var progress =
  //           (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  //         if (progress === 100) {
  //           Alert.alert('image uploaded');
  //         }
  //       },
  //       error => {
  //         console.log(error);
  //         Alert.alert('error uploading image');
  //       },
  //       () => {
  //         uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
  //           setFilePath(downloadURL);
  //         });
  //       },
  //     );
  //   }
  // };

  async function chooseFile(type) {
    let options = {
      mediaType: 'mixed',
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
      multiple: true,
      selectionLimit: 5,
      includeBase64: true,
    };
    let isCameraPermitted = await requestCameraPermission();
    let isStoragePermitted = await requestExternalWritePermission();
    if (isCameraPermitted && isStoragePermitted) {
      launchImageLibrary(options, response => {
        // console.log('Response = ', response);

        if (response.didCancel) {
          Alert.alert('User cancelled camera picker');
          return;
        } else if (response.errorCode === 'camera_unavailable') {
          Alert.alert('Camera not available on device');
          return;
        } else if (response.errorCode === 'permission') {
          Alert.alert('Permission not satisfied');
          return;
        } else if (response.errorCode === 'others') {
          Alert.alert(response.errorMessage);
          return;
        }

        response.assets.forEach(item => {
          filePath.push(item);
          console.log('lenght ->' + filePath.length);
        });
        setModalVisible(!modalVisible);
      });
    }
  }
  function setModal() {
    setModalVisible(true);
  }

  function onPressDeleteImage(e) {
    var array = [...filePath]; // make a separate copy of the array
    var index = array.indexOf(e);
    if (index !== -1) {
      array.splice(index, 1);
      setFilePath(array);
    }
  }
  async function getListUriAndUpLoad(arr) {
    arr.map(value => {
      const uploadTask = storage()
        .ref()
        .child(`/images/${value.fileName}`)
        .putString(value.base64, 'base64');

      uploadTask.on(
        'state_changed',
        snapshot => {
          var progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          if (progress === 100) {
            console.log('-->> image uploaded');
          }
        },
        error => {
          console.log(error);
          console.log('error uploading image');
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
            listURL.push({id: Math.random() * 10, uri: downloadURL});
          });
        },
      );
    });
  }
  async function onPressSubmit() {
    await getListUriAndUpLoad(filePath);

    navigation.navigate('SearchPlace', {
      description: valueText,
      listPhotos: listURL,
      typeLock,
    });
    setListURL([]);
  }

  return (
    <>
      <AppBar leftIcon={'back'} centerText={'Tình trạng ổ khóa của bạn'} />
      <View style={styles.container}>
        <TextInputMultipleForm
          valueText={valueText}
          setValueText={setValueText}
        />
        {filePath.length > 0 ? (
          <View style={styles.listImage}>
            {filePath.map((value, index) => (
              <ListImageItems
                key={index}
                value={value}
                index={index}
                selectedImage={selectedImage}
                setSelectedImage={setSelectedImage}
                visibleImageView={visibleImageView}
                setVisibleImageView={setVisibleImageView}
                onPressDeleteImage={onPressDeleteImage}
              />
            ))}
            {filePath.length >= 5 ? null : (
              <TouchableAddPhotos setModal={setModal} filePath={filePath} />
            )}
          </View>
        ) : (
          <ButtonAction setModalVisible={setModalVisible} />
        )}

        <View style={styles.viewSubmit}>
          <TouchableOpacity
            disabled={!valueText || filePath.length < 1}
            onPress={onPressSubmit}
            style={styles.buttonSubmit}>
            <Text style={{color: '#ffffff'}}>Xác nhận</Text>
          </TouchableOpacity>
        </View>

        <ModalOption
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          captureImage={captureImage}
          chooseFile={chooseFile}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    width: SIZES.width,
    height: SIZES.height,
    padding: 20,
  },
  btnTakeImage: {
    width: (SIZES.width - 40) / 2 - 10,
    height: 80,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  titleText: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 20,
  },

  listImage: {
    flexDirection: 'row',
    marginBottom: 5,
    borderWidth: 1,
    flexWrap: 'wrap',
  },
  viewSubmit: {
    marginVertical: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonSubmit: {
    height: 60,
    width: 200,
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
});
