import {NoAuthAPI} from '../../services';

export function getUserProfile() {
  return async (dispatch, getState) => {
    const apiPath = `getUserDetails?userId=${getState().AuthReducer.userId}`;
    const apiResponse = await NoAuthAPI(apiPath, 'GET');
    if (Object.keys(apiResponse).length) {
      dispatch({type: 'PROFILE_DATA', value: apiResponse});
    }
  };
}
