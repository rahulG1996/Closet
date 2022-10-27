import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import {Buttons, Input, VText, VView} from '../../components';
import {FONTS_SIZES} from '../../fonts';

const ResetPassword = props => {
  console.warn('props', props?.navigation?.state?.params);
  return (
    <VView
      style={{
        flex: 1,
        paddingHorizontal: 16,
        justifyContent: 'center',
        backgroundColor: 'white',
      }}>
      <VText
        text="Create New Password"
        style={{
          fontSize: FONTS_SIZES.s3,
          fontWeight: '700',
          textAlign: 'center',
        }}
      />

      <VView style={{marginVertical: 56}}>
        <Input placeholder="New Password" />
        <Input placeholder="COnfirm New Password" />
      </VView>
      <VView>
        <Buttons
          text="create"
          onPress={() => props.navigation.navigate('VerifyEmail')}
        />
        <Buttons
          text="change email"
          isInverse
          noBorder
          onPress={() => props.navigation.goBack()}
        />
      </VView>
    </VView>
  );
};

export default ResetPassword;

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
