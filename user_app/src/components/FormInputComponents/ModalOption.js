import {Modal, Pressable, StyleSheet, Text, View, Alert} from 'react-native';
import React from 'react';
import {COLORS} from '../../contains/theme';

export default function ModalOption({
  modalVisible,
  setModalVisible,
  captureImage,
  chooseFile,
}) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
        setModalVisible(!modalVisible);
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Tải ảnh lên</Text>
          <Pressable
            style={[styles.button, styles.buttonAction]}
            onPress={() => captureImage('photo')}>
            <Text style={styles.textOptionModal}>Chụp ảnh</Text>
          </Pressable>
          <Pressable
            style={[styles.button, styles.buttonAction]}
            onPress={() => chooseFile('photo')}>
            <Text style={styles.textOptionModal}>Chọn ảnh từ thư viện</Text>
          </Pressable>
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => setModalVisible(!modalVisible)}>
            <Text style={[styles.textOptionModal, styles.textClose]}>
              Hủy bỏ
            </Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },

  modalView: {
    borderWidth: 1,
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    // alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    // flexDirection: 'row',
    marginVertical: 5,
    borderWidth: 1,
    width: 200,
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonAction: {
    backgroundColor: COLORS.background,
  },
  buttonClose: {
    backgroundColor: COLORS.light_gray,
  },
  textClose: {
    color: '#000000',
  },

  modalText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 15,
    textAlign: 'center',
  },
  textOptionModal: {
    fontWeight: '500',
    color: '#ffffff',
    padding: 10,
    textAlign: 'center',
  },
});
