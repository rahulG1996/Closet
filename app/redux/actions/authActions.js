import {NoAuthAPI} from '../../services';

export function loginAction(data) {
  return async dispatch => {
    const apiResponse = await NoAuthAPI('login', 'POST', data);
  };
}
