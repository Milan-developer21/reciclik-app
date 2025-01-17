import {LoginState} from "./LoginState";
import {createReducer, on} from "@ngrx/store";
import {recoverPassword, recoverPasswordFail, recoverPasswordSuccess} from "./login.actions";
import {AppInitialState} from "../AppInitialState";

const initialState: LoginState = AppInitialState.login

const reducer = createReducer(initialState,
  on(recoverPassword, currentState => {
    return {
      ...currentState,
      error: null,
      isRecoveredPassword: false,
      isRecoveringPassword: true
    };
  }),
  on(recoverPasswordFail, (currentState, action) => {
    return {
      ...currentState,
      error: action.error,
      isRecoveredPassword: true,
      isRecoveringPassword: false
    };
  }),
  on(recoverPasswordSuccess, (currentState, action) => {
    return {
      ...currentState,
      error: null,
      isRecoveredPassword: true,
      isRecoveringPassword: false
    }
  })
)

export function loginReducer(state: LoginState, action: any): any {
  return reducer(state, action);
}
