import {
  configureStore,
  combineReducers,
} from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storageSession from "redux-persist/lib/storage/session";
import logger from "redux-logger";
import userSlice from "./slice/userSlice";
import modalSlice from "./slice/modalSlice";
import themeSlice from "./slice/themeSlice";

const persistConfig = {
  key: ["user", "theme"],
  storage: storageSession,
  whitelist: ["user", "theme"],
};

const rootReducer = combineReducers({
  user: userSlice.reducer,
  modal: modalSlice.reducer,
  theme: themeSlice.reducer,
});

const persistedReducer = persistReducer(
  persistConfig,
  rootReducer
);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(logger),
});

export default store;
