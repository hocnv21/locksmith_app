import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import AppBar from '../../components/Appbar/AppBar';
import {SIZES} from '../../contains';

export default function SupportScreen() {
  return (
    <>
      <AppBar centerText={'Trang hổ trợ'} rightText={' '} />
      <View style={styles.container}>
        <Text>Bạn vui lòng đến địa chỉ :</Text>
        <Text>12 Nguyễn Văn Bảo , Phường 3 , Gò Vấp ,TP.HCM</Text>
        <Text>để được hổ trợ tốt nhất</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: SIZES.width,
    height: SIZES.height - 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
