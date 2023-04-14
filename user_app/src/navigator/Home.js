import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import DestinationSearch from '../screens/DestinationSearch';
import SearchResults from '../screens/SearchResults';
import HomeScreen from '../screens/HomeScreen';

import WaitingOrderScreen from '../screens/OrderScreen/WaitingOrderScreen';
import OrderScreen from '../screens/OrderScreen/OrderScreen';

const Stack = createStackNavigator();

const HomeNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={'HomeScreen'}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name={'DestinationSearch'} component={DestinationSearch} />
      <Stack.Screen name={'SearchResults'} component={SearchResults} />

      <Stack.Screen name={'WaitingOrder'} component={WaitingOrderScreen} />
      <Stack.Screen name={'Order'} component={OrderScreen} />
    </Stack.Navigator>
  );
};

export default HomeNavigator;
