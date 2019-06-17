import { createReducer, ActionType } from "typesafe-actions";
import { globalSetAction } from "./actions";
import * as rjvactions from './actions'; 
export type RVJActions = ActionType<typeof rjvactions>

type RJVState = {
  [key: string] : {
    [key: string] : {
      [key: string] : any
    }
  }
}

export const rjvReducer = createReducer<RJVState, RVJActions>({})
  .handleAction(globalSetAction, (state, action) => 
    updateRJVState(state, action.payload.rjvId, "global", "src", action.payload.data))

const updateRJVState = (
  state: RJVState, 
  rjvId: string, 
  name: string, 
  key: string,
  value: object
) => {
  const stateCopy = {...state};
    if (state[rjvId] === undefined) {
      stateCopy[rjvId] = {};
    }
    if (state[rjvId][name] === undefined) {
        stateCopy[rjvId][name] = {};
    }
    stateCopy[rjvId][name][key] = value;
    return stateCopy;
}