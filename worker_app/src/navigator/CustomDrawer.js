import {View, Text, Pressable} from 'react-native';
import React from 'react';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import auth from '@react-native-firebase/auth';

const CustomDrawer = props => {
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
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View
            style={{
              backgroundColor: '#cacaca',
              width: 40,
              height: 40,
              borderRadius: 50,
              marginRight: 15,
            }}
          />
          <View>
            <Text style={{color: 'white', fontSize: 20}}>Nguyễn Phi Hoàng</Text>
            <Text style={{color: 'lightgrey'}}>5.00 *</Text>
          </View>
        </View>

        {/* Messages Row */}
        <View
          style={{
            borderTopWidth: 0.5,
            borderBottomWidth: 0.5,
            borderColor: '#ffffff',
            paddingVertical: 5,
            marginVertical: 10,
          }}>
          <Pressable
            onPress={() => {
              console.warn('Tạo tin nhắn');
            }}>
            <Text style={{color: '#ffffff', paddingVertical: 5}}>Tin nhắn</Text>
          </Pressable>
        </View>

        {/* Do more */}
        <Pressable
          onPress={() => {
            console.warn('Cài đặt tài khoản');
          }}>
          <Text style={{color: '#ffffff', paddingVertical: 5}}>
            Cài đặt tài khoản
          </Text>
        </Pressable>

        {/* Make money */}
        <Pressable
          onPress={() => {
            console.warn('Nạp tiền vào ví');
          }}>
          <Text style={{color: 'white', paddingVertical: 5}}>
            Nạp tiền vào ví
          </Text>
        </Pressable>
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
