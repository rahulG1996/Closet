import {NoAuthAPI} from '../../services';

export function addOutfit(data) {
  return async dispatch => {
    const apiResponse = await NoAuthAPI('createOutfit', 'POST', data);
    if (Object.keys(apiResponse).length) {
      dispatch({type: 'ADD_OUTFIT', value: apiResponse});
    }
  };
}

export function getOutfitsList() {
  return async (dispatch, getState) => {
    const apiPath = `getOutfitDetails?userId=${getState().AuthReducer.userId}`;
    const apiResponse = await NoAuthAPI(apiPath, 'GET');
    if (Object.keys(apiResponse).length) {
      dispatch({type: 'GET_OUTFIT', value: apiResponse?.outfitList});
    }
  };
}

export function getOutfitDetail(data) {
  return async dispatch => {
    const apiResponse = await NoAuthAPI('getOneOutfitDetails', 'POST', data);
    if (Object.keys(apiResponse).length) {
      dispatch({type: 'OUTFIT_DETAILS', value: apiResponse?.outfitList[0]});
    }
  };
}

export function deleteOutfit(data) {
  return async dispatch => {
    const apiResponse = await NoAuthAPI('removeOutfitItem', 'POST', data);
    console.warn('delete outfit', apiResponse);
    if (Object.keys(apiResponse).length) {
      dispatch({type: 'OUTFIT_DELETE', value: apiResponse});
    }
  };
}
