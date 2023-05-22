import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import AccountScreen from '../screens/AccountScreen/AccountScreen';
import SupportScreen from '../screens/SupportScreen/SupportScreen';

const Stack = createStackNavigator();

const SupportNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={'Support'}>
      <Stack.Screen name={'Support'} component={SupportScreen} />
    </Stack.Navigator>
  );
};

export default SupportNavigator;
