import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import {Colors} from '../../colors';
import VText from '../Text';

const Buttons = ({
  text = '',
  onPress = () => {},
  isInverse = false,
  noBorder = false,
  disabled = false,
}) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      style={styles.buttonContainer(isInverse, noBorder)}
      onPress={onPress}>
      <VText text={text} style={styles.buttontext(isInverse)} />
    </TouchableOpacity>
  );
};

export default Buttons;

const styles = StyleSheet.create({
  buttonContainer: (isInverse, noBorder) => ({
    backgroundColor: isInverse ? '#FFFFFF' : '#000000',
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 16,
    borderWidth: 2,
    borderColor: noBorder ? 'transparent' : Colors.grey1,
  }),
  buttontext: isInverse => ({
    color: isInverse ? 'black' : 'white',
    textTransform: 'uppercase',
  }),
});
