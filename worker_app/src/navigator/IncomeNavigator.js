import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import IncomeScreen from '../screens/IncomeScreen/IncomeScreen';
import OrderHistory from '../screens/IncomeScreen/OrderHistory';

const Stack = createStackNavigator();

const IncomeNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={'Income'}>
      <Stack.Screen name={'Income'} component={IncomeScreen} />
      <Stack.Screen name={'OrderHistory'} component={OrderHistory} />
    </Stack.Navigator>
  );
};

export default IncomeNavigator;
