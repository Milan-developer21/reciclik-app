import {StoreModule} from "@ngrx/store";
import {loadingReducer} from "./loading/loading.reducers";
import {loginReducer} from "./login/login.reducer";

export const AppStoreModules = [
  StoreModule.forRoot([]),
  StoreModule.forFeature("loading", loadingReducer),
  StoreModule.forFeature("login", loginReducer),
]
