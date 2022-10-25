import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import {Buttons, Input, VText, VView} from '../../components';
import {FONTS_SIZES} from '../../fonts';

const ForgotPassword = props => {
  return (
    <VView
      style={{
        flex: 1,
        paddingHorizontal: 16,
        justifyContent: 'center',
        backgroundColor: 'white',
      }}>
      <VText
        text="Forgot Password?"
        style={{
          fontSize: FONTS_SIZES.s3,
          fontWeight: '700',
          textAlign: 'center',
        }}
      />
      <VText
        text="Enter your registered email id to verify it.
        After verifying you can create a new password."
        style={{
          marginVertical: 8,
          textAlign: 'center',
          marginBottom: 56,
          lineHeight: 24,
        }}
      />
      <Input placeholder="EmailId" />
      <VView style={{marginTop: 48}}>
        <Buttons
          text="get otp"
          onPress={() => props.navigation.navigate('VerifyEmail')}
        />
        <Buttons
          text="go back"
          isInverse
          noBorder
          onPress={() => props.navigation.goBack()}
        />
      </VView>
    </VView>
  );
};

export default ForgotPassword;

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
