import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {COLORS} from '../../contains';

export default function ActionComponent({
  onPressAll,
  onPressOrderComplete,
  onPressOrderCancel,
  isSelectButton,
}) {
  return (
    <View style={styles.viewBtnAction}>
      <TouchableOpacity
        onPress={() => onPressAll()}
        style={[
          styles.btnAction,
          isSelectButton === 'All' ? styles.btnActionIsSelected : null,
        ]}>
        <Text
          style={[
            styles.textBtn,
            isSelectButton === 'All' ? styles.textIsSelected : null,
          ]}>
          Tất cả
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => onPressOrderComplete()}
        style={[
          styles.btnAction,
          isSelectButton === 'Complete' ? styles.btnActionIsSelected : null,
        ]}>
        <Text
          style={[
            styles.textBtn,
            isSelectButton === 'Complete' ? styles.textIsSelected : null,
          ]}>
          Hoàn thành
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => onPressOrderCancel()}
        style={[
          styles.btnAction,
          isSelectButton === 'Cancel' ? styles.btnActionIsSelected : null,
        ]}>
        <Text
          style={[
            styles.textBtn,
            isSelectButton === 'Cancel' ? styles.textIsSelected : null,
          ]}>
          Đã hủy
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  viewBtnAction: {
    flexDirection: 'row',
    width: '100%',

    justifyContent: 'space-around',
  },
  btnAction: {
    backgroundColor: COLORS.gray,
    width: '33.3%',
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnActionIsSelected: {
    backgroundColor: '#ffffff',
  },
  textBtn: {
    fontWeight: '600',
  },
  textIsSelected: {
    fontWeight: '600',
    color: 'blue',
  },
});
