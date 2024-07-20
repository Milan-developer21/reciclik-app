import {StoreModule} from "@ngrx/store";
import {loadingReducer} from "./loading/loading.reducers";

export const AppStoreModules = [
  StoreModule.forRoot([]),
  StoreModule.forFeature("loading", loadingReducer),
]
