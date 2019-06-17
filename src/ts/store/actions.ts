import { createStandardAction } from 'typesafe-actions';

export type RJVPayload = {
  data: object,
  rjvId: string
}

export const globalSetAction = createStandardAction('GLOBAL_SET')<RJVPayload>();
export const globalUpdateAction = createStandardAction('GLOBAL_UPDATE');
export const addKeyRequestAction = createStandardAction('ADD_KEY_REQUEST');
export const resetStateAction = createStandardAction('RESET_STATE');
export const resetAction =  createStandardAction('RESET')<undefined>();
export const variableUpdatedAction =  createStandardAction('VARIABLE_UPDATED')<string>();
export const variableRemovedAction = createStandardAction('VARIABLE_REMOVED')<RJVPayload>();
export const variableAddedAction = createStandardAction('VARIABLE_ADDED')<RJVPayload>();
export const variableAddedKeyRequest = createStandardAction('ADD_VARIABLE_KEY_REQUEST')<RJVPayload>();