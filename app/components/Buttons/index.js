import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import {Colors} from '../../colors';
import VText from '../Text';

const Buttons = ({text = '', onPress = () => {}, isInverse = false}) => {
  return (
    <TouchableOpacity
      style={styles.buttonContainer(isInverse)}
      onPress={onPress}>
      <VText text={text} style={styles.buttontext(isInverse)} />
    </TouchableOpacity>
  );
};

export default Buttons;

const styles = StyleSheet.create({
  buttonContainer: isInverse => ({
    backgroundColor: isInverse ? '#FFFFFF' : '#000000',
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 16,
  }),
  buttontext: isInverse => ({
    color: isInverse ? 'black' : 'white',
    textTransform: 'uppercase',
  }),
});
