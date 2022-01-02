import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import { composeWithDevTools } from "redux-devtools-extension";
import { loginReducer } from "../Login/loginReducer";
import { brsrReducer } from "../BRSR/brsrReducer";
import { reportingIdReducer } from "../BRSR/reportingIdReducer";
import storage from "redux-persist/lib/storage";
// import { servicesReducer } from "../ProductServices/servicesReducer";

const persistblacklistConfig = {
  key: "subroot",
  storage: storage,
  blacklist: ["login"], // navigation will not be persisted
};

const persistwhitelistConfig = {
  key: "root",
  storage: storage,
  whitelist: ["brsr", "reportId"], // only navigation will be persisted
};

const rootReducer = combineReducers({
  // login: persistReducer(persistwhitelistConfig, loginReducer),
  login: loginReducer,
  brsr: persistReducer(persistwhitelistConfig, brsrReducer),
  reportId: persistReducer(persistwhitelistConfig, reportingIdReducer),
  // servicesReducer: servicesReducer,
});
const persistedReducer = persistReducer(persistblacklistConfig, rootReducer);
export const store = createStore(
  persistedReducer,
  // rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export const persistor = persistStore(store);
export default store;
