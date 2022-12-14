const initialState = {
  userProfileResponse: {},
  udpateProfileRepose: {},
  deleteAccountResponse: {},
};

const ProfileReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'PROFILE_DATA': {
      return {
        ...state,
        userProfileResponse: action.value,
      };
    }
    case 'PROFILE_DATA_UPDATED': {
      return {
        ...state,
        udpateProfileRepose: action.value,
      };
    }
    case 'ACOOUNT_DELETE': {
      return {
        ...state,
        deleteAccountResponse: action.value,
      };
    }
    default:
      return state;
  }
};

export default ProfileReducer;
