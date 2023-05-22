import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {SIZES} from '../../contains';
import {COLORS, shadowView} from '../../contains/theme';

export default function DashBoardItem({
  title,
  number,
  statisticsText,
  onPress,
}) {
  return (
    <TouchableOpacity onPress={() => onPress()} style={styles.dashBoard}>
      <Text style={styles.text}>{title}</Text>
      <Text style={styles.textCost}>
        {new Intl.NumberFormat({
          style: 'currency',
          currency: 'VND',
        }).format(number[0].sum)}
        .000đ
      </Text>
      <View style={styles.statistics}>
        {number[1].status === 'less' ? (
          <Text style={styles.textMinus}>
            {new Intl.NumberFormat({
              style: 'currency',
              currency: 'VND',
            }).format(number[1].cost)}
            .000đ {statisticsText}
          </Text>
        ) : (
          <Text style={styles.textPlus}>
            +
            {new Intl.NumberFormat({
              style: 'currency',
              currency: 'VND',
            }).format(number[1].cost)}
            .000đ {statisticsText}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  dashBoard: [
    {
      width: '90%',
      height: SIZES.height / 2 / 3 - 10,
      backgroundColor: '#0000ff',
      padding: 10,

      alignItems: 'center',
      marginBottom: 10,
      borderRadius: 5,
    },
    shadowView,
  ],
  statistics: {
    width: '100%',
    height: '40%',
    backgroundColor: '#ffffff',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textCost: {fontSize: 24, fontWeight: 'bold', color: '#ffffff'},
  text: {fontWeight: '600', color: '#ffffff'},
  textPlus: {fontWeight: '900', color: 'green'},
  textMinus: {fontWeight: '900', color: 'red'},
});
