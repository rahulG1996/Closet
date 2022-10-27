import React, {useState} from 'react';
import {StyleSheet, Text} from 'react-native';
import {VView, VText, Buttons} from '../../components';
import {FONTS_SIZES} from '../../fonts';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';

const VerifyEmail = () => {
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const CELL_COUNT = 4;
  return (
    <VView
      style={{
        flex: 1,
        paddingHorizontal: 16,
        justifyContent: 'center',
        backgroundColor: 'white',
      }}>
      <VText
        text="Verify your email"
        style={{
          fontSize: FONTS_SIZES.s3,
          fontWeight: '700',
          textAlign: 'center',
        }}
      />
      <VText
        text="We have sent you a 4 digit OTP to your given email id emailid@gmail.com."
        style={{
          marginVertical: 8,
          textAlign: 'center',
          marginBottom: 56,
          lineHeight: 24,
        }}
      />
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
      <VView style={{marginTop: 56}}>
        <Buttons text="Verify" />
        <Buttons text="Send otp again" isInverse />
        <Buttons text="change email ID" isInverse noBorder />
      </VView>
    </VView>
  );
};

export default VerifyEmail;

const styles = StyleSheet.create({
  root: {flex: 1, padding: 20},
  title: {textAlign: 'center', fontSize: 30},
  codeFieldRoot: {marginTop: 20},
  cell: {
    fontSize: 24,
    borderWidth: 1,
    borderColor: '#00000030',
    textAlign: 'center',
    height: 74,
    width: 74,
    justifyContent: 'center',
  },
  focusCell: {
    borderColor: '#000',
  },
});
