const initialState = {
  brandData: {},
  categoryData: {},
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
    default:
      return state;
  }
};

export default ClosetReducer;
