// import {ToastMessage} from '../components/ToastMessage';
import moment from 'moment';

const baseUrl =
  'https://se53mwfvog.execute-api.ap-south-1.amazonaws.com/dev/api/';

let NoAuthAPI = (apiName, apiMethod, data) => {
  //   let formBody = new FormData();
  //   if (data) {
  //     for (let i in data) {
  //       formBody.append(i, data[i]);
  //     }
  //   }

  // console.warn('body-->', JSON.stringify(formBody, undefined, 2));

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
            // AccessKey: 'AKIASWRBYD6UW3D6VUZJ',
            // SecretKey: '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',
            // 'AWS Region': 'ap-south-1',
            // 'Service Name': 'execute-api',
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'X-Amz-Date': moment().toISOString(),
            Authorization:
              'AWS4-HMAC-SHA256 Credential=AKIASWRBYD6UW3D6VUZJ/20221101/ap-south-1/execute-api/aws4_request, SignedHeaders=content-length;content-type;host;X-Amz-Date, Signature=e83ffa583ec2a614a28de401f17bb3d15f04a99f16f6998602406ff7184e2e73',
          },
        }
      : {
          method: apiMethod,
          headers: {
            Accept: 'application/json',
          },
          body: JSON.stringify(data),
        };
  return fetch(baseUrl + apiName, init)
    .then(response => response.json())
    .then(responseData => {
      console.warn('fetch', JSON.stringify(responseData, undefined, 2));
      if (responseData.status === 'success') {
        return responseData;
      } else {
        setTimeout(() => {
          alert(JSON.stringify(responseData.response));
          //   ToastMessage(
          //     responseData.response || responseData.Status || responseData.status,
          //   );
        }, 400);
      }
    })
    .catch(err => {
      alert(JSON.stringify(err));
      //   ToastMessage('Server encounter an error, please try after some time');
      return false;
    });
};

export {NoAuthAPI};
