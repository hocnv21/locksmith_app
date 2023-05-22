import React, {useEffect, useState} from 'react';
import {View, useColorScheme, Text} from 'react-native';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import AppContext from './AppContext';
import {createStackNavigator} from '@react-navigation/stack';
import auth from '@react-native-firebase/auth';

import HomeNavigator from './Home';
import {createDrawerNavigator} from '@react-navigation/drawer';
import CustomDrawer from './CustomDrawer';
import LoginScreen from '../screens/LoginScreen/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen/RegisterScreen';
import ConfirmCodeScreen from '../screens/LoginScreen/ConfirmCodeScreen';
import Test from '../screens/LoginScreen/Test';
import OTPScreen from '../screens/OTPScreen/OTPScreen';
import {getLocksmith} from '../Api/RestFullApi';
import AccountNavigator from './Account';
import SupportNavigator from './Support';
import IncomeNavigator from './IncomeNavigator';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
const DummyScreen = props => {
  <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    <Text>{props.name}</Text>
  </View>;
};
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
      <Stack.Screen name="OTPScreen" component={OTPScreen} />
    </Stack.Navigator>
  );
};

const StackHome = () => {
  return (
    <Drawer.Navigator drawerContent={props => <CustomDrawer {...props} />}>
      <Drawer.Screen
        name={'Trang chủ'}
        component={HomeNavigator}
        options={{headerShown: false}}
      />

      <Drawer.Screen
        name={'Thu nhập của bạn'}
        options={{headerShown: false}}
        component={IncomeNavigator}></Drawer.Screen>

      <Drawer.Screen
        name={'Trợ giúp'}
        options={{headerShown: false}}
        component={SupportNavigator}></Drawer.Screen>

      <Drawer.Screen name={'Ví'} options={{headerShown: false}}>
        {() => <DummyScreen name={'Ví'} />}
      </Drawer.Screen>

      <Drawer.Screen
        name={'Cài đặt'}
        component={AccountNavigator}
        options={{headerShown: false}}
      />
    </Drawer.Navigator>
  );
};

const RootNavigator = () => {
  const scheme = useColorScheme();
  const [initializing, setInitializing] = useState(true);
  const [authenticated, setAutheticated] = useState(false);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(users) {
    if (users) {
      setTimeout(() => {
        getLocksmith(users.uid, setUser);
      }, 2000);
    } else {
      setUser(users);
    }

    // setAutheticated(true);
    // setUser(user);

    if (initializing) {
      setInitializing(false);
    }
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
        {/* {!user ? <StackAuth /> : <StackHome />} */}
        {/* <View style={{flex: 1}}>
          <StackAuth />
        </View> */}
      </NavigationContainer>
    </AppContext.Provider>
  );
};

export default RootNavigator;
