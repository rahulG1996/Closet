import React from 'react';
import {Text, TextInput, View, StyleSheet} from 'react-native';
import {Colors} from '../../colors';

const Input = ({
  placeholder = '',
  value = '',
  onChangeText = () => {},
  errorText = '',
}) => {
  return (
    <View>
      <TextInput
        placeholder={placeholder}
        style={styles.input(errorText)}
        value={value}
        onChangeText={onChangeText}
      />
      <Text style={styles.errorText}>{errorText}</Text>
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  input: errorText => ({
    borderWidth: 1,
    padding: 16,
    borderColor: errorText ? Colors.red : Colors.greyBorder,
    marginVertical: 8,
  }),
  errorText: {
    color: Colors.red,
    fontSize: 13,
  },
});
