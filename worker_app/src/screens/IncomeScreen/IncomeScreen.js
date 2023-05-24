import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import AppBar from '../../components/Appbar/AppBar';
import {SIZES} from '../../contains';

import AppContext from '../../navigator/AppContext';
import Dashboard from '../../components/IncomeComponents/Dashboard';
import {getIncome, getOrder} from '../../Api/RestFullApi';
import {useNavigation} from '@react-navigation/native';

export default function IncomeScreen() {
  const {user} = useContext(AppContext);
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [dayTotal, setDayTotal] = useState(null);
  const [weekTotal, setWeekTotal] = useState(null);
  const [monthTotal, setMonthTotal] = useState(null);
  const [numOrderCancel, setNumOrderCancel] = useState(0);
  const [orderToday, setOrderToday] = useState(null);
  const [orderToWeek, setOrderToWeek] = useState(null);
  const [orderToMonth, setOrderToMonth] = useState(null);

  async function onPress(time) {
    if (time === 'toDay') {
      await getOrder(user._id, setOrderToday, 'Day');
      if (orderToday) {
        navigation.navigate('OrderHistory', {data: orderToday});
        setOrderToday(null);
      }
    } else if (time === 'toWeek') {
      await getOrder(user._id, setOrderToWeek, 'Week');
      if (orderToWeek) {
        navigation.navigate('OrderHistory', {data: orderToWeek});
        setOrderToWeek(null);
      }
    } else if (time === 'toMonth') {
      await getOrder(user._id, setOrderToMonth, 'Month');
      if (orderToMonth) {
        navigation.navigate('OrderHistory', {data: orderToMonth});
        setOrderToMonth(null);
      }
    }
  }

  useEffect(() => {
    getIncome(user._id, setDayTotal, 'Day');
    getIncome(user._id, setWeekTotal, 'Week');
    getIncome(user._id, setMonthTotal, 'Month');
  }, [user._id]);
  useEffect(() => {
    const focusHandler = navigation.addListener('focus', () => {
      getIncome(user._id, setDayTotal, 'Day');
      getIncome(user._id, setWeekTotal, 'Week');
      getIncome(user._id, setMonthTotal, 'Month');
    });
    return focusHandler;
  }, []);
  if (!dayTotal || !weekTotal || !monthTotal) {
    return (
      <View>
        <ActivityIndicator />
      </View>
    );
  }
  return (
    <>
      <AppBar centerText={'Thu nhập'} rightText={' '} />
      <View style={styles.container}>
        <Dashboard
          onPressToday={onPress}
          numberFirst={dayTotal}
          numberSecond={weekTotal}
          numberThird={monthTotal}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'red',
    width: SIZES.width,
    height: SIZES.height,
    alignItems: 'center',
  },
});
