import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import {Colors} from '../../colors';
import VText from '../Text';

const Buttons = ({text = '', onPress = () => {}}) => {
  return (
    <TouchableOpacity style={styles.buttonContainer}>
      <VText text={text} style={styles.buttontext} />
    </TouchableOpacity>
  );
};

export default Buttons;

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: '#000000',
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 16,
  },
  buttontext: {
    color: Colors.white,
    textTransform: 'uppercase',
  },
});
