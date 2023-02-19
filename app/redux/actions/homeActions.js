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

export function getFilteredProducts(data) {
  return async dispatch => {
    let url = 'get/allProducts?page=1&limit=10&sortBy=latest';
    if (data.categoryId.length) {
      url = url + `&categoryIds=${data.categoryId}`;
    }
    const apiResponse = await NoAuthAPI(url, 'GET');
    if (Object.keys(apiResponse).length) {
      dispatch({type: 'FILTERED_PRODUCTS', value: apiResponse});
    }
  };
}
