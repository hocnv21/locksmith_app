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
  setValueCost,
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
            <Text style={styles.textHeader}>GỬI BÁO GIÁ </Text>
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
          <View style={styles.textInput}>
            <TextInput
              inputMode="numeric"
              keyboardType="numeric"
              onChangeText={text => setValueCost(text)}
              autoFocus={true}
            />
          </View>

          <TouchableOpacity
            onPress={() => onSubmit()}
            disabled={valueCost.length < 2}
            style={styles.btn}>
            <Text style={styles.textBtn}>GỬI</Text>
          </TouchableOpacity>
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
    backgroundColor: 'blue',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textBtn: {
    color: 'white',
  },
});
