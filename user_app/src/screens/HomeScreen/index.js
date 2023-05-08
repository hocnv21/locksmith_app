import React, {useState} from 'react';
import {
  Dimensions,
  View,
  StyleSheet,
  Text,
  ScrollView,
  Pressable,
  Platform,
  Image,
  TouchableOpacity,
  PixelRatio,
} from 'react-native';

import HomeMap from '../../components/HomeMap';
import HomeSearch from '../../components/HomeSearch';
import {COLORS, SIZES} from '../../contains/theme';
import {useNavigation} from '@react-navigation/native';
// import SloganMessage from '../../components/SloganMessage';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AppBar from '../../components/Appbar/AppBar';
import category from '../../assets/data/category';
import ServiceItem from '../../components/HomeComponents/ServiceItem';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [typeLock, setTypeLock] = useState('');
  function handlePressItem() {
    // navigation.navigate('FormInput', {typeLock: value.type});
  }
  return (
    <>
      <AppBar rightText={'Xin chào, Nguyễn Viết Học'} />
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.textHeader}>Bạn đang tìm dịch vụ gì nè ? </Text>
          </View>
          <View style={styles.content}>
            {category.map((value, index) => (
              <ServiceItem key={index} value={value} />
            ))}
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    // padding: 10,
    // marginTop: Platform.OS === 'ios' ? 45 : 0,
    backgroundColor: COLORS.background,
    height: SIZES.height,
    width: SIZES.width,
  },
  header: {
    padding: 10,
    height: SIZES.height * 0.13,

    // backgroundColor: '#000000',
  },
  textHeader: {
    fontSize: 32,
    fontWeight: '700',
    color: '#ffffff',
  },
  content: {
    // marginBottom: 20,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 10,
    height: SIZES.height * 0.87,
    width: SIZES.width,
    backgroundColor: '#ffffff',
  },
});
