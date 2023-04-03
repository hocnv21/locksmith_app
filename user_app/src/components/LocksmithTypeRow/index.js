import {View, Text, Image, Pressable} from 'react-native';
import React from 'react';

import styles from './styles';
import Ionicons from 'react-native-vector-icons/Ionicons';

const LocksmithTypeRow = props => {
  const {type, onPress, isSelected} = props;

  const getImage = () => {
    if (type.type === 'Mở khóa nhà') {
      return require('../../assets/images/home.png');
    }
    if (type.type === 'Mở khóa phương tiện') {
      return require('../../assets/images/vehicle.png');
    }
    return require('../../assets/images/electronic-device.png');
  };

  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.container,
        {backgroundColor: isSelected ? '#efefef' : 'white'},
      ]}>
      {/* Image */}
      <Image style={styles.image} source={getImage()} />

      <View style={styles.middleContainer}>
        <Text style={styles.type}>
          {type.type} <Ionicons name="person" size={15} />3
        </Text>
        <Text style={styles.time}>8:03PM đến nơi</Text>
      </View>

      <View style={styles.rightContainer}>
        <Ionicons name="pricetag" size={18} color="#42d742" />
        <Text style={styles.price}>{type.price}.000 VND</Text>
      </View>
    </Pressable>
  );
};

export default LocksmithTypeRow;
