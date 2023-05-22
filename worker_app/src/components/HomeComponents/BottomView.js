import {StyleSheet, Text, Pressable, View} from 'react-native';
import React from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {SIZES} from '../../contains';
import {COLORS} from '../../contains';

export default function BottomView({isActive, onPress}) {
  return (
    <View>
      <Pressable style={[styles.roundButton, {bottom: 90, left: 10}]}>
        <Entypo name="shield" size={28} color={'#1495ff'} />
      </Pressable>

      <Pressable onPress={onPress} style={styles.goButton}>
        {isActive ? (
          <Text style={styles.goText}>OFF</Text>
        ) : (
          <Text style={styles.goText}>ON</Text>
        )}
      </Pressable>

      <View
        style={[
          styles.bottomContainer,
          isActive
            ? {backgroundColor: COLORS.blue}
            : {backgroundColor: COLORS.error},
        ]}>
        <Ionicons name="options" size={28} color={'#4a4a4a'} />
        <View>
          {/* <Text style={styles.bottomText}>Bạn đang online</Text>; */}
          {isActive ? (
            <Text style={styles.bottomText}>Bạn đang online</Text>
          ) : (
            <Text style={styles.bottomText}>Bạn đang offline</Text>
          )}
        </View>
        <FontAwesome5 name="list-ul" size={28} color={'#4a4a4a'} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  roundButton: {
    position: 'absolute',
    backgroundColor: 'white',

    padding: 10,
    borderRadius: 50,
  },
  goButton: {
    position: 'absolute',
    backgroundColor: '#000000',
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    bottom: 90,
    left: SIZES.width / 2 - 30,
  },
  bottomContainer: {
    // position: 'absolute',
    // left: 0,
    // bottom: 0,
    // right: 0,
    height: 80,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',

    padding: 15,
  },
  bottomText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  goText: {
    fontSize: 30,
    color: 'white',
    fontWeight: 'bold',
  },
});
