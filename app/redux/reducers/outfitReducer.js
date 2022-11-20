const initialState = {
  addOutfitReponse: {},
  getOutfitData: {},
  getOutfitDetailData: {},
  deleteOutfitRepsponse: {},
  editOutfitRepsponse: {},
};

const OutfitReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_OUTFIT': {
      return {
        ...state,
        addOutfitReponse: action.value,
      };
    }
    case 'GET_OUTFIT': {
      return {
        ...state,
        getOutfitData: action.value,
      };
    }
    case 'OUTFIT_DETAILS': {
      return {
        ...state,
        getOutfitDetailData: action.value,
      };
    }
    case 'OUTFIT_DELETE': {
      return {
        ...state,
        deleteOutfitRepsponse: action.value,
      };
    }
    case 'EDIT_OUTFIT': {
      return {
        ...state,
        editOutfitRepsponse: action.value,
      };
    }
    default:
      return state;
  }
};

export default OutfitReducer;
