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
export default function OTPScreen({confirmCode}) {
  // If null, no SMS has been sent

  // verification code (OTP - One-Time-Passcode)
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  return (
    <View style={{flex: 1, marginTop: 60}}>
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
      {/* {confirmCode(value)} */}
      <TouchableOpacity
        // disiable={value.length < 5}
        onPress={confirmCode(value)}>
        <Text>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  codeFieldRoot: {
    marginTop: 20,
    borderWidth: 1,
    padding: 20,
    justifyContent: 'center',
  },
  cell: {
    width: 40,
    height: 40,
    marginHorizontal: 10,
    lineHeight: 38,
    fontSize: 24,
    fontWeight: '600',
    color: COLORS.black,
    borderBottomWidth: 2,
    borderColor: '#000000',
    textAlign: 'center',
  },
  focusCell: {
    borderColor: COLORS.blue,
  },
});
