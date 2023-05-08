import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import SearchResults from '../screens/SearchResults';
import HomeScreen from '../screens/HomeScreen';

import WaitingOrderScreen from '../screens/OrderScreen/WaitingOrderScreen';
import OrderScreen from '../screens/OrderScreen/OrderScreen';

import SearchPlace from '../screens/FormInputOrder/SearchPlace';
import FormInput from '../screens/FormInputOrder/FormInput';
import ChosseLocationScreen from '../screens/FormInputOrder/ChosseLocationScreen';

const Stack = createStackNavigator();

const HomeNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={'HomeScreen'}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name={'FormInput'} component={FormInput} />
      <Stack.Screen
        name={'ChosseLocationScreen'}
        component={ChosseLocationScreen}
      />
      <Stack.Screen name={'SearchPlace'} component={SearchPlace} />
      <Stack.Screen name={'SearchResults'} component={SearchResults} />
      <Stack.Screen name={'WaitingOrder'} component={WaitingOrderScreen} />
      <Stack.Screen name={'Order'} component={OrderScreen} />
    </Stack.Navigator>
  );
};

export default HomeNavigator;
