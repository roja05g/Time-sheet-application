import { UserAction, SET_USER_DETAILS, User } from './userActionTypes';

interface UserState {
  user: User | null;
}

const initialState: UserState = {
  user: null,
  
};

const userReducer = (state = initialState, action: UserAction): UserState => {
  switch (action.type) {
    case SET_USER_DETAILS:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
