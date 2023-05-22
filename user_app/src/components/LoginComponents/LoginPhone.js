import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import PhoneInput from 'react-native-phone-number-input';

export default function LoginPhone({
  showMessage,
  setShowMessage,
  phoneNumber,
  setPhoneNumber,
  formattedValue,
  setFormattedValue,
  valid,
  setValid,
  phoneInput,
  signInWithPhoneNumber,
  statusMessage,
  stateScreen,
}) {
  return (
    <View style={styles.wrapper}>
      {/* {showMessage && (
        <View style={styles.message}>
          <Text>Value : {phoneNumber}</Text>
          <Text>Formatted Value : {formattedValue}</Text>
          <Text>Valid : {valid ? 'true' : 'false'}</Text>
        </View>
      )} */}
      <PhoneInput
        containerStyle={styles.phoneInput}
        textInputStyle={{fontSize: 14, height: 40}}
        textContainerStyle={{fontSize: 14, height: 60}}
        ref={phoneInput}
        defaultValue={phoneNumber}
        defaultCode="VN"
        layout="first"
        onChangeText={text => {
          setPhoneNumber(text);
        }}
        onChangeFormattedText={text => {
          setFormattedValue(text);
        }}
        withDarkTheme
        withShadow
      />
      {stateScreen === 'login' ? (
        <>
          {showMessage && (
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View></View>
              <Text style={{color: 'red'}}>
                {valid
                  ? statusMessage
                    ? ''
                    : 'Tài khoản không tồn tại'
                  : 'Số điện thoại không đúng!'}
              </Text>
            </View>
          )}
        </>
      ) : (
        <>
          {showMessage && (
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View></View>
              <Text style={{color: 'red'}}>
                {valid
                  ? statusMessage
                    ? 'Số điện thoại đã tồn tại'
                    : ''
                  : 'Số điện thoại không đúng!'}
              </Text>
            </View>
          )}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginVertical: 10,
  },
  phoneInput: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',

    height: 60,
  },
});
