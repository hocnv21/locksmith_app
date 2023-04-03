import React from 'react';
import {Dimensions, View, StyleSheet, Text, ScrollView} from 'react-native';

import HomeMap from '../../components/HomeMap';
import HomeSearch from '../../components/HomeSearch';
import {SIZES} from '../../contains/theme';
// import SloganMessage from '../../components/SloganMessage';

const HomeScreen = () => {
  return (
    <ScrollView>
      <View>
        <View style={{height: SIZES.height * 0.6}}>
          <HomeMap />
        </View>

        {/* Slogan message */}
        <View style={{height: SIZES.height * 0.4}}>
          <View style={styles.container}>
            <Text style={styles.title}>
              Chắc chắn, trung thực và đáng tin cậy
            </Text>
            <Text style={styles.text}>
              Cam kết của chúng tôi về chất lượng đã khiến chúng tôi trở thành
              người dẫn đầu thị trường.
            </Text>
            <Text style={styles.learnMore}>Xem thêm</Text>
          </View>

          {/* Bottom comp */}
          <HomeSearch />
        </View>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1065e9',
    padding: 15,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  title: {
    marginBottom: 10,
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  text: {
    color: '#bed9ff',
    fontSize: 15,
    marginBottom: 10,
  },
  learnMore: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
  },
});
