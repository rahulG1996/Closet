const initialState = {
  otpResponse: {},
  verifyOtpResponse: {},
};

const ProfileReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'PROFILE_DATA': {
      return {
        ...state,
        otpResponse: action.value,
      };
    }
    default:
      return state;
  }
};

export default ProfileReducer;
