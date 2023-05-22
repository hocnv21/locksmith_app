import {FlatList, Modal, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useState} from 'react';
import {COLORS, SIZES} from '../../contains';
import OrderItems from '../../components/IncomeComponents/OrderItems';
import {useRoute} from '@react-navigation/native';
import AppBar from '../../components/Appbar/AppBar';
import ModalDetails from '../../components/IncomeComponents/ModalDetails';

export default function OrderHistory() {
  const route = useRoute();
  const {data} = route.params;

  return (
    <>
      <AppBar leftIcon={'back'} centerText={'Đơn sửa khóa của bạn'} />
      <View style={styles.container}>
        <View style={styles.viewList}>
          <FlatList
            style={{width: '95%'}}
            data={data}
            renderItem={({item}) => <OrderItems item={item} />}
            keyExtractor={item => item._id}
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'red',
    width: SIZES.width,
    height: SIZES.height,
  },
  viewList: {
    width: '100%',
    height: '90%',
    alignItems: 'center',
  },
});
