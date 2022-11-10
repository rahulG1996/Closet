import {NoAuthAPI} from '../../services';

export function loginAction(data) {
  return async dispatch => {
    const apiResponse = await NoAuthAPI('login', 'POST', data);
    if (Object.keys(apiResponse).length) {
      dispatch({type: 'LOGIN', value: apiResponse});
    }
  };
}

export function signupAction(data) {
  return async dispatch => {
    const apiResponse = await NoAuthAPI('signUp', 'POST', data);
    if (Object.keys(apiResponse).length) {
      dispatch({type: 'SIGNUP', value: apiResponse});
    }
  };
}

export function emptyLoginResponse() {
  return dispatch => {
    dispatch({type: 'LOGIN', value: ''});
    dispatch({type: 'USERID', value: ''});
  };
}
