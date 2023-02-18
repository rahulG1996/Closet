import {NoAuthAPI} from '../../services';

export function getHomePageData() {
  return async dispatch => {
    const apiResponse = await NoAuthAPI('get/homePageData', 'GET');
    if (Object.keys(apiResponse).length) {
      dispatch({type: 'GET_HOME_DATA', value: apiResponse});
    }
  };
}
