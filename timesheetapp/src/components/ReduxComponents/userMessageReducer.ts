// userMessageReducer.ts
import { UserMessageAction, SEND_USER_MESSAGE } from './userMessageActionTypes';

interface UserMessageState {
  message: string;
}

const initialState: UserMessageState = {
  message: '',
};

const userMessageReducer = (state: UserMessageState = initialState, action: UserMessageAction): UserMessageState => {
  switch (action.type) {
    case SEND_USER_MESSAGE:
      console.log(action.payload);
      
      return {
        message: action.payload,
      };
    default:
      return state;
  }
};

export default userMessageReducer;