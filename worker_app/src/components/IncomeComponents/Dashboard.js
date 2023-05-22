import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import DashBoardItem from './DashBoardItem';

export default function Dashboard({
  numberFirst,
  numberSecond,
  numberThird,
  onPressToday,
}) {
  return (
    <View style={styles.viewDashBoard}>
      <DashBoardItem
        onPress={() => onPressToday('toDay')}
        title={`Hôm Nay (${numberFirst[0].count} đơn)`}
        statisticsText={'so với hôm qua'}
        number={numberFirst}
      />
      <DashBoardItem
        onPress={() => onPressToday('toWeek')}
        title={`Tuần Này (${numberSecond[0].count} đơn)`}
        statisticsText={'so với tuần trước'}
        number={numberSecond}
      />
      <DashBoardItem
        onPress={() => onPressToday('toMonth')}
        title={`Tháng Này (${numberThird[0].count} đơn)`}
        statisticsText={'so với tháng trước'}
        number={numberThird}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  viewDashBoard: {
    width: '100%',

    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
});
