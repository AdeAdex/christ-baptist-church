// /app/redux/store.ts

import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import authReducer from "./slices/authSlice";
import alMembersReducer from "./slices/allMembersSlice";
import ministriesReducer from "./slices/ministriesSlice";
import activitiesReducer from "./slices/activitiesSlice";
import contributionReducer from "./slices/contributionSlice";

// Create storage only on the client side
const createNoopStorage = () => ({
  getItem: async () => null,
  setItem: async () => {},
  removeItem: async () => {},
});

const clientStorage = typeof window !== "undefined" ? createWebStorage("local") : createNoopStorage();

// Combine reducers
const rootReducer = combineReducers({
  auth: authReducer,
  alMembers: alMembersReducer,
  ministries: ministriesReducer,
  activities: activitiesReducer,
  contribution: contributionReducer,
});

const persistConfig = {
  key: "root",
  storage: clientStorage,
  whitelist: ["auth"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// ✅ Fix type inference for persisted state
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
