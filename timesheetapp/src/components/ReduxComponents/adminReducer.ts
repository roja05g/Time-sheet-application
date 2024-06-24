import { AdminAction, SET_ADMIN_DETAILS, Admin } from './adminActionTypes';

interface AdminState {
  admin: Admin | null;
}

const initialState: AdminState = {
  admin: null,
};

const adminReducer = (state = initialState, action: AdminAction): AdminState => {
  switch (action.type) {
    case SET_ADMIN_DETAILS:
      return {
        ...state,
        admin: action.payload,
      };
    default:
      return state;
  }
};

export default adminReducer;
