import React, {useState} from 'react';
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {Buttons, Input} from '../../components';
import {FONTS_SIZES} from '../../fonts';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const Login = ({closeModal = () => {}, forgotPasswordClick = () => {}}) => {
  const [state, setState] = useState({
    email: '',
    password: '',
    emailError: '',
    passwordError: '',
  });

  const doLogin = () => {
    let {email, password, emailError, passwordError} = state;
    if (!email) {
      emailError = 'Please enter valid email id';
    }
    if (!password) {
      passwordError = 'Please enter valid email id';
    }
    setState({...state, emailError, passwordError});
    if (email && password) {
      alert('login');
    }
  };

  const setInputValues = (e, type) => {
    let {email, password, emailError, passwordError} = state;
    if (type === 'email') {
      email = e;
      emailError = '';
    }
    if (type === 'password') {
      password = e;
      passwordError = '';
    }
    setState({...state, emailError, passwordError, email, password});
  };
  return (
    <ScrollView keyboardShouldPersistTaps="handled" style={{flex: 1}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text style={{fontSize: FONTS_SIZES.s3, fontWeight: '700'}}>Login</Text>
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
        placeholder="Password"
        onChangeText={e => setInputValues(e, 'password')}
        value={state.password}
        errorText={state.passwordError}
      />
      <Buttons text="login" onPress={doLogin} />
      <Buttons
        text="forgot password ?"
        isInverse
        noBorder
        onPress={forgotPasswordClick}
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          padding: 32,
          paddingHorizontal: 70,
        }}>
        <TouchableOpacity>
          <Image
            source={require('../../assets/insta.webp')}
            style={styles.socialIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            source={require('../../assets/google.webp')}
            style={[styles.socialIcon, {marginHorizontal: 16}]}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            source={require('../../assets/apple.webp')}
            style={styles.socialIcon}
          />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Login;

const styles = StyleSheet.create({
  socialIcon: {
    width: 44,
    height: 44,
  },
});
