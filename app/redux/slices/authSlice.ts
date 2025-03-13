// /app/redux/slices/authSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IChurchMember } from "@/app/types/user";

export interface AuthState {
  member: IChurchMember | null;
  token: string | null;
}

const initialState: AuthState = {
  member: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMember: (state, action: PayloadAction<{ member: IChurchMember; token: string }>) => {
      state.member = action.payload.member;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.member = null;
      state.token = null;
    },
  },
});

export const { setMember, logout } = authSlice.actions;
export default authSlice.reducer;
