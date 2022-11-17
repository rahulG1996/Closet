import Toast from 'react-native-simple-toast';

const baseUrl =
  'https://se53mwfvog.execute-api.ap-south-1.amazonaws.com/dev/api/';

let NoAuthAPI = (apiName, apiMethod, data) => {
  let init =
    apiMethod === 'GET'
      ? {
          method: 'GET',
        }
      : apiMethod === 'POST'
      ? {
          method: apiMethod,
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      : {
          method: apiMethod,
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        };
  console.warn('body', data);
  return fetch(baseUrl + apiName, init)
    .then(response => response.json())
    .then(responseData => {
      // console.warn('response', responseData.data);
      if (responseData.data.statusCode === 200) {
        return responseData.data;
      } else {
        Toast.show(responseData?.data?.statusMessage);
        return responseData.data;
      }
    })
    .catch(err => {
      console.warn('err', err);
      //   ToastMessage('Server encounter an error, please try after some time');
      return false;
    });
};

export {NoAuthAPI};
