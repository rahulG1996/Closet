const initialState = {
  brandData: {},
  categoryData: {},
  addClosetResponse: {},
  getcloset: [],
  singleClosetReponse: {},
};

const ClosetReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_BRANDS': {
      return {
        ...state,
        brandData: action.value,
      };
    }
    case 'GET_CATEGORY': {
      return {
        ...state,
        categoryData: action.value,
      };
    }
    case 'CLOSET_DATA': {
      console.warn('redux closet', action.value);
      return {
        ...state,
        getcloset: action.value,
      };
    }
    case 'ADD_TO_CLOSET': {
      return {
        ...state,
        addClosetResponse: action.value,
      };
    }
    case 'SINGLE_CLOSET': {
      return {
        ...state,
        singleClosetReponse: action.value,
      };
    }
    default:
      return state;
  }
};

export default ClosetReducer;
