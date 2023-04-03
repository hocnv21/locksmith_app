import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import styles from './styles';

const HomeSearch = () => {
  const navigation = useNavigation();

  const goToSearch = () => {
    navigation.navigate('DestinationSearch');
  };

  return (
    <View>
      {/* Input Box */}
      <Pressable onPress={goToSearch} style={styles.inputBox}>
        <Text style={styles.inputText}>Bạn đang ở đâu?</Text>
        <View style={styles.timeContainer}>
          <AntDesign name={'clockcircle'} size={16} color="#535353" />
          <Text style={{marginHorizontal: 5}}>Hiện tại</Text>
          <MaterialIcon name="keyboard-arrow-down" size={16} color="#535353" />
        </View>
      </Pressable>

      {/* Previous destination */}
      <Pressable style={styles.row}>
        <View style={styles.iconContainer}>
          <AntDesign name="clockcircle" size={20} color="#ffffff" />
        </View>
        <Text style={styles.destinationText}>Trường đại học Công nghiệp</Text>
      </Pressable>

      {/* Home destination */}
      <View style={styles.row}>
        <View style={[styles.iconContainer, {backgroundColor: '#218cff'}]}>
          <Entypo name="home" size={20} color="#ffffff" />
        </View>
        <Text style={styles.destinationText}>Nhà</Text>
      </View>
    </View>
  );
};

export default HomeSearch;
