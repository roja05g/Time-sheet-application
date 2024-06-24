export interface Admin {
  name: string;
  adminId: string;
}

export const SET_ADMIN_DETAILS = 'SET_ADMIN_DETAILS';

export const setAdminDetails = (adminDataType: Admin) => ({
  type: SET_ADMIN_DETAILS,
  payload: adminDataType,
});

export type AdminAction = ReturnType<typeof setAdminDetails>;
