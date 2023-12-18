import {
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
  combineReducers,
} from "redux";

import thunk from "redux-thunk";
import { TranslateReducers } from "./Translate/Translate.reducer";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const allReducers = combineReducers({
  TranslateReducers,
});

const store = createStore(allReducers, composeEnhancer(applyMiddleware(thunk)));

export { store };
