import { combineReducers } from 'redux';
import userReducer from './userReducer';
import adminReducer from './adminReducer';
import userMessageReducer from './userMessageReducer';

const rootReducer = combineReducers({
  user: userReducer,
  admin: adminReducer,
  userMessage: userMessageReducer,});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
