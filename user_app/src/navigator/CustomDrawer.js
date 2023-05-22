import {View, Text, Pressable, TouchableOpacity, Image} from 'react-native';
import React, {useContext} from 'react';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';

import auth from '@react-native-firebase/auth';
import AppContext from './AppContext';

const CustomDrawer = props => {
  const {user} = useContext(AppContext);

  const signOut = async () => {
    console.log('signing out');
    auth()
      .signOut()
      .then(async () => {
        console.log('User sign-out successfully!');
      })
      .catch(e => alert('Error', e.message));
  };
  return (
    <DrawerContentScrollView {...props}>
      <View style={{backgroundColor: '#1065e9', padding: 15}}>
        {/* User Row */}
        <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            source={{uri: user.image}}
            style={{
              resizeMode: 'cover',
              width: 40,
              height: 40,
              borderRadius: 50,
              marginRight: 15,
            }}
          />
          <View>
            <Text style={{color: 'white', fontSize: 20}}>{user.name}</Text>
          </View>
        </TouchableOpacity>

        {/* Messages Row */}

        {/* Do more */}

        {/* Make money */}
      </View>

      <DrawerItemList {...props} />

      <Pressable
        style={{
          alignItems: 'center',
          marginTop: 180,
          borderRadius: 20,
          marginHorizontal: 50,
          backgroundColor: '#1065e9',
        }}
        onPress={signOut}>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 15,
            padding: 10,
            color: 'white',
          }}>
          Đăng xuất
        </Text>
      </Pressable>
    </DrawerContentScrollView>
  );
};

export default CustomDrawer;
