const initialState = {
  homeResponse: [],
  productDetailResponse: {},
  filteredProducts: [],
  searchAPiResponse: [],
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

    case 'FILTERED_PRODUCTS': {
      return {
        ...state,
        filteredProducts: action.value,
      };
    }

    case 'GET_SEARCH_RESULT': {
      return {
        ...state,
        searchAPiResponse: action.value,
      };
    }

    default:
      return state;
  }
};

export default HomeReducer;
