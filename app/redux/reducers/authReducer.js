const initialState = {
  loginResponse: {},
  signupResponse: {},
  userId: '',
  isProfileCreated: false,
};

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN': {
      return {
        ...state,
        loginResponse: action.value,
      };
    }
    case 'USERID': {
      console.log('redux', action.value);
      return {
        ...state,
        userId: action.value,
      };
    }
    case 'LOGOUT': {
      return {
        ...state,
        loginResponse: {},
        userId: '',
      };
    }
    case 'SIGNUP': {
      return {
        ...state,
        signupResponse: action.value,
      };
    }
    case 'IS_PROFILE_CREATED': {
      return {
        ...state,
        isProfileCreated: action.value,
      };
    }
    default:
      return state;
  }
};

export default AuthReducer;
