export interface User {
  name: string;
  empId: string;
}

export const SET_USER_DETAILS = 'SET_USER_DETAILS';

export const setUserDetails = (userDataType: User) => ({
  type: SET_USER_DETAILS,
  payload: userDataType,
});

export type UserAction = ReturnType<typeof setUserDetails>;
