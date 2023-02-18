import {NoAuthAPI} from '../../services';

export function getHomePageData() {
  return async dispatch => {
    const apiResponse = await NoAuthAPI('get/homePageData', 'GET');
    if (Object.keys(apiResponse).length) {
      dispatch({type: 'GET_HOME_DATA', value: apiResponse});
    }
  };
}

export function getProductDetailsApi(productId) {
  return async dispatch => {
    const apiResponse = await NoAuthAPI(
      `get/productDetails?productId=${productId}`,
      'GET',
    );
    console.warn(apiResponse);
    if (Object.keys(apiResponse).length) {
      dispatch({type: 'GET_PRODUCT_DETAILS', value: apiResponse});
    }
  };
}
