// /app/redux/store.ts

import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import authReducer from "./slices/authSlice";
import alMembersReducer from "./slices/allMembersSlice";
import ministriesReducer from "./slices/ministriesSlice";
import activitiesReducer from "./slices/activitiesSlice";
import contributionReducer from "./slices/contributionSlice";

// ✅ Create storage only on the client side
const createNoopStorage = () => ({
  getItem: async () => null,
  setItem: async () => {},
  removeItem: async () => {},
});

const storage =
  typeof window !== "undefined" ? createWebStorage("local") : createNoopStorage();

// ✅ Combine reducers for persist
const rootReducer = combineReducers({
  auth: authReducer,
  alMembers: alMembersReducer,
  ministries: ministriesReducer,
  activities: activitiesReducer,
  contribution: contributionReducer,
});

// ✅ Persist Config
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"], // Only persist auth state
};

// ✅ Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// ✅ Configure store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Redux Persist needs this
    }),
});

// ✅ Persistor instance
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
