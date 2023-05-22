import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {COLORS} from '../../contains';
import {shadowView} from '../../contains/theme';
import {useState} from 'react';

export default function ModalDealCost({
  modalVisible,
  setModalVisible,
  valueCost,
  onCancel,
  onSubmit,
}) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
      visible={modalVisible}>
      <View style={styles.container}>
        <View style={styles.modalView}>
          <View style={styles.viewText}>
            <Text style={styles.textHeader}> BÁO GIÁ SỬA CHỮA </Text>
            <View style={styles.viewCost}>
              <Text style={styles.textCost}>
                {new Intl.NumberFormat({
                  style: 'currency',
                  currency: 'VND',
                }).format(valueCost)}
              </Text>
              <Text style={styles.textCost}>.000 VND</Text>
            </View>
          </View>

          <View
            style={{
              marginTop: 20,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity onPress={() => onCancel()} style={styles.btn}>
              <Text style={styles.textBtn}>Hủy</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onSubmit()} style={styles.btn}>
              <Text style={styles.textBtn}>Đồng ý</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: [
    {
      backgroundColor: 'white',
      padding: 20,
      borderRadius: 20,
    },
    shadowView,
  ],
  viewText: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textHeader: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'black',
    marginVertical: 10,
  },
  viewCost: {
    flexDirection: 'row',
  },
  textCost: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.success,
  },
  textInput: {
    borderWidth: 1,
    marginVertical: 20,
  },
  btn: {
    borderRadius: 10,
    width: '40%',
    backgroundColor: 'blue',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnClose: {
    borderRadius: 10,
    width: '40%',
    backgroundColor: 'red',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textBtn: {
    color: 'white',
  },
});
