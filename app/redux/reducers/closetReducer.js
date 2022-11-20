const initialState = {
  brandData: {},
  categoryData: {},
  addClosetResponse: {},
  getcloset: [],
  singleClosetReponse: {},
  deleteClosetResponse: {},
  editClosetResponse: {},
  removeBgResponse: {},
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
    case 'DELETE_CLOSET': {
      return {
        ...state,
        deleteClosetResponse: action.value,
      };
    }
    case 'EDIT_CLOSET': {
      return {
        ...state,
        editClosetResponse: action.value,
      };
    }
    case 'REMOVE_BG_IMAGE': {
      return {
        ...state,
        removeBgResponse: action.value,
      };
    }
    default:
      return state;
  }
};

export default ClosetReducer;
