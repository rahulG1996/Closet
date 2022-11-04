import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Touchable, TouchableOpacity} from 'react-native';
import Toast from 'react-native-simple-toast';
import {useDispatch, useSelector} from 'react-redux';
import {Buttons, Input, VText, VView} from '../../components';
import {FONTS_SIZES} from '../../fonts';
import {sendOtp} from '../../redux/actions/sendOtpAction';

const ForgotPassword = props => {
  const [state, setState] = useState({email: ''});
  const dispatch = useDispatch();
  const otpResponse = useSelector(state => state.OtpReducer.otpResponse);

  useEffect(() => {
    if (Object.keys(otpResponse).length) {
      if (otpResponse.statusCode === 200) {
        dispatch({type: 'SEND_OTP', value: ''});
        Toast.show(otpResponse.statusMessage);
        props.navigation.navigate('VerifyEmail', {
          screen: 'forgotPassword',
          email: state.email,
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, otpResponse, props.navigation]);

  const sendOtpHandler = () => {
    let {errorText = '', email = ''} = state;
    if (!state.email) {
      errorText = 'Please enter email';
    } else {
      dispatch(
        sendOtp({
          emailId: email,
          status: '2',
        }),
      );
    }
    setState({...state, errorText});
  };
  return (
    <VView
      style={{
        flex: 1,
        paddingHorizontal: 16,
        justifyContent: 'center',
        backgroundColor: 'white',
      }}>
      <TouchableOpacity
        style={{position: 'absolute', top: 16, right: 16}}
        onPress={() => props.navigation.goBack()}>
        <Image
          source={require('../../assets/cross.webp')}
          style={{width: 44, height: 44}}
        />
      </TouchableOpacity>
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
      <Input
        placeholder="EmailId"
        value={state.email}
        onChangeText={e => setState({...state, email: e, errorText: ''})}
        errorText={state.errorText}
      />
      <VView style={{marginTop: 48}}>
        <Buttons text="get otp" onPress={sendOtpHandler} />
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
