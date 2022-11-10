import {NoAuthAPI} from '../../services';

export function getBrandData() {
  return async dispatch => {
    const apiResponse = await NoAuthAPI('getBrands', 'GET');
    if (Object.keys(apiResponse).length) {
      dispatch({type: 'GET_BRANDS', value: apiResponse});
    }
  };
}

export function getCategoryData() {
  return async dispatch => {
    const apiResponse = await NoAuthAPI('getCategories', 'GET');
    if (Object.keys(apiResponse).length) {
      dispatch({type: 'GET_CATEGORY', value: apiResponse});
    }
  };
}
