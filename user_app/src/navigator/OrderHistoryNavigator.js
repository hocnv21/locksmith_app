import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import OrderHistoryScreen from '../screens/OrderHistoryScreen/OrderHistoryScreen';

const Stack = createStackNavigator();

const OrderHistoryNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={'OrderHistory'}>
      <Stack.Screen name={'OrderHistory'} component={OrderHistoryScreen} />
    </Stack.Navigator>
  );
};

export default OrderHistoryNavigator;
