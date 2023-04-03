import React, {useEffect, useState} from 'react';
import {View, useColorScheme} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import AppContext from './AppContext';

import LoginScreen from '../screens/LoginScreen/LoginScreen';

import Home from '../screens/Home';
import RegisterScreen from '../screens/RegisterScreen/RegisterScreen';
import HomeScreen from '../screens/HomeScreen/index';
import DestinationSearch from '../screens/DestinationSearch';
import SearchResults from '../screens/SearchResults';
import WaitingOrderScreen from '../screens/OrderScreen/WaitingOrderScreen';

const Stack = createStackNavigator();
const StackAuth = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

const StackHome = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        options={{headerShown: false}}
        name="Home"
        component={HomeScreen}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="DestinationSearch"
        component={DestinationSearch}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="SearchResults"
        component={SearchResults}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="WaitingOrder"
        component={WaitingOrderScreen}
      />
    </Stack.Navigator>
  );
};

const Navigator = () => {
  const scheme = useColorScheme();
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  return (
    <AppContext.Provider
      value={{
        user: user,
      }}>
      <NavigationContainer theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
        {/* <StatusBar barStyle="light-content" backgroundColor="green" /> */}
        <View style={{flex: 1}}>{!user ? <StackAuth /> : <StackHome />}</View>
        {/* <View style={{flex: 1}}>
          <StackAuth />
        </View> */}
      </NavigationContainer>
    </AppContext.Provider>
  );
};

export default Navigator;
