const initialState = {
  homeResponse: {},
  productDetailResponse: {},
};

const HomeReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_HOME_DATA': {
      return {
        ...state,
        homeResponse: action.value,
      };
    }

    case 'GET_PRODUCT_DETAILS': {
      return {
        ...state,
        productDetailResponse: action.value,
      };
    }

    default:
      return state;
  }
};

export default HomeReducer;
