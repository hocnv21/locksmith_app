import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import DashBoardItem from './DashBoardItem';

export default function Dashboard({numberFirst, numberSecond, numberThird}) {
  return (
    <View style={styles.viewDashBoard}>
      <DashBoardItem title={'Tổng số đơn'} number={numberFirst} />
      <DashBoardItem title={'Đã hoàn thành'} number={numberSecond} />
      <DashBoardItem title={'Đã hủy'} number={numberThird} />
    </View>
  );
}

const styles = StyleSheet.create({
  viewDashBoard: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  dashBoard: {
    width: '30%',
    backgroundColor: 'blue',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
