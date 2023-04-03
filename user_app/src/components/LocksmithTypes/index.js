import {View, Text, Pressable} from 'react-native';
import React from 'react';

import styles from './styles';
import LocksmithTypeRow from '../LocksmithTypeRow';

import typesData from '../../assets/data/types';

const LocksmithTypes = ({typeState, onSubmit}) => {
  const [selectedType, setSelectedType] = typeState;

  // const confirm = () => {
  //   console.warn('confirm');
  // };

  return (
    <View>
      {typesData.map(type => (
        <LocksmithTypeRow
          type={type}
          key={type.id}
          isSelected={type.type === selectedType}
          onPress={() => setSelectedType(type.type)}
        />
      ))}

      <Pressable
        onPress={onSubmit}
        style={{
          width: '95%',
          backgroundColor: '#1065e9',
          padding: 10,
          margin: 10,
          alignItems: 'center',
          borderRadius: 10,
        }}>
        <Text style={{color: '#fff', fontWeight: 'bold'}}>Xác nhận</Text>
      </Pressable>
    </View>
  );
};

export default LocksmithTypes;
