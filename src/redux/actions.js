export const FETCH_USER_REQUEST = 'FETCH_USER_REQUEST';
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
export const FETCH_USER_FAILURE = 'FETCH_USER_FAILURE';

export const fetchUserRequest = () => ({
  type: FETCH_USER_REQUEST,
});

export const fetchUserSuccess = (userData) => ({
  type: FETCH_USER_SUCCESS,
  payload: userData,
});

export const fetchUserFailure = (error) => ({
  type: FETCH_USER_FAILURE,
  payload: error,
});

export const initialState = {
  loading: false,
  userData: {},
  error: null,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        userData: action.payload,
        error: null,
      };
    case FETCH_USER_FAILURE:
      return {
        ...state,
        loading: false,
        userData: {},
        error: action.payload,
      };
    default:
      return state;
  }
};