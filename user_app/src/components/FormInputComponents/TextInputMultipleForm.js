import {StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';

export default function TextInputMultipleForm({valueText, setValueText}) {
  return (
    <View style={styles.container}>
      <Text style={[styles.text, styles.size28]}>Thông Tin :</Text>
      <View style={styles.viewTextInput}>
        <View style={styles.viewText}>
          <Text style={styles.text}>Tình trạng chi tiết :</Text>
        </View>

        <TextInput
          value={valueText}
          onChangeText={setValueText}
          style={styles.textInput}
          numberOfLines={8}
          maxLength={1000}
          multiline
          underlineColorAndroid={'transparent'}
          placeholder="Hãy nhập tình trạng ổ khóa mà bạn đang cần sửa"
        />
      </View>
      <Text style={[styles.text, styles.size28]}>Hình Ảnh :</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  viewTextInput: {
    height: 230,
    marginBottom: 20,
    backgroundColor: '#E7E7E7',
    padding: 10,
  },
  viewText: {
    borderBottomWidth: 1,
  },
  size28: {fontSize: 24},
  text: {
    padding: 5,
    color: '#000000',
    fontWeight: '500',
  },
  textInput: {textAlignVertical: 'top', height: 180},
});
