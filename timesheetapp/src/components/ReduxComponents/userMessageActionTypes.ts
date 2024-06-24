export const SEND_USER_MESSAGE = 'SEND_USER_MESSAGE';

export const sendUserMessage = (message: string) => ({
  type: SEND_USER_MESSAGE,
  payload: message,
});

export type UserMessageAction = ReturnType<typeof sendUserMessage>;