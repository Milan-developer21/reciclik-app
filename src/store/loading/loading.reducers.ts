import {createReducer, on} from "@ngrx/store";
import {hide, show} from "./loading.actions";
import {LoadingState} from "./LoadingState";

const initialState: LoadingState = {
  show: false,
}

const reducers = createReducer(initialState,
  on(show, (): any => {
    return {show: true};
  }),
  on(hide, (): any => {
    return {show: false};
  }))

export function loadingReducer(state: LoadingState, action: any): any {
  return reducers(state, action);
}
