import {View, Text, Pressable, Image} from 'react-native';
import React, {useContext, useEffect} from 'react';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import auth from '@react-native-firebase/auth';
import {getTotal} from '../Api/RestFullApi';
import AppContext from './AppContext';
import {useState} from 'react';

const CustomDrawer = props => {
  const {user} = useContext(AppContext);
  const [cost, setCost] = useState(null);

  useEffect(() => {
    getTotal(user._id, setCost);
  }, []);

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
          <Image
            style={{
              resizeMode: 'cover',
              width: 40,
              height: 40,
              borderRadius: 50,
              marginRight: 15,
            }}
            source={{uri: user.image}}
          />
          <View>
            <Text style={{color: 'white', fontSize: 20}}>{user.name}</Text>
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
          {cost && (
            <Pressable>
              <Text style={{color: '#ffffff', paddingVertical: 5}}>
                Thu nhập hôm nay:
                {new Intl.NumberFormat({
                  style: 'currency',
                  currency: 'VND',
                }).format(cost[0].sum)}
                .000đ
              </Text>
            </Pressable>
          )}
        </View>

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
