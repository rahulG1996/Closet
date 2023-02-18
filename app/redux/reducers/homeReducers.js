const initialState = {
  homeResponse: {},
};

const HomeReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_HOME_DATA': {
      return {
        ...state,
        homeResponse: action.value,
      };
    }

    default:
      return state;
  }
};

export default HomeReducer;
