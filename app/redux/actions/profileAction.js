import {NoAuthAPI} from '../../services';

export function getUserProfile() {
  return async (dispatch, getState) => {
    const apiPath = `getUserDetails?userId=${getState().AuthReducer.userId}`;
    const apiResponse = await NoAuthAPI(apiPath, 'GET');
    if (Object.keys(apiResponse).length) {
      dispatch({type: 'PROFILE_DATA', value: apiResponse});
      dispatch({
        type: 'IS_PROFILE_CREATED',
        value: apiResponse.isProfileCreated,
      });
    }
  };
}

export function updateUserProfile(data) {
  return async (dispatch, getState) => {
    const apiResponse = await NoAuthAPI('userProfile', 'POST', data);
    if (Object.keys(apiResponse).length) {
      dispatch({type: 'PROFILE_DATA_UPDATED', value: apiResponse});
      dispatch({
        type: 'IS_PROFILE_CREATED',
        value: apiResponse.isProfileCreated,
      });
    }
  };
}
