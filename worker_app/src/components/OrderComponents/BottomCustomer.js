import {Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';

export default function BottomCustomer({customer}) {
  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Text style={styles.text}>Đang đến nới sữa khóa</Text>
        <Text style={styles.text}>Dự kiến đến : .... </Text>
      </View>
      <View style={styles.bottom}>
        <View style={styles.row}>
          <View style={styles.image}>
            <Image
              style={styles.avatar}
              source={require('../../assets/images/user.png')}
            />
          </View>
          <View>
            <Text>Khách hàng :</Text>
            <Text style={styles.text}>{customer.name}</Text>
          </View>
        </View>

        <View style={styles.row}>
          <TouchableOpacity>
            <Image
              style={styles.icon}
              source={require('../../assets/images/telephone.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              style={styles.icon}
              source={require('../../assets/images/message.png')}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    width: '100%',
    height: 120,
  },
  top: {
    height: 40,
    padding: 10,
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    fontWeight: '600',
  },
  image: {
    padding: 10,
    marginRight: 20,
  },
  avatar: {
    height: 50,
    width: 50,
    borderRadius: 50,
    resizeMode: 'contain',
  },
  icon: {
    resizeMode: 'contain',
    height: 30,
    width: 30,
    marginHorizontal: 10,
  },
  row: {flexDirection: 'row', alignItems: 'center'},
});
