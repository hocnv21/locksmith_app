import {Button, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import {COLORS} from '../../contains';
import {useRoute} from '@react-navigation/native';

const CELL_COUNT = 6;
export default function OTPScreen({confirmCode, phoneNumber}) {
  // If null, no SMS has been sent

  // verification code (OTP - One-Time-Passcode)
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  return (
    <View style={{flex: 1}}>
      <View style={styles.header}>
        <Text style={styles.textH1}>Nhập mã đã được gửi đến</Text>
        <Text style={styles.textPhone}>{phoneNumber}</Text>
      </View>

      <CodeField
        ref={ref}
        {...props}
        // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
        value={value}
        onChangeText={setValue}
        cellCount={CELL_COUNT}
        rootStyle={styles.codeFieldRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={({index, symbol, isFocused}) => (
          <Text
            key={index}
            style={[styles.cell, isFocused && styles.focusCell]}
            onLayout={getCellOnLayoutHandler(index)}>
            {symbol || (isFocused ? <Cursor /> : null)}
          </Text>
        )}
      />
      <View style={styles.bottom}>
        <Text>Bạn không nhận được mã ? gửi lại mã sau 30s</Text>
        {/* {confirmCode(value)} */}
        <TouchableOpacity
          style={styles.btn}
          // disiable={value.length < 5}
          onPress={confirmCode(value)}>
          <Text style={styles.textBtn}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  codeFieldRoot: {
    marginTop: 20,

    padding: 20,
    justifyContent: 'center',
  },
  cell: {
    width: 40,
    height: 40,
    marginHorizontal: 5,
    lineHeight: 38,
    fontSize: 24,
    fontWeight: '600',
    color: COLORS.black,
    borderWidth: 1,
    borderColor: COLORS.black - 20,
    textAlign: 'center',
  },
  focusCell: {
    borderColor: COLORS.blue,
  },
  header: {
    marginVertical: 10,
  },
  textH1: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 10,
  },
  textPhone: {
    fontSize: 24,
    color: '#000000',
  },
  bottom: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    marginVertical: 20,
    backgroundColor: COLORS.blue,
    width: 200,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  textBtn: {
    color: '#ffffff',
  },
});
