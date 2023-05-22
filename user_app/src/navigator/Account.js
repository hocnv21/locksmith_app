import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import AccountScreen from '../screens/AccountScreen/AccountScreen';

const Stack = createStackNavigator();

const AccountNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={'Account'}>
      <Stack.Screen name={'Account'} component={AccountScreen} />
    </Stack.Navigator>
  );
};

export default AccountNavigator;
