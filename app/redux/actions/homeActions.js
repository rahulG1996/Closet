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
    if (Object.keys(apiResponse).length) {
      dispatch({type: 'GET_PRODUCT_DETAILS', value: apiResponse});
    }
  };
}

export function getFilteredProducts(data) {
  return async dispatch => {
    let url = 'get/allProducts/v1';
    const apiResponse = await NoAuthAPI(url, 'POST', data);
    if (Object.keys(apiResponse).length) {
      dispatch({type: 'FILTERED_PRODUCTS', value: apiResponse});
    }
  };
}

export function getSearchResult(key) {
  return async dispatch => {
    const apiResponse = await NoAuthAPI(`search?key=${key}`, 'GET');
    if (Object.keys(apiResponse).length) {
      dispatch({type: 'GET_SEARCH_RESULT', value: apiResponse});
    }
  };
}
