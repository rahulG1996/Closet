import React, {useState} from 'react';
import {Image, Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import {Buttons, Input} from '../../components';
import {FONTS_SIZES} from '../../fonts';

const CreateAccount = ({closeModal = () => {}}) => {
  const [state, setState] = useState({
    email: '',
    password: '',
    cPassword: '',
    emailError: '',
    passwordError: '',
    cPasswordError: '',
  });

  const doLogin = () => {
    let {
      email,
      password,
      emailError,
      passwordError,
      cPassword,
      cPasswordError,
    } = state;
    if (!email) {
      emailError = 'Please enter  email id';
    }
    if (!password) {
      passwordError = 'Password enter password';
    }
    if (password && password.length < 8) {
      passwordError = 'Password should be of atleast 8 characters';
    }
    if (!cPassword) {
      cPasswordError = 'Please enter  confirm password id';
    }
    if (cPassword !== password) {
      cPasswordError = "Password couldn't match";
    }
    setState({...state, emailError, passwordError, cPasswordError});
    if (
      email &&
      password &&
      cPassword &&
      password.length >= 8 &&
      cPassword === password
    ) {
      alert('login');
    }
  };

  const setInputValues = (e, type) => {
    let {
      email,
      password,
      emailError,
      passwordError,
      cPassword,
      cPasswordError,
    } = state;
    if (type === 'email') {
      email = e;
      emailError = '';
    }
    if (type === 'password') {
      password = e;
      passwordError = '';
    }
    if (type === 'cPassword') {
      cPassword = e;
      cPasswordError = '';
    }
    setState({
      ...state,
      emailError,
      passwordError,
      email,
      password,
      cPassword,
      cPasswordError,
    });
  };
  return (
    <View style={{paddingBottom: 32}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text style={{fontSize: FONTS_SIZES.s3, fontWeight: '700'}}>
          Create Account
        </Text>
        <TouchableOpacity onPress={closeModal}>
          <Image
            source={require('../../assets/cross.webp')}
            style={{width: 44, height: 44}}
          />
        </TouchableOpacity>
      </View>
      <Input
        placeholder="Email Id"
        onChangeText={e => setInputValues(e, 'email')}
        value={state.email}
        errorText={state.emailError}
      />
      <Input
        placeholder="New Password"
        onChangeText={e => setInputValues(e, 'password')}
        value={state.password}
        errorText={state.passwordError}
      />
      <Input
        placeholder="Confirm Password"
        onChangeText={e => setInputValues(e, 'cPassword')}
        value={state.cPassword}
        errorText={state.cPasswordError}
      />
      <Buttons text="create" onPress={doLogin} />
    </View>
  );
};

export default CreateAccount;

const styles = StyleSheet.create({});
