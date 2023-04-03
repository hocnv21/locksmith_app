import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import OrderDetail from '../screens/OrderScreen/OrderDetail';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen/index';
import Order from '../screens/OrderScreen/Order';

const Stack = createStackNavigator();

const HomeNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={'HomeScreen'}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="OrderDetail" component={OrderDetail} />
      <Stack.Screen name="Order" component={Order} />
    </Stack.Navigator>
  );
};

export default HomeNavigator;
