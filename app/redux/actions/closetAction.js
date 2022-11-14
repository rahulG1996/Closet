import {NoAuthAPI} from '../../services';

export function getBrandData() {
  return async dispatch => {
    const apiResponse = await NoAuthAPI('getBrands', 'GET');
    if (Object.keys(apiResponse).length) {
      dispatch({type: 'GET_BRANDS', value: apiResponse.data});
    }
  };
}

export function getCategoryData() {
  return async dispatch => {
    const apiResponse = await NoAuthAPI('getCategories', 'GET');
    if (Object.keys(apiResponse).length) {
      dispatch({type: 'GET_CATEGORY', value: apiResponse.data});
    }
  };
}

export function getClosetData() {
  return async (dispatch, getState) => {
    const apiPath = `getClosetDetails?userId=${getState().AuthReducer.userId}`;
    const apiResponse = await NoAuthAPI(apiPath, 'GET');
    if (Object.keys(apiResponse).length) {
      dispatch({type: 'CLOSET_DATA', value: apiResponse.data});
    }
  };
}

export function addDataInCloset(data) {
  return async dispatch => {
    const apiResponse = await NoAuthAPI('addToCloset', 'POST', data);
    if (Object.keys(apiResponse).length) {
      dispatch({type: 'ADD_TO_CLOSET', value: apiResponse});
    }
  };
}

export function openClosetDetails(data) {
  return async dispatch => {
    const apiResponse = await NoAuthAPI('getOneClosetDetails', 'POST', data);
    console.warn('apiResponse', apiResponse);
    if (Object.keys(apiResponse).length) {
      dispatch({type: 'SINGLE_CLOSET', value: apiResponse});
    }
  };
}
