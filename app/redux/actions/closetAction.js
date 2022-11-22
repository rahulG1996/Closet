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

export function editDataInCloset(data) {
  return async dispatch => {
    const apiResponse = await NoAuthAPI('editClosetDetails', 'POST', data);
    console.warn('edit closet Action', apiResponse);
    if (Object.keys(apiResponse).length) {
      dispatch({type: 'EDIT_CLOSET', value: apiResponse});
    }
  };
}

export function openClosetDetails(data) {
  return async dispatch => {
    const apiResponse = await NoAuthAPI('getOneClosetDetails', 'POST', data);
    if (Object.keys(apiResponse).length) {
      dispatch({type: 'SINGLE_CLOSET', value: apiResponse});
    }
  };
}

export function deleteClosetData(data) {
  return async dispatch => {
    const apiResponse = await NoAuthAPI('removeClosetItem', 'POST', data);
    console.warn('data dlete', data);
    console.warn('apiResponse dlete', apiResponse);
    if (Object.keys(apiResponse).length) {
      dispatch({type: 'DELETE_CLOSET', value: apiResponse});
    }
  };
}

export function removeBackgroundFromImage(data) {
  return async dispatch => {
    const apiResponse = await NoAuthAPI('removeBg', 'POST', data);
    dispatch({type: 'COMMON_LOADER', value: false});
    if (Object.keys(apiResponse).length) {
      dispatch({type: 'REMOVE_BG_IMAGE', value: apiResponse});
    }
  };
}
