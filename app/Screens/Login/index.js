import React, {useEffect, useState} from 'react';
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
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {appleAuth} from '@invertase/react-native-apple-authentication';
import {useDispatch, useSelector} from 'react-redux';
import {loginAction} from '../../redux/actions/authActions';

let user = null;

const Login = ({
  closeModal = () => {},
  forgotPasswordClick = () => {},
  loginResponseData = {},
  openStaticPage = {},
}) => {
  const dispatch = useDispatch();
  const loginResponse = useSelector(state => state.AuthReducer.loginResponse);
  const [state, setState] = useState({
    email: '',
    password: '',
    emailError: '',
    passwordError: '',
  });

  useEffect(() => {
    GoogleSignin.configure({
      //It is mandatory to call this method before attempting to call signIn()
      scopes: ['https://www.googleapis.com/auth/drive.readonly'],
      // Repleace with your webClientId generated from Firebase console
      webClientId:
        '42976996434-853vucqpl1ec33rput6l2ij3jkbjm8m3.apps.googleusercontent.com',
    });
  }, []);

  useEffect(() => {
    if (Object.keys(loginResponse).length) {
      loginResponseData({...loginResponse, email: state.email});
    }
  }, [loginResponse, loginResponseData]);

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
      dispatch(
        loginAction({
          emailId: email,
          password: password,
        }),
      );
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

  const googleLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices({
        //Check if device has Google Play Services installed.
        //Always resolves to true on iOS.
        showPlayServicesUpdateDialog: true,
      });
      const userInfo = await GoogleSignin.signIn();
      console.warn(userInfo);
    } catch (error) {
      console.warn('Message', error);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.warn('User Cancelled the Login Flow');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.warn('Signing In');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.warn('Play Services Not Available or Outdated');
      } else {
        console.warn('Some Other Error Happened');
      }
    }
  };

  const fetchAndUpdateCredentialState = async updateCredentialStateForUser => {
    if (user === null) {
      updateCredentialStateForUser('N/A');
    } else {
      const credentialState = await appleAuth.getCredentialStateForUser(user);
      if (credentialState === appleAuth.State.AUTHORIZED) {
        updateCredentialStateForUser('AUTHORIZED');
      } else {
        updateCredentialStateForUser(credentialState);
      }
    }
  };

  const appleLogin = async updateCredentialStateForUser => {
    console.warn('Beginning Apple Authentication');

    // start a login request
    try {
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      });

      console.warn(
        'appleAuthRequestResponse',
        JSON.stringify(appleAuthRequestResponse, undefined, 2),
      );

      const {
        user: newUser,
        email,
        nonce,
        identityToken,
        realUserStatus /* etc */,
      } = appleAuthRequestResponse;

      user = newUser;

      fetchAndUpdateCredentialState(updateCredentialStateForUser).catch(error =>
        updateCredentialStateForUser(`Error: ${error.code}`),
      );

      if (identityToken) {
        // e.g. sign in with Firebase Auth using `nonce` & `identityToken`
        console.warn(nonce, identityToken);
      } else {
        // no token - failed sign-in?
      }

      if (realUserStatus === appleAuth.UserStatus.LIKELY_REAL) {
        console.warn("I'm a real person!");
      }

      console.warn(`Apple Authentication Completed, ${user}, ${email}`);
    } catch (error) {
      if (error.code === appleAuth.Error.CANCELED) {
        console.warn('User canceled Apple Sign in.');
      } else {
        console.error(error);
      }
    }
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
          paddingBottom: 16,
          paddingHorizontal: 70,
        }}>
        <TouchableOpacity>
          <Image
            source={require('../../assets/insta.webp')}
            style={styles.socialIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={googleLogin}>
          <Image
            source={require('../../assets/google.webp')}
            style={[styles.socialIcon, {marginHorizontal: 16}]}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={appleLogin}>
          <Image
            source={require('../../assets/apple.webp')}
            style={styles.socialIcon}
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          paddingBottom: 50,
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'center',
          flexWrap: 'wrap',
        }}>
        <Text>By logging in you agree to our </Text>
        <TouchableOpacity onPress={() => openStaticPage('tt')}>
          <Text style={{color: 'rgba(33, 122, 255, 1)'}}>
            Terms and Conditions
          </Text>
        </TouchableOpacity>
        <Text> & </Text>
        <TouchableOpacity onPress={() => openStaticPage('pp')}>
          <Text style={{color: 'rgba(33, 122, 255, 1)'}}>Privacy policy</Text>
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
